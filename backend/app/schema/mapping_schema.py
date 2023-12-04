"""Module providing BaseModel schemas"""
import uuid
from typing import List
from datetime import datetime
from pydantic import BaseModel, Field

from fastapi import File, UploadFile


class MappingEntry(BaseModel):
    """Class representing a Mapping Entry"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4())[:10])
    name: str = Field(...)
    query: str = Field(...)
    fuseki_url: str = Field(...)
    date: str = Field(default_factory=lambda: datetime.now().strftime("%m/%d/%Y"))


class FetchMappingRequestModel(BaseModel):
    """Class representing a Fetch Mapping Request"""
    fuseki_url: str = Field(...)


class DeleteMappingRequestModel(BaseModel):
    """Class representing a Delete Mapping Request"""
    ids: List[str] = Field(...)


class DownloadRequestSchema(BaseModel):
    """Class representing a Download Request"""
    fuseki_url: str = Field(...)
    selected_mappings: List[MappingEntry] = Field(...)


class CheckFusekiConnectionRequestModel(BaseModel):
    """Class representing a Check Fuseki Connection Request"""
    fuseki_url: str = Field(...)
