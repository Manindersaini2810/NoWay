import joblib
from pathlib import Path

MODEL_PATH = Path(__file__).resolve().parent / 'models' / 'price_model.joblib'


def load_model():
    if MODEL_PATH.exists():
        return joblib.load(MODEL_PATH)
    raise RuntimeError('Model artifact not found. Run train.py first.')
