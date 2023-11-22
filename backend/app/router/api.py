from fastapi import APIRouter, Request, Response, Body, status
from app.schema.mapping_schema import MappingEntry
from app.services.MappingManager import MappingDB_Manager
from typing import List

ping_router = APIRouter(prefix="/excel-interface/mapping-database-ping", tags=["mapping-database-ping"])

mappingDB_router = APIRouter(prefix="/excel-interface/mapping-database", tags=["mapping-database"])

@ping_router.get("/ping")
def ping():
    return {"ping": "pong"}

@mappingDB_router.get("/", response_model=List[MappingEntry])
def fetch_mappings(request: Request):
    return MappingDB_Manager.fetch_mappings(request)

@mappingDB_router.post("/", status_code=status.HTTP_201_CREATED, response_model=MappingEntry)
def add_mapping(request: Request, mapping: MappingEntry = Body(...)):
    return MappingDB_Manager.add_mapping(request, mapping) #call services function
