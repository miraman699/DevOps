from pathlib import Path
import joblib
import pandas as pd
from flask import Flask, jsonify, request

BASE = Path(__file__).resolve().parent
BUNDLE = joblib.load(BASE / "models/model_bundle.joblib")
MODEL = BUNDLE["pipeline"]
FEATURES = BUNDLE["features"]
TASK = BUNDLE.get("task", "classification")
TARGET_MAPPING = BUNDLE.get("target_mapping", {
    1: "Spruce/Fir",
    2: "Lodgepole Pine",
    3: "Ponderosa Pine",
    4: "Cottonwood/Willow",
    5: "Aspen",
    6: "Douglas-fir",
    7: "Krummholz"
})

app = Flask(__name__)

@app.get("/health")
def health():
    return jsonify(
        status="ok",
        features=len(FEATURES),
        task=TASK,
        dataset="Forest Cover Type",
        classes=TARGET_MAPPING
    )

@app.post("/predict")
def predict():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify(error="Expected a JSON object"), 400
    missing = [f for f in FEATURES if f not in data]
    extra = [f for f in data if f not in FEATURES]
    if missing or extra:
        return jsonify(error="Input schema mismatch",
                       missing=missing, extra=extra), 400
    frame = pd.DataFrame([[data[f] for f in FEATURES]], columns=FEATURES)
    try:
        raw_pred = MODEL.predict(frame)[0]
        raw_pred = raw_pred.item() if hasattr(raw_pred, "item") else raw_pred
        class_name = TARGET_MAPPING.get(raw_pred, f"Class {raw_pred}")
        
        result = {
            "prediction": f"{class_name} (Class {raw_pred})",
            "predicted_class": raw_pred,
            "class_name": class_name,
            "task": TASK,
            "disclaimer": "Research/teaching prototype only. Based on USFS & USGS cartographic data."
        }
        if TASK == "classification" and hasattr(MODEL, "predict_proba"):
            probs = MODEL.predict_proba(frame)[0].tolist()
            result["probabilities"] = probs
            result["class_probabilities"] = [
                {"class_id": cid, "label": TARGET_MAPPING.get(cid, f"Class {cid}"), "probability": round(prob, 4)}
                for cid, prob in zip(range(1, len(probs) + 1), probs)
            ]
        return jsonify(result)
    except (ValueError, TypeError) as exc:
        return jsonify(error="Invalid input", detail=str(exc)), 400
    except Exception:
        app.logger.exception("Prediction failed")
        return jsonify(error="Prediction processing failed"), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=False)
