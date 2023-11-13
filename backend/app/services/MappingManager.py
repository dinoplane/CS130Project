from backend.app.schema.mapping_schema import MappingEntry
from fastapi.encoders import jsonable_encoder as jsn_enc
from fastapi import Request, Response, Body, status
from backend.app.database.mongodb import insert_one, find_one, find

class MappingDB_Manager():
    def add_mapping(req: Request, mapping = MappingEntry):
        mapping = jsn_enc(mapping)
        #insert to DB
        new_map = insert_one(req, mapping)
         #return inserted val from DB (i.e. ensure it got added)
        map_add = find_one(req, new_map)
        return map_add
    def fetch_mappings(req: Request):
        #something to get the mappings
        mappingEntries = find(req)
        return mappingEntries
    def remove_mapping():
        return
        #something to remove mapping
    def validate_mapping():
        return
        #something to validate mapping
