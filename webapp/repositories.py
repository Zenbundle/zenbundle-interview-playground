from typing import Optional
from uuid import UUID

from .models import User

# In-memory entity store
_ENTITY_STORE = {}


class UserRepository:
    async def add_user(self, user: User):
        _ENTITY_STORE[user.id] = user

    async def get_user_by_id(self, user_id: UUID) -> Optional[User]:
        return _ENTITY_STORE.get(user_id)

    async def get_user_by_email(self, email: str) -> Optional[User]:
        for user in _ENTITY_STORE.values():
            if user.email == email:
                return user
