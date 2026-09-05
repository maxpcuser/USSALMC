from typing import Any, Dict, List, Optional, Union
from dataclasses import dataclass, field
from datetime import datetime
import uuid

from .engine import ExtractionEngine
from .job import ExtractionJob, JobStatus
from .run import ExtractionRun
from .result import ExtractionResult

class ExtractionEngineService:
    """Main service for handling extraction jobs, runs, and results."""
    
    def __init__(self):
        self.jobs: Dict[str, ExtractionJob] = {}
        self.runs: Dict[str, ExtractionRun] = {}
        self.results: Dict[str, ExtractionResult] = {}
        self.engine = ExtractionEngine()
        
    def create_job(self, 
                   data: Union[str, Dict, List], 
                   schema: Optional[Dict] = None,
                   config: Optional[Dict] = None) -> ExtractionJob:
        """
        Create a new extraction job.
        
        Args:
            data: Data to process
            schema: Optional schema to guide extraction
            config: Optional configuration for extraction
            
        Returns:
            Created ExtractionJob instance
        """
        job_id = str(uuid.uuid4())
        job = ExtractionJob(
            job_id=job_id,
            data=data,
            schema=schema,
            config=config
        )
        self.jobs[job_id] = job
        return job
    
    def start_job(self, job_id: str) -> bool:
        """
        Start processing a job.
        
        Args:
            job_id: ID of the job to start
            
        Returns:
            True if job was started successfully, False otherwise
        """
        if job_id not in self.jobs:
            return False
            
        job = self.jobs[job_id]
        if job.status != JobStatus.PENDING:
            return False
            
        # Update job status
        job.update_status(JobStatus.RUNNING)
        
        # Process the job data (simplified for this example)
        try:
            if isinstance(job.data, list):
                results = self.engine.process_batch(job.data, job.schema)
            else:
                result = self.engine.extract(job.data, job.schema)
                results = [result]
                
            # Create and store runs and results
            for i, extracted_data in enumerate(results):
                run_id = str(uuid.uuid4())
                run = ExtractionRun(
                    run_id=run_id,
                    job_id=job_id,
                    data=job.data[i] if isinstance(job.data, list) else job.data,
                    config=job.config or {}
                )
                
                result_id = str(uuid.uuid4())
                result = ExtractionResult(
                    result_id=result_id,
                    job_id=job_id,
                    run_id=run_id,
                    extracted_data=extracted_data
                )
                
                run.complete(extracted_data)
                self.runs[run_id] = run
                self.results[result_id] = result
                job.results.append(result_id)
            
            job.update_status(JobStatus.COMPLETED)
            return True
            
        except Exception as e:
            job.update_status(JobStatus.FAILED, str(e))
            return False
    
    def get_job(self, job_id: str) -> Optional[ExtractionJob]:
        """Get a job by its ID."""
        return self.jobs.get(job_id)
    
    def get_run(self, run_id: str) -> Optional[ExtractionRun]:
        """Get a run by its ID."""
        return self.runs.get(run_id)
    
    def get_result(self, result_id: str) -> Optional[ExtractionResult]:
        """Get a result by its ID."""
        return self.results.get(result_id)
    
    def list_jobs(self) -> List[ExtractionJob]:
        """List all jobs."""
        return list(self.jobs.values())
    
    def list_runs_for_job(self, job_id: str) -> List[ExtractionRun]:
        """Get all runs associated with a job."""
        return [run for run in self.runs.values() if run.job_id == job_id]
    
    def list_results_for_job(self, job_id: str) -> List[ExtractionResult]:
        """Get all results associated with a job."""
        return [result for result in self.results.values() if result.job_id == job_id]
    
    def cancel_job(self, job_id: str) -> bool:
        """
        Cancel a job.
        
        Args:
            job_id: ID of the job to cancel
            
        Returns:
            True if job was cancelled successfully, False otherwise
        """
        if job_id not in self.jobs:
            return False
            
        job = self.jobs[job_id]
        if job.status in [JobStatus.COMPLETED, JobStatus.FAILED]:
            return False
            
        job.update_status(JobStatus.CANCELLED)
        return True

# Export the main service instance
extraction_service = ExtractionEngineService()