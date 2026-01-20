# step 2 stratregy architecture strategy_engine.py
from models import StrategyRequest, StrategyResponse

def calculate_strategy(car:dict, track:dict, req:StrategyRequest):
    strategy = {}
    strategy["about"] = (
    f"{car['forai']['name']} "
    f"({car['forai']['engine']['type']}, {car['forai']['engine']['maxPowerHP']} HP) "
    f"on {track['name']} in {track['forai']['country']} track, lenght {track['lenght']} km. "
    f"Driver experience was in {req.weather}, using {req.tyre} tyres, "
    f"and achieved a lap time of {req.lap_time}. "
    f"Driver goal: {req.goal} with this car: {car['forai']['name']}"
    )    # strategy["lastLapTime"] = (f"Drivers last lapTime : {req.lap_time} in {req.weather} weather with {req.tyre}")
    strategy["goal"] = (
    "Let's provide an optimal strategy for both weather conditions, "
    "including wet and sunny weather."
    )    
    if track["forai"]["characteristics"]["downforceDemand"] > 0.7 :  # ეს არის რეალურად ობიექტის ელენმენტს ვწვდებიტრ ანუ charat.downforceDemadn
        strategy["aero"] = f"High Downforce {track["forai"]["characteristics"]["downforceDemand"]} "
    else:
        strategy["aero"] = f"Medium Downforce {track["forai"]["characteristics"]["downforceDemand"]}"
    
    ##Braking 
    tyre_deg = car["forai"]["tyres"]["degradationRate"]

    if req.weather.lower() == "wet":
        strategy["brakingStyle"] = "Smooth braking, early entry for wet conditions"
        strategy["brakingBias"] = "Rear biased for stability"
        strategy["risk"] = "High if wet performance < 0.7"
    else:
        strategy["brakingStyle"] = "Aggressive braking, late apex"
        strategy["brakingBias"] = "Front biased"
    tyre_map = {
        "soft": f"Push first laps, fast wear ({tyre_deg:.2f})",
        "medium": f"Balanced pace, moderate wear ({tyre_deg:.2f})",
        "hard": f"Long stint, stable pace, low wear ({tyre_deg:.2f})"
    }
    strategy["tyreManagement"] = tyre_map.get(req.tyre.lower(), f"Unknown tyre ({tyre_deg:.2f})")

    # tyre menegmant
    tyre_deg = car["forai"]["tyres"]["degradationRate"]
    if req.tyre.lower() == "soft":
        strategy["tyreManagement"] = f"Push first latps, expext fast wear rate {tyre_deg}"
    elif req.tyre.lower() == "medium":
        strategy["tyreManagement"] = f"Balanced approach, moderate wear rate {tyre_deg}"
    else:
        strategy["tyreManagement"] = f"Long stint, stable pace low wear rate {tyre_deg}"
    # gaol for what
    # if req.goal.lower() == "fastest lap":
    #     strategy["pushMode"] = "All out pace, risk tyre wear"
    # elif req.goal.lower() == "qualifying":
    #     strategy["pushMode"] = "Max attack, minimal fuel saving"
    # else:
    #     strategy["pushMode"] = "Adaptive pace, respond to race conditions"

    
    # Braking & Risk
    wet_perf = car["forai"]["tyres"]["wetPerformance"]
    if req.weather.lower() == "wet" and wet_perf < 0.7:
        strategy["risk"] = "High - avoid kerbs, smooth braking"
        strategy["brakingStyle"] = "Smooth braking, early entry"
    else:
        strategy["risk"] = "Normal"
        strategy["brakingStyle"] = "Aggressive braking, late apex"
    
    # Engine stress tolerance
    engine_stress = car["forai"]["reliability"]["engineStressTolerance"]
    strategy["engineStressTolerance"] = f"{engine_stress*100:.0f}%"

    # Max braking g-force
    strategy["maxBrakingG"] = f"{car['forai']['brakes']['maxBrakingG']}G"

    # Max lateral g-force
    strategy["maxLateralG"] = f"{car['forai']['gForce']['lateralMax']}G"

    ##Aero Downforce
    downforce_demand = track["forai"]["characteristics"]["downforceDemand"]
    drag_sensitivity = car["forai"]["aero"]["dragSensitivity"]

    if downforce_demand > 0.7:
        strategy["aero"] = f"High downforce needed ({downforce_demand:.2f}), balance with drag sensitivity {drag_sensitivity:.2f}"
    else:
        strategy["aero"] = f"Medium downforce ({downforce_demand:.2f})"
   # Push mode
    push_map = {
        "qualifying": "Max attack, minimal fuel saving",
        "race": "Balanced pace, conserve tyres",
        "fastest lap": "All out pace, high risk for lap time"
    }
    strategy["pushMode"] = push_map.get(req.goal.lower(), "Adaptive pace")
       # Engine & performance
    strategy["powerToWeight"] = f"{car['forai']['performance']['powerToWeight']:.2f} HP/kg"
    strategy["engineStressTolerance"] = f"{car['forai']['reliability']['engineStressTolerance']*100:.0f}%"
    strategy["maxBrakingG"] = f"{car['forai']['brakes']['maxBrakingG']}G"
    strategy["maxLateralG"] = f"{car['forai']['gForce']['lateralMax']}G"
    return strategy
