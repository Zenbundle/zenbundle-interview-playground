from datetime import datetime
from decimal import Decimal

from inflection import camelize


def to_camelcase(name: str):
    return camelize(name, uppercase_first_letter=False)


def encode_datetime(dt: datetime):
    # RFC 3339 format: https://www.ietf.org/rfc/rfc3339.txt
    return dt.strftime("%Y-%m-%dT%H:%M:%SZ")


def encode_decimal(decimal_obj: Decimal):
    return f"{decimal_obj:.2f}"
