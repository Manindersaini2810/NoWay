import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder

CATEGORICAL_FEATURES = ["propertyType", "buildingClass", "city", "occupancyStatus"]
NUMERIC_FEATURES = [
    "area",
    "yearBuilt",
    "floors",
    "parkingSpaces",
    "ceilingHeightFt",
    "lat",
    "lng",
]
FEATURE_COLUMNS = NUMERIC_FEATURES + CATEGORICAL_FEATURES

DEFAULTS = {
    "area": 10000.0,
    "yearBuilt": 2000,
    "floors": 1,
    "parkingSpaces": 0,
    "ceilingHeightFt": 10.0,
    "lat": 0.0,
    "lng": 0.0,
    "propertyType": "office",
    "buildingClass": "Class B",
    "city": "Unknown",
    "occupancyStatus": "Occupied",
}


def prepare_features(values) -> pd.DataFrame:
    """Normalize training rows and prediction payloads to the same feature columns."""
    frame = values.copy() if isinstance(values, pd.DataFrame) else pd.DataFrame([values])
    for column, default in DEFAULTS.items():
        if column not in frame:
            frame[column] = default
        frame[column] = frame[column].fillna(default)
    frame["propertyType"] = frame["propertyType"].astype(str).str.lower().str.strip()
    for column in ["buildingClass", "city", "occupancyStatus"]:
        frame[column] = frame[column].astype(str).str.strip()
    for column in NUMERIC_FEATURES:
        frame[column] = pd.to_numeric(frame[column], errors="coerce")
    return frame[FEATURE_COLUMNS]


def build_preprocessor() -> ColumnTransformer:
    categorical_pipeline = Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="most_frequent")),
            ("encoder", OneHotEncoder(handle_unknown="ignore")),
        ]
    )
    numeric_pipeline = Pipeline(steps=[("imputer", SimpleImputer(strategy="median"))])
    return ColumnTransformer(
        transformers=[
            ("numeric", numeric_pipeline, NUMERIC_FEATURES),
            ("categorical", categorical_pipeline, CATEGORICAL_FEATURES),
        ]
    )
