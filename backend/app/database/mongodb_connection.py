"""Module providing a FastAPI lifespan function"""
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from pymongo import MongoClient



# to setup the mongodb connection
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Function setting FastAPI app atributes for MongoDB connection"""
    app.mongodb_client = MongoClient(os.getenv('CONNECT_URL'))
    app.map_db = app.mongodb_client['mapping_DB']
    yield
    app.mongodb_client.close()
