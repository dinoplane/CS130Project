from pydantic import BaseModel, Field
from datetime import datetime
import uuid

class MappingEntry(BaseModel):
    id: str = Field(default=uuid.uuid4, alias="_id")
    info: str = Field(default=None, alias="info")
    date: str = Field(default=datetime.date, alias="date")