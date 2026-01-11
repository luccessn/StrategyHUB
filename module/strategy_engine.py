# step 2 stratregy architecture strategy_engine.py
from models import StrategyRequest, StrategyResponse

def calculate_strategy(car:dict, track:dict, req:StrategyRequest):
    strategy = {}
    strategy["about"] = (
    f"{car['forai']['name']} ({car['forai']['engine']['type']}, {car['forai']['engine']['maxPowerHP']} HP) "
    f"on {track['name']} in {track['forai']['country']} track, length {track['lenght']} km. "
    f"Driver goal: {req.goal}, Weather: {req.weather}, Tyres: {req.tyre}"
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

    if req.tyre.lower() == "soft":
        strategy["tyreManagement"] = f"Push first laps, fast wear ({tyre_deg:.2f})"
    elif req.tyre.lower() == "medium":
        strategy["tyreManagement"] = f"Balanced pace, moderate wear ({tyre_deg:.2f})"
    else:
        strategy["tyreManagement"] = f"Long stint, stable pace, low wear ({tyre_deg:.2f})"

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

    
    # risk and pace
    if  req.weather.lower() == "wet" and car["forai"]["tyres"]["wetPerformance"] < 0.7:
        strategy["risk"] = "High risk - avoid kerbs and aggresive cornering"
    else:
        strategy["risk"] = "Normal"
    

    # car perfrman analyc
    power_to_weight = car["forai"]["performance"]["powerToWeight"]
    strategy["powerToWeight"] = f"{power_to_weight:.2f} HP/kg"

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

    ##Race Goal 
    if req.goal.lower() == "qualifying":
        strategy["pushMode"] = "Max attack, minimal fuel saving for qualifying "
    else:
        strategy["pushMode"] = "Balanced pace, conserve tyres for race"
    return strategy
