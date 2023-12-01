from bson import ObjectId, json_util

from app.schema.mapping_schema import MappingEntry
from fastapi import Request


# for queries to MongoDB connection
def insert_one(req: Request, mapping: MappingEntry):
    return req.app.map_db["mappings"].insert_one(mapping)  # query database


def find(req: Request, query):
    mappings = req.app.map_db["mappings"].find({"fuseki_url":"http://localhost:3030/db/"})
    documents = []
    if mappings is not None:
        documents = [document for document in mappings]
        # Remove the "_id" field from each document
        for document in documents:
            document.pop("_id", None)
    return documents


def delete(req: Request, mapping_id: str):
    query = {'Id': mapping_id}
    result = req.app.map_db["mappings"].delete_one(query)
    return result
