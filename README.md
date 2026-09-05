# USSA Lore Master Knowledge Core

## Project Purpose

The USSA Lore Master Knowledge Core is a foundational platform for managing and organizing the vast knowledge of the United States Space Command (USSA). This project is part of Phase 0, implementing the essential application structures required for all future development phases.

## Technology Stack

- **API Layer**: NestJS with TypeScript
- **Web Frontend**: Next.js with TypeScript, App Router, Tailwind, ShadCN
- **Worker Service**: Node.js with TypeScript
- **Scraper Service**: Node.js with Playwright
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis
- **Build Tooling**: NPM workspaces

## Directory Structure

```
.
├── apps/
│   ├── api/              # NestJS API application
│   ├── web/              # Next.js Web application
│   ├── worker/           # Worker service
│   └── scraper/          # Scraper service
├── prisma/               # Prisma database schema
├── scripts/              # Deployment and management scripts
├── .env.example          # Example environment variables
├── package.json          # Workspace configuration
└── README.md             # This file
```

## Development Startup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Stop the development server:
   ```bash
   npm stop
   ```

4. Update the project:
   ```bash
   npm update
   ```