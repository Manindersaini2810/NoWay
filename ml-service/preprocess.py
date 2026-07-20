import pandas as pd


def preprocess(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df['buildingClassA'] = df['buildingClass'].fillna('Class A').map({'Class A': 1, 'Class B': 0, 'Class C': 0})
    df['occupancyVacant'] = df['occupancyStatus'].fillna('Occupied').map({'Vacant': 1, 'Occupied': 0})
    df['yearBuilt'] = df['yearBuilt'].fillna(df['yearBuilt'].median())
    df['floors'] = df['floors'].fillna(1)
    df['parking'] = df['parking'].fillna(0)
    df['ceilingHeight'] = df['ceilingHeight'].fillna(10.0)
    df['area'] = df['area'].fillna(df['area'].median())
    return df[['area', 'yearBuilt', 'floors', 'parking', 'ceilingHeight', 'buildingClassA', 'occupancyVacant']]
