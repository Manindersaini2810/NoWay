from functools import lru_cache
from typing import Literal

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from model import MODEL_PATH, load_model, predict_price

app = FastAPI(title="NoWay Commercial Valuation API", version="1.0.0")


class PredictionRequest(BaseModel):
    area: float = Field(gt=0)
    propertyType: Literal["office", "retail", "warehouse", "industrial", "land", "mixed-use"]
    buildingClass: Literal["Class A", "Class B", "Class C"] = "Class B"
    yearBuilt: int = Field(default=2000, ge=1800, le=2100)
    floors: int = Field(default=1, ge=1)
    parkingSpaces: int = Field(default=0, ge=0)
    city: str = "Unknown"
    lat: float = Field(default=0.0, ge=-90, le=90)
    lng: float = Field(default=0.0, ge=-180, le=180)
    ceilingHeightFt: float = Field(default=10.0, gt=0)
    occupancyStatus: Literal["Vacant", "Occupied"] = "Occupied"


@lru_cache(maxsize=1)
def get_model():
    return load_model()


@app.get("/health")
def health():
    return {"status": "ok", "modelLoaded": MODEL_PATH.is_file()}


@app.post("/predict")
def predict(request: PredictionRequest):
    try:
        model = get_model()
    except RuntimeError as error:
        raise HTTPException(status_code=503, detail=str(error)) from error

    estimated_price, price_per_sqft = predict_price(model, request.model_dump())
    return {
        "estimatedPrice": estimated_price,
        "estimatedPricePerSqFt": price_per_sqft,
    }
