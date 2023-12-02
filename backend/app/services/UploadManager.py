from app.services.uploadmapping import upload_mapping
from openpyxl import Workbook, load_workbook
from fastapi.responses import JSONResponse
from fastapi import HTTPException, Request, UploadFile


class UploadManager:

    def __init__(self, request: Request, file: UploadFile = UploadFile(...)):
        self.request: Request = request
        self.file: UploadFile = file

    def upload(self):
        try:
            wb = load_workbook(self.file)
            for sheet_name in wb:
                mapping_id = sheet_name.split('-', 1)[1]
                print(mapping_id)
                mapping = self.request.app.map_db["mappings"].find_one({"id": str(mapping_id)})
                query = mapping['query']
                fuseki_url = mapping['fuseki_url']
                sheet = wb[sheet_name]
                upload_mapping(fuseki_url, query, sheet)
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

        response_data = {"message": "success"}
        return JSONResponse(content=response_data)
