from typing import Any, Dict, List, Optional
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum

class JobStatus(str, Enum):
    """Enumeration of possible job statuses."""
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"

@dataclass
class ExtractionJob:
    """Represents an extraction job with its configuration and status."""
    
    job_id: str
    data: Any
    schema: Optional[Dict] = None
    config: Optional[Dict] = None
    status: JobStatus = JobStatus.PENDING
    created_at: datetime = field(default_factory=datetime.now)
    updated_at: datetime = field(default_factory=datetime.now)
    results: List[Any] = field(default_factory=list)
    error_message: Optional[str] = None
    
    def update_status(self, new_status: JobStatus, error_message: Optional[str] = None):
        """Update job status and timestamps."""
        self.status = new_status
        self.updated_at = datetime.now()
        if error_message:
            self.error_message = error_message