from pydantic import BaseModel, Field
from datetime import datetime
import uuid

class MappingEntry(BaseModel):
    id: int = Field(default=int, alias="id")
    name: str = Field(default=str, alias="name")
    query: str = Field(default=str, alias="query")
    date: str = Field(default=str, alias="date")
