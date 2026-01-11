from groq import Groq
import os
from dotenv import load_dotenv
load_dotenv()
#explain.py


client = Groq(
        api_key=os.environ.get("GROQ_API_KEY"),
    )

def explain_with_groq(strategy:dict, req):
    propmt = f"""
You are a Formula 1 race engineer.
Explain the following strategy for the driver in human-readable format:

Strategy: {strategy}

Conditions:
Weather:{req.weather}
Tyres:{req.tyre}
Goal:{req.goal}
    """
    response = client.chat.completions.create(
        messages=[{"role": "user", "content": propmt}],
        model="llama-3.3-70b-versatile",
        stream = False,
    )
    return response.choices[0].message.content
