from fastapi import FastAPI
from contextlib import asynccontextmanager
from pymongo import MongoClient 
from dotenv import dotenv_values

#to setup the mongodb connection
@asynccontextmanager
async def lifespan(app: FastAPI):
    env_var = dotenv_values('.env')
    app.mongodb_client = MongoClient(env_var["CONNECT_URL"])
    app.map_db = app.mongodb_client[env_var["MAP_DB"]]
    yield
    app.mongodb_client.close()