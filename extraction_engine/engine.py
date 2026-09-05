from typing import Any, Dict, List, Optional, Union
from dataclasses import dataclass

@dataclass
class ExtractionConfig:
    """Configuration for the extraction process."""
    model: str = "gpt-4o"
    max_tokens: int = 2000
    temperature: float = 0.3
    top_p: float = 1.0
    frequency_penalty: float = 0.0
    presence_penalty: float = 0.0

class ExtractionEngine:
    """Main extraction engine for processing and analyzing data."""
    
    def __init__(self, config: Optional[ExtractionConfig] = None):
        self.config = config or ExtractionConfig()
        
    def extract(self, data: Union[str, Dict, List], schema: Optional[Dict] = None) -> Dict[str, Any]:
        """
        Extract structured information from data using the configured model.
        
        Args:
            data: Input data to process
            schema: Optional schema to guide extraction
            
        Returns:
            Dictionary containing extracted results
        """
        raise NotImplementedError("Subclasses must implement the extract method")
    
    def process_batch(self, data_list: List[Union[str, Dict]], schema: Optional[Dict] = None) -> List[Dict[str, Any]]:
        """
        Process multiple data items in batch.
        
        Args:
            data_list: List of data items to process
            schema: Optional schema to guide extraction
            
        Returns:
            List of extracted results
        """
        return [self.extract(data, schema) for data in data_list]