from app.schema.mapping_schema import UploadRequestSchema
from app.services.uploadmapping import upload_mapping
from openpyxl import Workbook, load_workbook
from fastapi.responses import JSONResponse

class UploadManager:

    def __init__(self, request: UploadRequestSchema):
        self.request: UploadRequestSchema = request

    def upload():
        try:
            wb = load_workbook(self.request.file)
            for sheet_name in wb.sheetnames:
                mapping_id = sheet_name.split('-', 1)[1]
                query = req.app.map_db["mappings"].find_one({"id": mapping_id}).query
                sheet = wb[sheet_name]
                upload_mapping(self.request.fuseki_url, query, sheet)
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

        response_data = {"message": "success"}
        return JSONResponse(content=response_data)