"""
Test module for the Extraction Engine Service
"""

from extraction_engine.service import extraction_service
from extraction_engine.job import ExtractionJob
from extraction_engine.engine import ExtractionEngine

def test_service_creation():
    """Test that we can create jobs and use the service."""
    
    # Test creating a job
    job = extraction_service.create_job(
        data="This is sample text for extraction",
        schema={"type": "object", "properties": {"key": {"type": "string"}}}
    )
    
    print(f"Created job with ID: {job.job_id}")
    print(f"Job status: {job.status}")
    
    # Test starting the job
    success = extraction_service.start_job(job.job_id)
    print(f"Job started successfully: {success}")
    
    # Test getting the job
    retrieved_job = extraction_service.get_job(job.job_id)
    print(f"Retrieved job status: {retrieved_job.status if retrieved_job else 'None'}")
    
    return True

if __name__ == "__main__":
    test_service_creation()