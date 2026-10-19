# Laboratory Verification & Technical Evidence

**Student Name:** Aman Mir  
**Email:** 233002@students.au.edu.pk  
**Repository:** https://github.com/miraman699/DevOps  
**GitHub Pages Deployed URL:** https://miraman699.github.io/DevOps/  
**Dataset:** USFS Roosevelt National Forest Cover Type (UCI Dataset 31)  
**Task:** 7-Class Cartographic Classification (Spruce/Fir, Lodgepole Pine, Ponderosa Pine, Cottonwood/Willow, Aspen, Douglas-fir, Krummholz)

---

## 1. Local Terminal Execution Matrix

| Terminal | Purpose | Working Directory | Command | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Terminal 1** | Flask REST API | `D:\ml_project` | `.\.venv\Scripts\python.exe backend\app.py` | Running on `127.0.0.1:5000` |
| **Terminal 2** | Angular Dev Server + Proxy | `D:\ml_project\frontend` | `ng serve --proxy-config proxy.conf.json --port 4200` | Running on `http://localhost:4200` |
| **Terminal 3** | Tests & Verification | `D:\ml_project` | `pytest backend\tests`, `curl`, `git` | Verified passing (5 passed) |

---

## 2. API & Direct Inference Smoke Tests

### Direct Python Pipeline (`backend/test_pipeline.py`)
```bash
python backend/test_pipeline.py
```
**Output:**
```
Prediction: [2]
Probabilities: [[0.17955, 0.58529, 0.00067, 0.00050, 0.21600, 0.00149, 0.01646]]
PASS: local inference
```

### Health Check via Angular Proxy (`curl http://localhost:4200/api/health`)
```json
{
  "classes": {
    "1": "Spruce/Fir",
    "2": "Lodgepole Pine",
    "3": "Ponderosa Pine",
    "4": "Cottonwood/Willow",
    "5": "Aspen",
    "6": "Douglas-fir",
    "7": "Krummholz"
  },
  "dataset": "Forest Cover Type",
  "features": 54,
  "status": "ok",
  "task": "classification"
}
```

### Prediction via Angular Proxy (`curl http://localhost:4200/api/predict`)
```json
{
  "class_name": "Lodgepole Pine",
  "class_probabilities": [
    {"class_id": 1, "label": "Spruce/Fir", "probability": 0.1796},
    {"class_id": 2, "label": "Lodgepole Pine", "probability": 0.5853},
    {"class_id": 3, "label": "Ponderosa Pine", "probability": 0.0007},
    {"class_id": 4, "label": "Cottonwood/Willow", "probability": 0.0005},
    {"class_id": 5, "label": "Aspen", "probability": 0.216},
    {"class_id": 6, "label": "Douglas-fir", "probability": 0.0015},
    {"class_id": 7, "label": "Krummholz", "probability": 0.0165}
  ],
  "disclaimer": "Research/teaching prototype only. Based on USFS & USGS cartographic data.",
  "predicted_class": 2,
  "prediction": "Lodgepole Pine (Class 2)",
  "task": "classification"
}
```

---

## 3. Automated Test Suite (`backend/tests`)
```bash
pytest -q backend/tests
```
**Output:**
```
.....                                                                    [100%]
5 passed in 2.06s
```
- `test_source_files_exist`: Verifies all architectural components exist.
- `test_health`: Validates `/health` status and feature count (54).
- `test_predict_valid`: Validates 200 OK and prediction payload format.
- `test_predict_missing_feature`: Validates 400 Bad Request on incomplete schema.
- `test_predict_invalid_json`: Validates 400 Bad Request on malformed JSON.

---

## 4. Troubleshooting Log & Diagnostics

1. **PowerShell Script Execution Policy (`npm.ps1` restricted):**
   - *Issue:* Running `npm --version` triggered `PSSecurityException`.
   - *Resolution:* Utilized `npm.cmd` and `npx.cmd` directly in the project commands.
2. **Angular Component Style Budget Warning:**
   - *Issue:* Angular 22 default `anyComponentStyle` budget was 4kB warning / 8kB error. The Awwwards/Apple glassmorphism stylesheet was 11.2kB.
   - *Resolution:* Updated `angular.json` style budget configuration to 20kB warning / 40kB error.
3. **GitHub Pages Static Deployment Boundary:**
   - *Requirement:* Pages serves only static client assets and cannot execute Python.
   - *Resolution:* Implemented dynamic client host check in `app.ts` (`deployedStatic`), displaying an informative notice on GitHub Pages while enabling full live API execution locally on `localhost:4200` via dev proxy.
