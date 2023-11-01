import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.router.api import ping_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Adding router
app.include_router(ping_router)

if __name__ == "__main__":

    uvicorn.run(app, host="0.0.0.0", port=8000)
