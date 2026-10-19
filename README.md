# 🌲 Forest Cover Type Intelligence: Full-Stack Research Platform

[![Full-stack CI](https://github.com/miraman699/DevOps/actions/workflows/ci.yml/badge.svg)](https://github.com/miraman699/DevOps/actions/workflows/ci.yml)
[![Deploy Angular to GitHub Pages](https://github.com/miraman699/DevOps/actions/workflows/pages.yml/badge.svg)](https://github.com/miraman699/DevOps/actions/workflows/pages.yml)
[![GitHub Pages](https://img.shields.io/badge/Demo-GitHub%20Pages-blue.svg)](https://miraman699.github.io/DevOps/)
[![Python 3.12+](https://img.shields.io/badge/python-3.12%2B-blue.svg)](https://www.python.org/)
[![Angular 22](https://img.shields.io/badge/frontend-Angular%2022-dd0031.svg)](https://angular.dev/)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

> **Author:** Aman Mir (`233002@students.au.edu.pk`)  
> **Repository:** [https://github.com/miraman699/DevOps](https://github.com/miraman699/DevOps)  
> **Live Static Demo (GitHub Pages):** [https://miraman699.github.io/DevOps/](https://miraman699.github.io/DevOps/)

An end-to-end full-stack scientific application transforming a fitted cartographic machine learning model into an Apple / Awwwards-grade interactive web experience. Features a local Flask REST API, standalone Angular 22 frontend with real-time probability meters, automated pytest suites, and GitHub Actions CI/CD.

---

## 🏛️ System Architecture & Deployment Boundary

```
Browser / Angular 22 Dashboard (http://localhost:4200)
      │
      │  POST /api/predict (JSON 54 Features)
      ▼
Angular Dev Proxy (proxy.conf.json) ──► Flask REST API (http://127.0.0.1:5000)
                                            │
                                            ├─ Input Validation (Schema & Range)
                                            ├─ StandardScaler Pipeline
                                            └─ Fitted Tree Classifier
                                            │
Angular Interactive Diagnostics ◄───────────┴─ JSON Prediction & Probabilities
(Confidence Bars, 7 Tree Types)

════════════════════════════════════════════════════════════════════════════════
Git Repository ──► GitHub Actions CI (Ubuntu 24.04: Python Tests + Angular Build)
               ──► GitHub Pages (STATIC ANGULAR INTERFACE ONLY)
```

> [!IMPORTANT]
> **Deployment Scope:** The local Flask server executes the machine learning model on localhost. GitHub Pages hosts the static client application. Live public predictions require starting Flask and Angular locally as documented below.

---

## 📖 Scientific Reference & Dataset Overview

* **Reference Paper:** Blackard, J. A., & Dean, D. J. (1999). *Comparative accuracies of artificial neural networks and discriminant analysis in predicting forest cover types from cartographic variables.* **Computers and Electronics in Agriculture**, 24(3), 131–151.
* **Source:** US Geological Survey (USGS) and US Forest Service (USFS) Region 2 RIS data.
* **Study Area:** Roosevelt National Forest in northern Colorado (Wilderness Areas: *Rawah, Neota, Comanche Peak, Cache la Poudre*).
* **Sample Units:** 581,012 distinct $30\text{m} \times 30\text{m}$ raster grid cells.
* **Target Classes (7 Forest Cover Types):**
  1. Spruce / Fir (36.46%)
  2. Lodgepole Pine (48.76%)
  3. Ponderosa Pine (6.15%)
  4. Cottonwood / Willow (0.47%)
  5. Aspen (1.63%)
  6. Douglas-fir (2.99%)
  7. Krummholz (3.53%)

### Benchmark Accuracies

| Model Architecture | Scientific Paradigm | Partition Protocol | Test Accuracy (%) | Paper Reported (%) |
| :--- | :--- | :--- | :--- | :--- |
| **Linear Discriminant Analysis (LDA)** | 1999 Classical Statistics | Exact Paper Split (11k train) | **58.38%** | 58.38% *(Exact Match)* |
| **Paper ANN Baseline (54-120-7)** | 1999 Connectionist Backprop | Exact Paper Split (11k train) | **70.58%** | 70.58% *(~45 hrs in 1999)* |
| **Enhanced Modern Deep MLP** | Modern Tabular Deep Learning | Exact Paper Split (11k train) | **71.63%** | 70.58% |
| **Fitted Tree Pipeline (Current)** | Scikit-Learn Pipeline | Exact Paper Split (11k train) | **83.97%** | *N/A* |

---

## 🛠️ Software Prerequisites

* **Operating System:** Windows 10/11, macOS, or Linux
* **Python:** 3.12+ (tested on Python 3.12 and 3.14)
* **Node.js:** v20+ LTS (tested on Node v26.3.0, npm 11.16.0)
* **Angular CLI:** 22.2.3

---

## 🚀 Quick Start & Local Execution

### 1. Clone the Repository
```bash
git clone https://github.com/miraman699/DevOps.git
cd DevOps
```

### 2. Setup Python Environment & Dependencies
```bash
python -m venv .venv
# On Windows PowerShell:
.\.venv\Scripts\Activate.ps1
# On Linux / macOS:
source .venv/bin/activate

pip install --upgrade pip
pip install -r backend/requirements.txt
```

### 3. Terminal Responsibility Matrix

Open three terminals in VS Code:

| Terminal | Working Folder | Command | Description |
| :--- | :--- | :--- | :--- |
| **Terminal 1 — Flask** | `D:\ml_project` | `python backend/app.py` | Starts Flask API on `http://127.0.0.1:5000` (keep running) |
| **Terminal 2 — Angular** | `D:\ml_project\frontend` | `ng serve --proxy-config proxy.conf.json --port 4200` | Launches Angular dev server at `http://localhost:4200` |
| **Terminal 3 — Commands**| `D:\ml_project` | `pytest backend/tests` | Run unit tests, curl checks, and git operations |

---

## 🧪 Testing & Verification

### Run Automated Backend Unit Tests
```bash
python -m pytest -q backend/tests
```
*Expected Output:*
```
.....                                                                    [100%]
5 passed in 2.06s
```

### Verify End-to-End API via Angular Dev Proxy
```bash
# Health check:
curl.exe --noproxy "*" -i http://localhost:4200/api/health

# Prediction with test payload:
curl.exe --noproxy "*" -i -X POST "http://localhost:4200/api/predict" \
  -H "Content-Type: application/json" \
  --data-binary "@backend/test_payload.json"
```

---

## 📁 Repository Directory Structure

```
DevOps/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # Automated pytest & Angular build CI
│       └── pages.yml                 # Automated GitHub Pages static deploy
├── backend/
│   ├── app.py                       # Flask REST API with schema validation
│   ├── requirements.txt             # Pinned backend dependencies
│   ├── make_payload.py              # Sample payload generation script
│   ├── test_pipeline.py             # Direct scikit-learn inference check
│   ├── test_payload.json            # Safe non-sensitive 54-feature test vector
│   ├── test_api.py                  # Direct requests API client check
│   ├── models/
│   │   └── model_bundle.joblib      # Fitted StandardScaler + RandomForest pipeline
│   └── tests/
│       ├── test_api.py              # Flask endpoint test client
│       └── test_structure.py        # Architectural smoke test
├── data/
│   └── sample_inputs.csv            # Non-sensitive representative sample rows
├── docs/
│   ├── environment.txt              # Software versions record (Stage 2.7)
│   └── verification_and_evidence.md # Evidence logs and terminal matrix
├── frontend/                        # Angular 22 Standalone Application
│   ├── proxy.conf.json              # Dev proxy forwarding /api to Flask :5000
│   ├── package.json
│   ├── angular.json
│   └── src/
│       ├── index.html
│       ├── styles.css               # Global Inter/SF Pro typography
│       └── app/
│           ├── feature-schema.ts    # 54 input features, presets & descriptions
│           ├── prediction.service.ts# Angular HttpClient service
│           ├── app.ts               # Component logic & preset synchronization
│           ├── app.html             # Glassmorphic UI with probability bars
│           └── app.css              # Apple/Awwwards-grade styling
├── .gitignore                       # Clean repository exclusions
└── README.md                        # Comprehensive system documentation
```

---

## 🌐 GitHub Actions & CI/CD Pipeline

* **`ci.yml` (Continuous Integration):**
  * Runs on Ubuntu 24.04 runner on every push and pull request.
  * Backend job sets up Python 3.12, installs requirements, and runs pytest test suites (`test_structure.py` and `test_api.py`).
  * Frontend job sets up Node.js 24, performs clean install `npm ci`, and builds production Angular bundles.
* **`pages.yml` (Continuous Deployment):**
  * Triggers on `main` push.
  * Compiles Angular with `--base-href /DevOps/`.
  * Deploys static build artifact (`frontend/dist/frontend/browser`) directly to GitHub Pages.

---

## ⚖️ Research & Ethical Disclaimer

This application is a research and pedagogical prototype based on public USGS and USFS Region 2 data from the Roosevelt National Forest. Predictions indicate computational statistical likelihood across 7 tree species and are intended for GIS ecological education and machine learning benchmarking, not commercial logging or environmental regulatory decisions.
