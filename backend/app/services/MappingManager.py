import logging
from typing import List

from app.schema.mapping_schema import MappingEntry, FetchMappingRequestModel, DeleteMappingRequestModel
from fastapi import Request
from app.database.mongodb import insert_one, find, delete

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class MappingDBManager:
    @staticmethod
    def add_mapping(req: Request, mapping: MappingEntry):
        mapping_data = dict(mapping)
        # insert to DB
        result = insert_one(req, mapping_data)
        # return inserted val from DB (i.e. ensure it got added)
        mapping_from_db = req.app.map_db["mappings"].find_one({"_id": result.inserted_id})
        mapping_from_db.pop("_id")
        return mapping_from_db

    @staticmethod
    def fetch_mappings(req: Request, data: FetchMappingRequestModel):
        # something to get the mappings
        query = dict(data)
        mapping_entries = find(req, query)
        return mapping_entries

    @staticmethod
    def delete_mappings(req: Request, input_data: DeleteMappingRequestModel):
        for mapping_id in input_data.ids:
            delete_result = delete(req, mapping_id)
            logger.info(delete_result)

    def validate_mapping():
        return
        # something to validate mapping
