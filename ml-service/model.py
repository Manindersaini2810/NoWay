from pathlib import Path

import joblib
import pandas as pd

from preprocess import prepare_features

MODEL_PATH = Path(__file__).resolve().parent / "models" / "valuation_model.pkl"


def load_model():
    if not MODEL_PATH.is_file():
        raise RuntimeError(f"Model artifact not found at {MODEL_PATH}. Run train.py first.")
    return joblib.load(MODEL_PATH)


def predict_price(model, values: dict) -> tuple[float, float]:
    features = prepare_features(values)
    price = max(float(model.predict(features)[0]), 0.0)
    area = float(features.iloc[0]["area"])
    return price, price / area if area > 0 else 0.0
