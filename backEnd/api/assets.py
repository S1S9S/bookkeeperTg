from fastapi import APIRouter
from backEnd.database import crud

router = APIRouter()

@router.get("/assets/total-value")
async def total_assets_value():
    total_value = await crud.get_total_assets_value()
    return {"total_value": total_value}

@router.get("/assets/depreciable-count")
async def depreciable_assets_count():
    count = await crud.get_depreciable_assets_count()
    return {"depreciable_count": count}

@router.get("/assets/expiring")
async def expiring_assets():
    assets = await crud.get_expiring_assets()
    return [{"name": asset.name, "value": asset.value, "months_left": asset.months_left} for asset in assets]

@router.get("/assets/amortization")
async def amortization_data():
    assets = await crud.get_amortization_data()
    amortization = [{"name": asset.name, "monthly_depreciation": asset.depreciation} for asset in assets]
    return amortization