from .models import Product, User, Asset
from datetime import datetime, timedelta

# Получить список продуктов с доходами за последний месяц
async def get_products_last_month():
    one_month_ago = datetime.now() - timedelta(days=30)
    return await Product.filter(date__gte=one_month_ago).order_by('-income').all()

# Создать новый продукт
async def create_product(name: str, income: float):
    return await Product.create(name=name, income=income)

# Получить пользователя по Telegram ID
async def get_user_by_telegram_id(telegram_id: int):
    return await User.get_or_none(telegram_id=telegram_id)

# Создать нового пользователя
async def create_user(telegram_id: int, username: str):
    return await User.create(telegram_id=telegram_id, username=username)

async def get_total_assets_value():
    return await Asset.all().sum('value')

async def get_depreciable_assets_count():
    return await Asset.filter(is_depreciable=True).count()

async def get_expiring_assets():
    return await Asset.filter(months_left__lte=3).all()

async def get_amortization_data():
    return await Asset.all()
