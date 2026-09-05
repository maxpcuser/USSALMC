# Extraction Engine

The Extraction Engine module provides API endpoints for managing extraction workflows. It allows users to define, execute, and monitor data extraction jobs from various sources using defined templates.

## API Endpoints

### Workflow Management

- `GET /extraction/workflows` - Get all extraction workflows
- `GET /extraction/workflows/:id` - Get a specific workflow by ID
- `POST /extraction/workflows` - Create a new extraction workflow
- `PUT /extraction/workflows/:id` - Update an existing workflow
- `DELETE /extraction/workflows/:id` - Delete a workflow

### Job Management

- `GET /extraction/jobs` - Get all extraction jobs
- `GET /extraction/jobs/:id` - Get a specific job by ID
- `POST /extraction/jobs` - Create a new extraction job
- `PUT /extraction/jobs/:id` - Update an existing job
- `DELETE /extraction/jobs/:id` - Delete a job

### Execution Control

- `POST /extraction/workflows/:id/execute` - Execute a workflow
- `POST /extraction/jobs/:id/start` - Start a job execution
- `POST /extraction/jobs/:id/stop` - Stop a running job

### Status and Results

- `GET /extraction/status/:jobId` - Get the status of a job
- `GET /extraction/jobs/:id/results` - Get results for a completed job