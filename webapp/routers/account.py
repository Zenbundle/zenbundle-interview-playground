from uuid import UUID

from fastapi import APIRouter, HTTPException, Response, Security
from pydantic import EmailStr, Field, SecretStr

from ..exceptions import AuthenticationException, UserAlreadyExistException
from ..http import RequestBodyModel, ResponseBodyModel
from ..models import User
from ..security import authenticate_user, login_user, logout_user, register_user

router = APIRouter()


class LoginRequestBody(RequestBodyModel):
    email: EmailStr
    password: SecretStr = Field(min_length=1, max_length=256)


class RegisterRequestBody(RequestBodyModel):
    first_name: str = Field(min_length=1, max_length=256)
    last_name: str = Field(min_length=1, max_length=256)
    email: EmailStr
    password: SecretStr = Field(min_length=6, max_length=256)


class UserResponseBody(ResponseBodyModel):
    id: UUID
    first_name: str
    last_name: str
    email: str


@router.post("/login", response_model=UserResponseBody, tags=["Account"])
async def login(request_body: LoginRequestBody, response: Response):
    try:
        user = await login_user(
            request_body.email,
            request_body.password,
            response,
        )

    except AuthenticationException:
        raise HTTPException(401, "The authentication credentials are not valid.")

    return user


@router.get("/logout", dependencies=[Security(authenticate_user)], tags=["Account"])
async def logout(response: Response):
    await logout_user(response)

    return {"status": "ok", "detail": "You've been logged out."}


@router.post("/register", status_code=201, tags=["Account"])
async def register(request_body: RegisterRequestBody):
    try:
        await register_user(
            request_body.first_name,
            request_body.last_name,
            request_body.email,
            request_body.password,
        )

    except UserAlreadyExistException:
        raise HTTPException(409, "The user already exists.")

    return {"status": "ok", "detail": "The user has been created successfully."}


@router.get("/profile", response_model=UserResponseBody, tags=["Account"])
async def fetch_profile(user: User = Security(authenticate_user)):
    return user
