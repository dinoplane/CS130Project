"""Module providing FastAPI app endpoints"""
from io import BytesIO
from fastapi import APIRouter, Request, Body, status, HTTPException, UploadFile
from pymongo.errors import PyMongoError

from app.database.fuseki_connection import Fuseki
from app.schema.mapping_schema import MappingEntry, DownloadRequestSchema, FetchMappingRequestModel, \
    DeleteMappingRequestModel, CheckFusekiConnectionRequestModel
from app.services.DownloadManager import DownloadManager
from app.services.MappingManager import MappingDBManager
from app.services.UploadManager import UploadManager

from openpyxl import Workbook, load_workbook


ping_router = APIRouter(prefix="/excel-interface/mapping-database-ping", tags=["mapping-database-ping"])

mappingDB_router = APIRouter(prefix="/excel-interface/mapping-database", tags=["mapping-database"])

router = APIRouter(prefix="/excel-interface/operations", tags=["excel-operations"])


@ping_router.get("/ping")
def ping():
    """Endpoint Function for ping request"""
    return {"ping": "pong"}


@mappingDB_router.post("/fetch")
def fetch_mappings(request: Request, request_body: FetchMappingRequestModel = Body(...)):
    """Endpoint Function returning requested mappings"""
    mappings = MappingDBManager.fetch_mappings(request, request_body)
    return {"result": mappings}


@mappingDB_router.post("/create", status_code=status.HTTP_201_CREATED)
def add_mapping(request: Request, mappings: MappingEntry = Body(...)):
    """Endpoint Function adding requested mapping"""
    return MappingDBManager.add_mapping(request, mappings)  # call services function


@mappingDB_router.delete("/delete", status_code=status.HTTP_204_NO_CONTENT)
async def delete_mappings(request: Request, items_to_delete: DeleteMappingRequestModel = Body(...)):
    """Endpoint Function deleting requested mapping"""
    try:
        MappingDBManager.delete_mappings(request, items_to_delete)
    except PyMongoError as pymongo_error:
        # Handle the PyMongoError here, log or perform other actions
        error_details = str(pymongo_error)
        raise HTTPException(status_code=500, detail=f"MongoDB error: {error_details}") from pymongo_error
    except Exception as e:
        # Handle other exceptions (non-HTTPException and non-PyMongoError) here, log or perform other actions
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}") from e

@router.post(path="/download", status_code=status.HTTP_200_OK)
async def download(request: DownloadRequestSchema):
    """Endpoint Function returning requested Workbook"""
    download_client = DownloadManager(request)
    return download_client.download()

@router.post("/upload", status_code=status.HTTP_200_OK)
async def upload_mapping(request: Request, file: UploadFile = UploadFile(...)):
    """Endpoint Function uploading requested Workbook"""
    upload_client = UploadManager(request)
    contents = await file.read()

    wb = load_workbook(BytesIO(contents))
    return upload_client.upload(wb)

@router.post("/check-connection", status_code=status.HTTP_200_OK)
async def check_connection(request: Request, request_model: CheckFusekiConnectionRequestModel = Body(...)):
    """Endpoint Function checking Fuseki connection"""
    return Fuseki.is_valid_url(request_model.fuseki_url)
