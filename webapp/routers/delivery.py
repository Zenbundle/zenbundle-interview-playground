import random
from datetime import datetime
from uuid import UUID, uuid4

from fastapi import APIRouter, HTTPException

from ..http import ResponseBodyModel
from ..models import Ad, Campaign

router = APIRouter()


class AdDeliveryCampaignResponseBody(ResponseBodyModel):
    id: UUID
    name: str


class AdDeliveryResponseBody(ResponseBodyModel):
    id: UUID
    content_type: str
    body: str
    campaign: AdDeliveryCampaignResponseBody


@router.get("/{placement_id}", response_model=AdDeliveryResponseBody, tags=["Delivery"])
async def fetch_ad_by_placement_id(placement_id: UUID):
    campaign1 = Campaign(
        id=uuid4(),
        name="Spring Sale",
        created_on=datetime.utcnow(),
    )

    campaign2 = Campaign(
        id=uuid4(),
        name="Winter Specials",
        created_on=datetime.utcnow(),
    )

    placement_ads = {
        UUID("abe1f397-ed85-4ce0-bf8f-ff88e9e057d3"): [
            Ad(
                id=uuid4(),
                content_type="text/plain",
                body="Get 20% off on all items!",
                campaign=campaign1,
                created_on=datetime.utcnow(),
            ),
            Ad(
                id=uuid4(),
                content_type="text/plain",
                body="Spring arrivals now in store!",
                campaign=campaign1,
                created_on=datetime.utcnow(),
            ),
            Ad(
                id=uuid4(),
                content_type="text/plain",
                body="End of season winter sale!",
                campaign=campaign2,
                created_on=datetime.utcnow(),
            ),
        ],
        UUID("aec178db-26b5-4271-81bf-e162bf337c52"): [
            Ad(
                id=uuid4(),
                content_type="text/plain",
                body="Winter jackets at 30% off!",
                campaign=campaign2,
                created_on=datetime.utcnow(),
            ),
            Ad(
                id=uuid4(),
                content_type="text/plain",
                body="New winter accessories in stock!",
                campaign=campaign2,
                created_on=datetime.utcnow(),
            ),
            Ad(
                id=uuid4(),
                content_type="text/plain",
                body="Exclusive Spring discounts for members.",
                campaign=campaign1,
                created_on=datetime.utcnow(),
            ),
        ],
    }

    ads = placement_ads.get(placement_id)

    if not ads:
        raise HTTPException(404, "No ads found for this placement")

    return random.choice(ads)
