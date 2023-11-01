from fastapi import APIRouter

ping_router = APIRouter(prefix="/excel-interface/mapping-database", tags=["mapping-database"])


@ping_router.get("/ping")
def ping():
    return {"ping": "pong"}
