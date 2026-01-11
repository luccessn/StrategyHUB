from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from bson import ObjectId
from models import StrategyRequest, StrategyResponse
from strategy_engine import calculate_strategy
from explain import explain_with_groq

from chat import get_bot_response, ChatRequest
load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mongo  = MongoClient(os.environ.get("MONGO_URI"))
db = mongo["Data"]
cars_collection = db["cars"]
tracks_collection = db["tracks"]


@app.post("/strategy", response_model=StrategyResponse)
def get_strategy(req: StrategyRequest):
    car = cars_collection.find_one({"_id": ObjectId(req.car_id)})
    track = tracks_collection.find_one({"_id": ObjectId(req.track_id)})

    if not car:
        return {"strategy": {}, "explanation": f"car {req.car_id} not found"}

    if not track:
        return {"strategy": {}, "explanation": f"track {req.track_id} not found"}

    strategy = calculate_strategy(car, track, req)
    explanation = explain_with_groq(strategy, req)

    return {
        "strategy": strategy,
        "explanation": explanation
    }
## second post chat


@app.post("/chat")
def chat(request:ChatRequest):
   reply=get_bot_response(request.message)
   return {"reply":reply}

