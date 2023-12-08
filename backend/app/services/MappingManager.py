"""Module providing MappingDBManager Class"""
import logging
from fastapi import Request

from app.schema.mapping_schema import MappingEntry, FetchMappingRequestModel, DeleteMappingRequestModel
from app.database.mongodb import insert_one, find, delete

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class MappingDBManager:
    """Class representing MappingDB Manager"""
    @staticmethod
    def add_mapping(req: Request, mapping: MappingEntry):
        """Method returning MappingEntry after adding it to mappingDB"""
        mapping_data = dict(mapping)
        # insert to DB
        result = insert_one(req, mapping_data)
        # return inserted val from DB (i.e. ensure it got added)
        mapping_from_db = req.app.map_db["mappings"].find_one({"_id": result.inserted_id})
        mapping_from_db.pop("_id")
        return mapping_from_db

    @staticmethod
    def fetch_mappings(req: Request, data: FetchMappingRequestModel):
        """Method returning list of MappingEntries with FetchMappingRequest query"""
        # something to get the mappings
        query = dict(data)
        mapping_entries = find(req, query)
        return mapping_entries

    @staticmethod
    def delete_mappings(req: Request, input_data: DeleteMappingRequestModel):
        """Method deleting MappingEntries with DeleteMappingRequest query"""
        for mapping_id in input_data.ids:
            delete_result = delete(req, mapping_id)
            logger.info(delete_result)
