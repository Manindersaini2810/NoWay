from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from model import load_model

app = FastAPI(title='NoWay ML Service')
model = load_model()

class PredictionRequest(BaseModel):
    area: float
    propertyType: str
    buildingClass: Optional[str] = 'Class A'
    yearBuilt: Optional[int] = 2000
    floors: Optional[int] = 1
    parking: Optional[int] = 0
    ceilingHeight: Optional[float] = 10.0
    occupancyStatus: Optional[str] = 'Occupied'
    city: Optional[str] = 'Unknown'
    lat: Optional[float] = 0.0
    lng: Optional[float] = 0.0

class PredictionResponse(BaseModel):
    estimatedPrice: float

@app.get('/')
def root():
    return {'service': 'NoWay ML Service', 'status': 'ready'}

@app.post('/predict', response_model=PredictionResponse)
def predict(data: PredictionRequest):
    features = [
        data.area,
        data.yearBuilt,
        data.floors,
        data.parking,
        data.ceilingHeight,
        1 if data.buildingClass == 'Class A' else 0,
        1 if data.occupancyStatus == 'Vacant' else 0
    ]
    prediction = model.predict([features])[0]
    return {'estimatedPrice': float(prediction)}
