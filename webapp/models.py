from datetime import datetime
from typing import Literal
from uuid import UUID

from pydantic import BaseModel, SecretStr

from .encoders import to_camelcase


class Entity(BaseModel):
    def __hash__(self):
        return hash(f"{self.__class__.__module__}.{self.__class__.__qualname__}:{self.id}")

    def __eq__(self, other):
        return hash(self) == hash(other)


class Configs(BaseModel):
    version: str = "v1"

    class Config:
        alias_generator = to_camelcase
        populate_by_name = True
        json_encoders = {
            UUID: str,
        }


class User(Entity):
    id: UUID
    first_name: str
    last_name: str
    email: str
    password: SecretStr
    salt: SecretStr
    created_on: datetime


class Campaign(Entity):
    id: UUID
    name: str
    created_on: datetime


class Ad(Entity):
    id: UUID
    content_type: Literal["text/plain",]
    body: str
    campaign: Campaign
    created_on: datetime
