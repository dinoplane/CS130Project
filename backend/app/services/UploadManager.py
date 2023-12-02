from app.schema.mapping_schema import UploadRequestSchema
from app.services.uploadmapping import upload_mapping
from openpyxl import Workbook, load_workbook
from fastapi.responses import JSONResponse
from fastapi import HTTPException, Request, Body


class UploadManager:

    def __init__(self, request: Request, data: UploadRequestSchema = Body(...)):
        self.request: Request = request
        self.data :UploadRequestSchema = data

    def upload(self):

        # print(self.request.fuseki_url)
        # print(self.request.sheet_names)
        # print(self.request.data)



        try:
            # wb = load_workbook(self.request.file)
            for sheet_name in self.data.sheet_names:
                mapping_id = sheet_name.split('-', 1)[1]
                print(mapping_id)
                query = self.request.app.map_db["mappings"].find_one({"id": str(mapping_id)})['query']
                sheet = self.data.data #wb[sheet_name]
                upload_mapping(self.data.fuseki_url, query, sheet)
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

        response_data = {"message": "success"}
        return JSONResponse(content=response_data)
