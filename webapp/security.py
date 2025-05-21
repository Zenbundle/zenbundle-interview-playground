import hashlib
import secrets
from datetime import datetime
from uuid import UUID, uuid4

from fastapi import Cookie, HTTPException, Request, Response
from pydantic import EmailStr, SecretStr

from .constants import SESSION_ID_COOKIE_NAME
from .exceptions import AuthenticationException, UserAlreadyExistException
from .models import User
from .repositories import UserRepository

# In-memory session store
_SESSION_STORE = {}


def hash_password(password: str, salt: str) -> str:
    return hashlib.sha256((password + salt).encode("utf-8")).hexdigest()


async def register_user(first_name: str, last_name: str, email: EmailStr, password: SecretStr):
    user_repository = UserRepository()
    user = await user_repository.get_user_by_email(email)

    if user:
        raise UserAlreadyExistException()

    salt = secrets.token_hex(16)
    hashed_password = hash_password(password.get_secret_value(), salt)

    return await user_repository.add_user(
        User(
            id=uuid4(),
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=SecretStr(hashed_password),
            salt=SecretStr(salt),
            created_on=datetime.utcnow(),
        )
    )


async def login_user(email: EmailStr, password: SecretStr, response: Response):
    user_repository = UserRepository()
    user = await user_repository.get_user_by_email(email)

    if not user:
        raise AuthenticationException()

    hashed_password = hash_password(password.get_secret_value(), user.salt.get_secret_value())

    if hashed_password != user.password.get_secret_value():
        raise AuthenticationException()

    session_id = secrets.token_urlsafe(32)
    _SESSION_STORE[session_id] = str(user.id)

    response.set_cookie(
        key=SESSION_ID_COOKIE_NAME,
        value=session_id,
        httponly=True,
        max_age=60 * 60 * 24 * 7,
        samesite="strict",
    )

    return user


async def logout_user(response: Response, session_id: str = Cookie(None)):
    if session_id and session_id in _SESSION_STORE:
        del _SESSION_STORE[session_id]

    response.delete_cookie(SESSION_ID_COOKIE_NAME)


async def authenticate_user(request: Request):
    session_id = request.cookies.get(SESSION_ID_COOKIE_NAME)

    if not session_id or session_id not in _SESSION_STORE:
        raise HTTPException(401, "The authentication credentials are not valid.")

    user_id = UUID(_SESSION_STORE[session_id])

    user_repository = UserRepository()
    user = await user_repository.get_user_by_id(user_id)

    if not user:
        raise HTTPException(401, "The authentication credentials are not valid.")

    return user
