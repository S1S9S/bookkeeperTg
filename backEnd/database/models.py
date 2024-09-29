from tortoise import fields, models
from datetime import date

class Product(models.Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100)
    income = fields.FloatField()
    date = fields.DatetimeField(auto_now_add=True)

    class Meta:
        table = "products"

from tortoise import fields, models

class User(models.Model):
    id = fields.IntField(pk=True)
    telegram_id = fields.BigIntField(unique=True)
    username = fields.CharField(max_length=50, null=True)
    avatar_url = fields.CharField(max_length=200, null=True)
    created_at = fields.DatetimeField(auto_now_add=True)

    class Meta:
        table = "users"

class Asset(models.Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100)
    value = fields.FloatField()
    depreciation = fields.FloatField()
    life_span = fields.IntField()
    purchase_date = fields.DateField()
    is_depreciable = fields.BooleanField(default=True)

    """Количество месяцев до истичения срока актива"""
    @property
    def months_left(self) -> int:
        current_date = date.today()
        months_passed = (current_date.year - self.purchase_date.year) * 12 + (current_date.month - self.purchase_date.month)
        return self.life_span - months_passed
    
    """Проверка на истичение срока в ближайщие 3 месяцв"""
    @property
    def is_expiring_soon(self) -> bool:
        return self.months_left <=3
    