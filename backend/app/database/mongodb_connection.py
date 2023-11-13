from fastapi import FastAPI
from contextlib import asynccontextmanager
from pymongo import MongoClient 

#to setup the mongodb connection
@asynccontextmanager
async def lifespan(app: FastAPI):
    app.mongodb_client = MongoClient("mongodb+srv://Cluster33690:eE1RRF1ZSEFW@cluster33690.au8shvj.mongodb.net")
    app.map_db = app.mongodb_client["mapping_DB"]
    yield
    app.mongodb_client.close()