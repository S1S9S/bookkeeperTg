from tortoise import Tortoise, fields, models
from tortoise.contrib.pydantic import pydantic_model_creator

class User(models.Model):
    id = fields.IntField(pk=True)
    telegram_id = fields.BigIntField(unique=True)
    username = fields.CharField(max_length=50, null=True)
    created_at = fields.DatetimeField(auto_now_add=True)

    class Meta:
        table = "users"

User_Pydantic = pydantic_model_creator(User, name="User")

async def init():
    await Tortoise.init(
        db_url="postgres://postgres:@localhost:5432/telegram_bookkeeper",
        modules={'models': ['backEnd.database']}
    )
    await Tortoise.generate_schemas()
