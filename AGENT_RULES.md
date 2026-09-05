# USSA Lore Master Knowledge Core Agent Rules

## Repository Root Policy

All repositories must follow this root policy:

- Root directory name is `USSA LORE MASTER KNOWLEDGE CORE`
- All paths within the repository must be relative to the root
- No absolute paths in any configuration or code
- All scripts and executables are run from the repository root unless specified otherwise

## File Placement Rules

- Application code goes in `/apps/` directory
- Shared libraries go in `/libs/`
- Configuration files are in the root of their respective applications
- Environment files go in the root of the repository
- Documentation is in `/docs/` or as README.md for top-level items

## Project Structure Rules

- NestJS application: `/apps/api`
- Next.js application: `/apps/web`
- Worker service: `/apps/worker`
- Scraper service: `/apps/scraper`
- Prisma schema: `/prisma/schema.prisma`
- Shared configurations in root directory (`.gitignore`, `.eslintrc.json`, etc.)
- Scripts in `/scripts/` directory

## Technology Stack Rules

- API Application: NestJS with TypeScript
- Web Application: Next.js with TypeScript, App Router, Tailwind, ShadCN
- Worker Service: Node.js with TypeScript
- Scraper Service: Node.js with Playwright
- Database: PostgreSQL with Prisma ORM
- Caching: Redis
- Containerization: Docker (if applicable)
- Version Control: Git

## Validation Rules

All created files must:
- Be valid JSON/YAML/TypeScript/Shell script format
- Follow project structure rules
- Not contain any secrets or sensitive information
- Be syntactically correct before committing to repository

## Git Failure Policy

If a Git operation fails during execution:
1. Log the error in `execution.log`
2. Do not proceed with additional steps
3. Inform the user about the failure
4. Exit the agent execution
5. Wait for user intervention
