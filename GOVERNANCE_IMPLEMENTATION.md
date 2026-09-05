# USSA Lore Master Knowledge Core - Governance System

## Overview

This document outlines the governance system implementation for the USSA Lore Master Knowledge Core. The governance system provides comprehensive auditing, approval workflows, version control, and rollback capabilities.

## System Architecture

### Modules Structure

```
src/governance/
├── governance.module.ts          # Main governance module
├── modules/
│   ├── audit.module.ts           # Audit functionality module
│   ├── approval.module.ts        # Approval workflow module
│   ├── history.module.ts         # Version control module
│   └── rollback.module.ts        # Rollback operations module
└── services/
    ├── audit.service.ts          # Audit event management
    ├── approval.service.ts       # Approval request handling
    ├── history.service.ts        # Knowledge versioning and snapshots
    ├── rollback.service.ts       # Rollback operation execution
    └── governance.service.ts     # Policy enforcement and management
```

## Key Features Implemented

### 1. Audit System (AuditService)
- Comprehensive logging of all system events
- Event categorization by type (Create, Update, Delete, etc.)
- Resource-specific audit trail
- Detailed event metadata storage

### 2. Approval Workflows (ApprovalService)
- Request-based approval system
- Automatic policy validation
- Historical tracking of decisions
- Expiry time handling for approvals

### 3. Version Control System (HistoryService)
- Knowledge snapshotting for all resources
- Full version history tracking
- Change diff computation between versions
- State reconstruction capabilities

### 4. Rollback Operations (RollbackService)
- Controlled rollback to previous versions
- Validation of rollback targets
- Execution tracking and reporting
- Version compatibility checking

### 5. Policy Enforcement (GovernanceService)
- Dynamic policy management
- Action validation against policies
- Automatic blocking of prohibited operations
- Extensible policy framework

## Database Schema Overview

The system introduces these new tables in the PostgreSQL database:

### ChangeSet
```prisma
model ChangeSet {
  id              Int      @id @default(autoincrement())
  resourceType    String
  resourceId      Int
  changeType      String
  beforeState     Json?
  afterState      Json?
  changeSummary   String?
  initiatedBy     String
  createdAt       DateTime @default(now())
}
```

### ApprovalRequest and ApprovalDecision
```prisma
model ApprovalRequest {
  id           Int      @id @default(autoincrement())
  resourceType String
  resourceId   Int
  changeSetId  Int
  requestReason String
  requestedBy  String
  status       String   @default("Pending")
  expiresAt    DateTime?
  createdAt    DateTime @default(now())
  changeSet    ChangeSet @relation(fields: [changeSetId], references: [id])
}

model ApprovalDecision {
  id              Int      @id @default(autoincrement())
  approvalRequestId Int
  decision        String
  decisionReason  String?
  approvedBy      String
  decidedAt       DateTime @default(now())
  approvalRequest ApprovalRequest @relation(fields: [approvalRequestId], references: [id])
}
```

### KnowledgeHistory
```prisma
model KnowledgeHistory {
  id              Int      @id @default(autoincrement())
  resourceType    String
  resourceId      Int
  versionNumber   Int
  snapshot        Json
  changeReference String?
  createdAt       DateTime @default(now())
  @@unique([resourceType, resourceId, versionNumber])
}
```

### RollbackOperation
```prisma
model RollbackOperation {
  id              Int      @id @default(autoincrement())
  resourceType    String
  resourceId      Int
  targetVersion   Int
  rollbackReason  String
  executedBy      String
  executedAt      DateTime @default(now())
}
```

### GovernancePolicy
```prisma
model GovernancePolicy {
  id             Int      @id @default(autoincrement())
  name           String
  policyType     String
  resourceType   String
  configuration  Json?
  isEnabled      Boolean  @default(true)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```

## Usage Examples

### Creating Audit Events
```typescript
await auditService.createAuditEvent('Update', {
  resourceType: 'Document',
  resourceId: 123,
  action: 'Updated title',
  beforeState: { title: 'Old Title' },
  afterState: { title: 'New Title' },
  userSource: 'admin@ussa.gov'
});
```

### Creating Approval Requests
```typescript
await approvalService.createApprovalRequest(
  'Document',
  123,
  changeSetId,
  'Need approval to update sensitive content',
  'doc_editor@ussa.gov',
  24 // Expires in 24 hours
);
```

### Version Control Snapshots
```typescript
await historyService.createKnowledgeSnapshot(
  'Document',
  123,
  { 
    title: 'Updated Document',
    content: 'New content here...',
    lastModified: new Date()
  },
  'approval-req-456'
);
```

## Integration Points

The governance system integrates with:
1. All knowledge management operations (document creation, updates, etc.)
2. API endpoints requiring approval workflows
3. Automation services that need tracking
4. Reporting and analytics modules

### API Endpoints (Example)

- `POST /governance/approval/requests` - Create approval request
- `GET /governance/approval/requests` - List approval requests
- `POST /governance/history/snapshots` - Create snapshot
- `GET /governance/history/:resourceType/:resourceId` - Get version history
- `POST /governance/rollback` - Execute rollback operation

## Security Considerations

1. All audit events are timestamped and traceable to source
2. Approval workflows prevent unauthorized changes
3. Version control ensures all modifications can be traced back
4. Rollback operations include detailed audit trail
5. Policy enforcement prevents prohibited actions
6. Role-based access controls can be implemented on top of this foundation

## Future Enhancements

1. Integration with SSO systems for user identity verification
2. Enhanced policy engine with rule-based configurations
3. Automated approval workflows based on thresholds
4. Real-time audit dashboard and reporting
5. Integration with external governance platforms
6. Audit event alerting system for security breaches