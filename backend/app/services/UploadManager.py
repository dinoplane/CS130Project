from app.services.uploadmapping import upload_mapping

from fastapi.responses import JSONResponse
from fastapi import HTTPException, Request, UploadFile


class UploadManager:

    def __init__(self, request: Request):
        self.request: Request = request

    def upload(self, wb):
        try:
            for sheet_name in wb.sheetnames:
                mapping_id = sheet_name.split('-', 1)[1]
                mapping = self.request.app.map_db["mappings"].find_one({"id": str(mapping_id)})
                query = mapping['query']
                fuseki_url = mapping['fuseki_url']
                sheet = wb[sheet_name]
                upload_mapping(fuseki_url, query, sheet)

        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

        response_data = {"message": "success"}
        return JSONResponse(content=response_data)
