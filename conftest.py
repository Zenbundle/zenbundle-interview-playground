import secrets
from datetime import datetime
from uuid import uuid4

import pytest_asyncio
from fastapi.testclient import TestClient

from app import app
from webapp.constants import SESSION_ID_COOKIE_NAME
from webapp.models import User
from webapp.repositories import UserRepository
from webapp.security import _SESSION_STORE


@pytest_asyncio.fixture(scope="session")
async def user() -> User:
    user_repository = UserRepository()

    return await user_repository.add_user(
        User(
            id=uuid4(),
            first_name="Test",
            last_name="User",
            email="testuser@example.com",
            password="password",
            salt="salt",
            created_on=datetime.utcnow(),
        )
    )


@pytest_asyncio.fixture(scope="session")
async def anonymous_client() -> TestClient:
    return TestClient(app)


@pytest_asyncio.fixture(scope="session")
async def authenticated_client(user: User) -> TestClient:
    session_id = secrets.token_urlsafe(16)
    _SESSION_STORE[session_id] = str(user.id)

    client = TestClient(app)
    client.cookies.set(SESSION_ID_COOKIE_NAME, session_id)

    return client
