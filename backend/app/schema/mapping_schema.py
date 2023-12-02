from typing import List

from pydantic import BaseModel, Field
from datetime import datetime
import uuid

from fastapi import File, UploadFile


class MappingEntry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(...)
    query: str = Field(...)
    fuseki_url: str = Field(...)
    date: str = Field(default_factory=lambda: datetime.now().strftime("%m/%d/%Y"))


class FetchMappingRequestModel(BaseModel):
    fuseki_url: str = Field(...)


class DeleteMappingRequestModel(BaseModel):
    ids: List[str] = Field(...)


class DownloadRequestSchema(BaseModel):
    fuseki_url: str = Field(...)
    selected_mappings: List[MappingEntry] = Field(...)

class UploadRequestSchema(BaseModel):
    fuseki_url: str = Field(...)
    sheet_names: List[str] = Field(...)
    data: List[List[str]] = Field(...)

    # file: UploadFile = File(...)
    # file should be passed here
