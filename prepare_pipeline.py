import gzip
import shutil
from pathlib import Path
import joblib
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

ROOT = Path(__file__).resolve().parent

GZ_PATH = ROOT / "covtype.data.gz"
CSV_PATH = ROOT / "covtype_with_header.csv"

FEATURE_COLUMNS = [
    'Elevation', 'Aspect', 'Slope',
    'Horizontal_Distance_To_Hydrology', 'Vertical_Distance_To_Hydrology',
    'Horizontal_Distance_To_Roadways',
    'Hillshade_9am', 'Hillshade_Noon', 'Hillshade_3pm',
    'Horizontal_Distance_To_Fire_Points'
] + [f'Wilderness_Area_{i}' for i in range(1, 5)] + [f'Soil_Type_{i}' for i in range(1, 41)]

ALL_COLUMNS = FEATURE_COLUMNS + ['Cover_Type']

print("Decompressing covtype.data.gz...")
with gzip.open(GZ_PATH, 'rt', encoding='utf-8') as gz_in:
    # Read the first 15,120 rows (training + validation splits from Blackard & Dean 1999)
    # Train: 11,340, Val: 3,780
    rows = []
    for i, line in enumerate(gz_in):
        if i >= 15120:
            break
        parts = [int(x) for x in line.strip().split(',')]
        rows.append(parts)

print(f"Read {len(rows)} rows from dataset.")
df = pd.DataFrame(rows, columns=ALL_COLUMNS)

# Save sample inputs (first 5 records from validation set, without target column)
sample_df = df.iloc[11340:11345][FEATURE_COLUMNS].copy()
sample_csv_path = ROOT / "data/sample_inputs.csv"
sample_df.to_csv(sample_csv_path, index=False)
print(f"Saved non-sensitive sample inputs to {sample_csv_path} with {len(sample_df)} rows and {len(FEATURE_COLUMNS)} columns.")

# Training split: first 11,340 records
train_df = df.iloc[:11340].copy()
X_train = train_df[FEATURE_COLUMNS]
y_train = train_df['Cover_Type']

print(f"Training feature matrix shape: {X_train.shape}")
print(f"Target distribution:\n{y_train.value_counts().sort_index()}")

# Assemble standard fitted pipeline
print("Training RandomForest Pipeline...")
pipeline = Pipeline([
    ("preprocess", StandardScaler()),
    ("model", RandomForestClassifier(
        n_estimators=100,
        max_depth=16,
        random_state=42,
        n_jobs=-1
    ))
])

pipeline.fit(X_train, y_train)

# Validation accuracy check
val_df = df.iloc[11340:15120].copy()
X_val = val_df[FEATURE_COLUMNS]
y_val = val_df['Cover_Type']
val_acc = pipeline.score(X_val, y_val)
print(f"Validation Accuracy: {val_acc * 100:.2f}%")

# Save model bundle
bundle = {
    "pipeline": pipeline,
    "features": FEATURE_COLUMNS,
    "task": "classification",
    "model_version": "1.0",
    "target_mapping": {
        1: "Spruce/Fir",
        2: "Lodgepole Pine",
        3: "Ponderosa Pine",
        4: "Cottonwood/Willow",
        5: "Aspen",
        6: "Douglas-fir",
        7: "Krummholz"
    }
}

models_dir = ROOT / "backend/models"
models_dir.mkdir(parents=True, exist_ok=True)
bundle_path = models_dir / "model_bundle.joblib"
joblib.dump(bundle, bundle_path)
print(f"Successfully exported model bundle to {bundle_path} ({bundle_path.stat().st_size:,} bytes).")
