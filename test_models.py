import time
import numpy as np
import pandas as pd
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.neural_network import MLPClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report, f1_score
import lightgbm as lgb

print("Loading data...")
df = pd.read_csv(r"C:\Users\233002\.gemini\antigravity\scratch\covertype\covtype_with_header.csv")
print(f"Loaded: {df.shape}")

# Exact paper splits
# Train: first 11,340 records
# Val: next 3,780 records
# Test: remaining 565,892 records
train_df = df.iloc[:11340].copy()
val_df = df.iloc[11340:11340+3780].copy()
test_df = df.iloc[11340+3780:].copy()

feature_cols = [c for c in df.columns if c != 'Cover_Type']
target_col = 'Cover_Type'

X_train, y_train = train_df[feature_cols].values, train_df[target_col].values
X_val, y_val = val_df[feature_cols].values, val_df[target_col].values
X_test, y_test = test_df[feature_cols].values, test_df[target_col].values

# Paper scaling: scale across all data or standard scaler
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_val_scaled = scaler.transform(X_val)
X_test_scaled = scaler.transform(X_test)

# 1. Paper Baseline: LDA
print("\n--- 1. Paper Model 1: LDA ---")
t0 = time.time()
lda = LinearDiscriminantAnalysis()
lda.fit(X_train_scaled, y_train)
y_pred_lda = lda.predict(X_test_scaled)
acc_lda = accuracy_score(y_test, y_pred_lda)
print(f"LDA Test Accuracy: {acc_lda*100:.2f}% (Paper reported: 58.38%) | Time: {time.time()-t0:.2f}s")

# 2. Paper Baseline: Original ANN (1 hidden layer, 120 neurons)
print("\n--- 2. Paper Model 2: Original ANN (54-120-7) ---")
t0 = time.time()
mlp_paper = MLPClassifier(hidden_layer_sizes=(120,), activation='logistic', solver='sgd',
                          learning_rate_init=0.05, momentum=0.5, max_iter=40, random_state=42)
mlp_paper.fit(X_train_scaled, y_train)
y_pred_mlp_paper = mlp_paper.predict(X_test_scaled)
acc_mlp_paper = accuracy_score(y_test, y_pred_mlp_paper)
print(f"Original Paper ANN Test Accuracy: {acc_mlp_paper*100:.2f}% (Paper reported: 70.58%) | Time: {time.time()-t0:.2f}s")

# 3. New Model 1: LightGBM (State-of-the-Art Tree Ensembling)
print("\n--- 3. New SOTA Model: LightGBM ---")
t0 = time.time()
lgb_clf = lgb.LGBMClassifier(
    n_estimators=250,
    learning_rate=0.08,
    num_leaves=63,
    max_depth=-1,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42,
    n_jobs=-1,
    verbose=-1
)
lgb_clf.fit(X_train, y_train)
y_pred_lgb = lgb_clf.predict(X_test)
acc_lgb = accuracy_score(y_test, y_pred_lgb)
f1_lgb = f1_score(y_test, y_pred_lgb, average='weighted')
print(f"LightGBM Test Accuracy: {acc_lgb*100:.2f}% | Weighted F1: {f1_lgb:.4f} | Time: {time.time()-t0:.2f}s")
