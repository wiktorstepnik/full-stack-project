import uvicorn
from fastapi import APIRouter, FastAPI
from starlette.middleware.cors import CORSMiddleware

from routes import users_router

app = FastAPI(title="Users API",
              description="Users API",
              version="1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
api_v1 = APIRouter(prefix="/v1")

api_v1.include_router(users_router)

app.include_router(api_v1)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
