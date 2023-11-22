from app.schema.mapping_schema import MappingEntry
from fastapi import Request
#for queries to MongoDB connection
def insert_one(req: Request, mapping: MappingEntry):
    return req.app.map_db["mappings"].insert_one(mapping) #query database
        
def find_one(req: Request, mapping:MappingEntry):
    return req.app.map_db["mappings"].find_one({"_id": mapping.inserted_id}) #query database

def find(req: Request):
    return list(req.app.map_db["mappings"].find())