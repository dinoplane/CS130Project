from fastapi import APIRouter, Request, Response, Body, status, HTTPException
from pymongo.errors import PyMongoError

from app.schema.mapping_schema import MappingEntry, DownloadRequestSchema, FetchMappingRequestModel, \
    DeleteMappingRequestModel, UploadRequestSchema
from app.services.MappingManager import MappingDBManager
from app.services.UploadManager import UploadManager
from app.services.DownloadManager import DownloadManager

ping_router = APIRouter(prefix="/excel-interface/mapping-database-ping", tags=["mapping-database-ping"])

mappingDB_router = APIRouter(prefix="/excel-interface/mapping-database", tags=["mapping-database"])

router = APIRouter(prefix="/excel-interface/operations", tags=["excel-operations"])


@ping_router.get("/ping")
def ping():
    return {"ping": "pong"}


@mappingDB_router.post("/fetch")
def fetch_mappings(request: Request, request_body: FetchMappingRequestModel = Body(...)):
    mappings = MappingDBManager.fetch_mappings(request, request_body)
    return {"result": mappings}


@mappingDB_router.post("/create", status_code=status.HTTP_201_CREATED)
def add_mapping(request: Request, mappings: MappingEntry = Body(...)):
    return MappingDBManager.add_mapping(request, mappings)  # call services function


@mappingDB_router.delete("/delete", status_code=status.HTTP_204_NO_CONTENT)
async def delete_mappings(request: Request, items_to_delete: DeleteMappingRequestModel = Body(...)):
    try:
        MappingDBManager.delete_mappings(request, items_to_delete)
    except PyMongoError as pymongo_error:
        # Handle the PyMongoError here, log or perform other actions
        error_details = str(pymongo_error)
        raise HTTPException(status_code=500, detail=f"MongoDB error: {error_details}")
    except Exception as e:
        # Handle other exceptions (non-HTTPException and non-PyMongoError) here, log or perform other actions
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")



@router.post("/upload", status_code=status.HTTP_200_OK)
async def upload_mapping(request: Request, data: UploadRequestSchema = Body(...)):
    upload_client = UploadManager(request, data)
    return upload_client.upload()

@router.post(path="/download", status_code=status.HTTP_200_OK)
async def download(request: DownloadRequestSchema):
    download_client = DownloadManager(request)
    return download_client.download()
