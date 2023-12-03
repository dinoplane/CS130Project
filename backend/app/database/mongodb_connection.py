from fastapi import FastAPI
from contextlib import asynccontextmanager
from pymongo import MongoClient
import os


# to setup the mongodb connection
@asynccontextmanager
async def lifespan(app: FastAPI):
    app.mongodb_client = MongoClient(os.getenv('CONNECT_URL'))
    app.map_db = app.mongodb_client['mapping_DB']
    yield
    app.mongodb_client.close()
