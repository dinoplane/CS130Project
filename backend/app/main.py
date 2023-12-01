import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.router.api import ping_router, mappingDB_router, router
from app.database.mongodb_connection import lifespan
from environment_variables import set_env_variables

app = FastAPI(lifespan=lifespan)  # since on_event is deprecated

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Adding router
app.include_router(ping_router)
app.include_router(mappingDB_router)
app.include_router(router)

if __name__ == "__main__":
    set_env_variables()
    uvicorn.run(app, host="0.0.0.0", port=8000)
