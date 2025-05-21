from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from webapp.constants import (
    ZENBUNDLE_API_KEY_HEADER_NAME,
    ZENBUNDLE_CSRF_TOKEN_HEADER_NAME,
)
from webapp.routers import account, delivery

app = FastAPI(
    title="Zenbundle Playground APIs",
    description="Zenbundle Playground APIs helps you do awesome stuff 🚀",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_methods=(
        "POST",
        "GET",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS",
    ),
    allow_headers=(
        ZENBUNDLE_API_KEY_HEADER_NAME,
        ZENBUNDLE_CSRF_TOKEN_HEADER_NAME,
    ),
    allow_credentials=True,
    expose_headers=[
        ZENBUNDLE_CSRF_TOKEN_HEADER_NAME,
    ],
)


app.include_router(account.router, prefix="/v1/account")
app.include_router(delivery.router, prefix="/v1/delivery")


@app.get("/{path:path}", include_in_schema=False)
async def not_found():
    raise HTTPException(404, "Not Found")
