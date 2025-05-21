from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel

from .encoders import encode_datetime, encode_decimal, to_camelcase


class RequestBodyModel(BaseModel):
    class Config:
        alias_generator = to_camelcase
        populate_by_name = True


class ResponseBodyModel(BaseModel):
    class Config:
        alias_generator = to_camelcase
        populate_by_name = True
        json_encoders = {
            UUID: str,
            datetime: encode_datetime,
            Decimal: encode_decimal,
        }
