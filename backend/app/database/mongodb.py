"""Module providing functions calls to access MongoDB connection"""
from app.schema.mapping_schema import MappingEntry
from fastapi import Request


# for queries to MongoDB connection
def insert_one(req: Request, mapping: MappingEntry):
    """Function inserting MappingEntry to mapping collection of MongoDB database"""
    return req.app.map_db["mappings"].insert_one(mapping)  # query database


def find(req: Request, query):
    """Function returning list of MappingEntry with specified query in MongoDB database"""
    mappings = req.app.map_db["mappings"].find(query)
    documents = []
    if mappings is not None:
        documents = [document for document in mappings]
        # Remove the "_id" field from each document
        for document in documents:
            document.pop("_id", None)
    return documents


def delete(req: Request, mapping_id: str):
    """Function deleting MappingEntry with specified 'id' in MongoDB database"""
    query = {'id': mapping_id}
    result = req.app.map_db["mappings"].delete_one(query)
    return result
