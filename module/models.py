from pydantic import BaseModel

class StrategyRequest(BaseModel):
    track_id: str
    car_id: str
    lap_time: str
    weather: str
    tyre: str
    goal: str

class StrategyResponse(BaseModel):
    strategy: dict
    explanation: str