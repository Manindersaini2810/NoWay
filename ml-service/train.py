import numpy as np
import pandas as pd
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from xgboost import XGBRegressor

from model import MODEL_PATH
from preprocess import build_preprocessor, prepare_features


def generate_synthetic_data(rows: int = 240, seed: int = 42) -> pd.DataFrame:
    rng = np.random.default_rng(seed)
    property_types = ["office", "retail", "warehouse", "industrial", "land", "mixed-use"]
    cities = {
        "Seattle": 1.25,
        "Austin": 1.05,
        "Denver": 1.0,
        "Phoenix": 0.88,
        "Chicago": 1.08,
        "Miami": 1.18,
        "Atlanta": 0.93,
        "Dallas": 0.96,
    }
    base_price_per_sqft = {
        "office": 270,
        "retail": 230,
        "warehouse": 115,
        "industrial": 145,
        "land": 55,
        "mixed-use": 310,
    }
    records = []
    city_names = list(cities)
    for _ in range(rows):
        property_type = str(rng.choice(property_types))
        city = str(rng.choice(city_names))
        building_class = str(rng.choice(["Class A", "Class B", "Class C"], p=[0.32, 0.48, 0.20]))
        occupancy = str(rng.choice(["Occupied", "Vacant"], p=[0.68, 0.32]))
        area = float(rng.integers(2500, 50001))
        year_built = int(rng.integers(1960, 2026))
        floors = int(rng.integers(1, 26 if property_type in ["office", "mixed-use"] else 5))
        parking_spaces = int(max(0, rng.normal(area / 180, area / 650)))
        ceiling_height_ft = float(
            rng.uniform(28, 40) if property_type == "warehouse" else rng.uniform(9, 18)
        )
        lat = float(rng.uniform(25, 48))
        lng = float(rng.uniform(-123, -70))

        class_factor = {"Class A": 1.28, "Class B": 1.0, "Class C": 0.76}[building_class]
        age_factor = 0.78 + max(0, year_built - 1960) / 65 * 0.32
        occupancy_factor = 1.06 if occupancy == "Occupied" else 0.94
        feature_row = {
            "area": area,
            "propertyType": property_type,
            "buildingClass": building_class,
            "yearBuilt": year_built,
            "floors": floors,
            "parkingSpaces": parking_spaces,
            "city": city,
            "lat": lat,
            "lng": lng,
            "ceilingHeightFt": ceiling_height_ft,
            "occupancyStatus": occupancy,
        }
        estimate = (
            area
            * base_price_per_sqft[property_type]
            * cities[city]
            * class_factor
            * age_factor
            * occupancy_factor
            * float(rng.normal(1.0, 0.08))
        )
        records.append({**feature_row, "estimatedPrice": round(estimate, 2)})
    return pd.DataFrame(records)


def main():
    frame = generate_synthetic_data()
    features = prepare_features(frame)
    target = frame["estimatedPrice"]
    x_train, x_test, y_train, y_test = train_test_split(
        features, target, test_size=0.2, random_state=42
    )
    model = Pipeline(
        steps=[
            ("preprocessor", build_preprocessor()),
            (
                "regressor",
                XGBRegressor(
                    n_estimators=180,
                    max_depth=4,
                    learning_rate=0.06,
                    subsample=0.9,
                    colsample_bytree=0.9,
                    objective="reg:squarederror",
                    random_state=42,
                    n_jobs=1,
                ),
            ),
        ]
    )
    model.fit(x_train, y_train)
    predictions = model.predict(x_test)
    print(f"Trained on {len(frame)} synthetic rows; validation MAE: ${mean_absolute_error(y_test, predictions):,.0f}")

    MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
    import joblib

    joblib.dump(model, MODEL_PATH)
    print(f"Model saved to {MODEL_PATH}")


if __name__ == "__main__":
    main()
