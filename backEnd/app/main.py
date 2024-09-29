from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from backEnd.api import products, users
import os
from dotenv import load_dotenv

app = FastAPI()

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

app.include_router(products.router, prefix="/api")
app.include_router(users.router, prefix="/api")

register_tortoise(
    app,
    db_url=DATABASE_URL,
    modules={"models": ["backEnd.database.models"]},
    generate_schemas=True,
    add_exception_handlers=True,
)
