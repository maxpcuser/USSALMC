from typing import Any, Dict, Optional
from dataclasses import dataclass, field
from datetime import datetime

@dataclass
class ExtractionResult:
    """Represents a single extraction result with metadata."""
    
    result_id: str
    job_id: str
    run_id: str
    extracted_data: Any
    created_at: datetime = field(default_factory=datetime.now)
    metadata: Dict[str, Any] = field(default_factory=dict)
    confidence_score: Optional[float] = None
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert result to dictionary format."""
        return {
            "result_id": self.result_id,
            "job_id": self.job_id,
            "run_id": self.run_id,
            "extracted_data": self.extracted_data,
            "created_at": self.created_at.isoformat(),
            "metadata": self.metadata,
            "confidence_score": self.confidence_score
        }