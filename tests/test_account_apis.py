import pytest
from fastapi.testclient import TestClient


@pytest.mark.integration_test
@pytest.mark.asyncio
async def test_login_user_with_password(anonymous_client: TestClient):
    pass


@pytest.mark.integration_test
@pytest.mark.asyncio
async def test_login_user_with_password_with_invalid_credentials(anonymous_client: TestClient):
    pass


@pytest.mark.integration_test
@pytest.mark.asyncio
async def test_logout_user(authenticated_client: TestClient):
    pass


@pytest.mark.integration_test
@pytest.mark.asyncio
async def test_register_user(anonymous_client: TestClient):
    pass


@pytest.mark.integration_test
@pytest.mark.asyncio
async def test_register_user_with_existing_email(anonymous_client: TestClient):
    pass
