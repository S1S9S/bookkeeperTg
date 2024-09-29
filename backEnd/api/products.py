from fastapi import APIRouter
from backEnd.database import crud

router = APIRouter()

@router.get("/products/income")
async def get_products_income():
    products = await crud.get_products_last_month()
    return [{"name": p.name, "income": p.income} for p in products]
