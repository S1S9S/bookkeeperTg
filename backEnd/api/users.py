import os
import requests
from fastapi import APIRouter, HTTPException, Depends
from jose import JWTError, jwt
from datetime import timedelta
from backEnd.database import crud
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

from .auth import create_access_token

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class Token(BaseModel):
    access_token: str
    token_type: str

def get_telegram_avatar(telegram_id: int) -> str:
    try:
        response = requests.get(f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getUserProfilePhotos?user_id={telegram_id}")
        data = response.json()
        if data["ok"] and data["result"]["total_count"] > 0:
            file_id = data["result"]["photos"][0][0]["file_id"]
            file_info_response = requests.get(f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getFile?file_id={file_id}")
            file_info = file_info_response.json()
            avatar_url = f"https://api.telegram.org/file/bot{TELEGRAM_BOT_TOKEN}/{file_info['result']['file_path']}"
            return avatar_url
        else:
            return "/no-profile-picture-15257.png"
    except Exception as e:
        print(f"Ошибка при получении аватарки из Telegram: {e}")
        return "/no-profile-picture-15257.png"

@router.post("/token", response_model=Token)
async def login_for_access_token(telegram_id: int, username: str = None):
    user = await crud.get_user_by_telegram_id(telegram_id)

    if not user:
        avatar_url = get_telegram_avatar(telegram_id)
        user = await crud.create_user(telegram_id, username, avatar_url)

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": str(user.telegram_id)}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401, detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        telegram_id: str = payload.get("sub")
        if telegram_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = await crud.get_user_by_telegram_id(telegram_id)
    if user is None:
        raise credentials_exception
    return user

@router.get("/users/me")
async def read_users_me(current_user = Depends(get_current_user)):
    return {"username": current_user.username, "avatar_url": current_user.avatar_url}
