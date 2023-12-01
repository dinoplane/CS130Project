from app.schema.mapping_schema import UploadRequestSchema
from app.services.uploadmapping.py import upload_mapping

class UploadManager:

    def __init__(self, request: UploadRequestSchema):
        self.request: UploadRequestSchema = request

    def upload():
        print(self.request.file)
        #upload_mapping(self.request.fuseki_url, file)
        return None