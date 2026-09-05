from typing import Any, Dict, Optional
from dataclasses import dataclass, field
from datetime import datetime

@dataclass
class ExtractionRun:
    """Represents a single extraction run with its metadata and results."""
    
    run_id: str
    job_id: str
    data: Any
    config: Dict[str, Any]
    started_at: datetime = field(default_factory=datetime.now)
    completed_at: Optional[datetime] = None
    result: Optional[Any] = None
    error_message: Optional[str] = None
    status: str = "running"
    
    def complete(self, result: Any, error_message: Optional[str] = None):
        """Mark the run as completed."""
        self.completed_at = datetime.now()
        self.result = result
        self.status = "completed" if not error_message else "failed"
        self.error_message = error_message