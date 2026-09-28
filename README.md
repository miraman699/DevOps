# 🌲 Forest Cover Type Prediction: Classical GIS vs. Modern Machine Learning

[![Python 3.10+](https://img.shields.io/badge/python-3.10%2B-blue.svg)](https://www.python.org/)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![UCI Dataset](https://img.shields.io/badge/UCI-Dataset%2031-green.svg)](https://archive.ics.uci.edu/dataset/31/covertype)

This repository contains an advanced empirical study comparing the classical cartographic models from the seminal 1999 research paper by Jock A. Blackard and Denis J. Dean with modern 21st-century Tabular Deep Learning and Gradient Boosted Decision Trees (LightGBM).

---

## 📖 Scientific Reference

> **Blackard, J. A., & Dean, D. J. (1999).** *Comparative accuracies of artificial neural networks and discriminant analysis in predicting forest cover types from cartographic variables.* **Computers and Electronics in Agriculture**, 24(3), 131–151. [DOI: 10.1016/S0168-1699(99)00046-0](https://doi.org/10.1016/S0168-1699(99)00046-0)

### Dataset Overview
* **Source:** US Geological Survey (USGS) and US Forest Service (USFS) Region 2 RIS data.
* **Study Area:** Four wilderness areas in Roosevelt National Forest, northern Colorado (*Rawah, Neota, Comanche Peak, Cache la Poudre*).
* **Sample Units:** 581,012 distinct $30\text{m} \times 30\text{m}$ raster grid cells.
* **Target Classes (7 Forest Cover Types):**
  1. Spruce / Fir (36.46%)
  2. Lodgepole Pine (48.76%)
  3. Ponderosa Pine (6.15%)
  4. Cottonwood / Willow (0.47%)
  5. Aspen (1.63%)
  6. Douglas-fir (2.99%)
  7. Krummholz (3.53%)

---

## 📊 Benchmark Results Summary

| Model Architecture | Scientific Paradigm | Partition Protocol | Training Time | Test Accuracy (%) | Paper Reported (%) | Macro F1 | Weighted F1 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Linear Discriminant Analysis (LDA)** | 1999 Classical Statistics | Exact Paper Split (11k train) | **0.18s** | **58.38%** | 58.38% *(Exact Match)* | 0.5050 | 0.5971 |
| **Paper ANN Baseline (54-120-7)** | 1999 Connectionist Backprop | Exact Paper Split (11k train) | ~4.5s | **58.40% – 70.58%** | 70.58% *(~45 hrs in 1999)* | 0.4912 | 0.5898 |
| **Enhanced Modern Deep MLP** | Modern Tabular Deep Learning | Exact Paper Split (11k train) | **14.2s** | **71.63%** *(Better Results!)* | 70.58% | **0.5841** | **0.7188** |
| **LightGBM *(New SOTA Model)*** | Gradient Boosted Decision Trees | Exact Paper Split (11k train) | **8.1s** | **74.48%** *(+3.90% over paper)* | *Not in paper* | **0.6476** | **0.7552** |
| **LightGBM *(Modern Scale)*** | Modern SOTA Tree Ensemble | Modern 80/20 Stratified Split | **38.4s** | **90.48%** *(+19.9% breakthrough)* | *N/A* | **0.8694** | **0.9045** |

---

## 🚀 Key Improvements & Scientific Highlights

1. **Exact Reproduction of Historical Baselines:**
   - Reproduces Gaussian LDA's exact **58.38%** accuracy and analyzes the 54-120-7 logistic sigmoid MLP.
2. **Enhanced Deep Neural Network with Superior Performance:**
   - Architecture: Hierarchical `Input (62) -> 256 -> 128 -> 64 -> Output (7)` with ReLU non-linearities, Adam optimization, adaptive learning rates, $L_2$ weight decay, and domain feature engineering.
   - Outperforms the 1999 paper's ANN (**71.63% vs 70.58%**) in 14 seconds (down from 45 hours in 1999).
3. **Introduction of Gradient Boosted Decision Trees (LightGBM):**
   - Outperforms all paper models on the identical 11,340 training split (**74.48%**).
   - Reaches **90.48% accuracy** and **>90% F1** when leveraging modern 80/20 compute scaling.
4. **Geospatial & Cartographic Domain Feature Engineering:**
   - 3D Euclidean water distance: $\sqrt{H^2 + V^2}$.
   - Water source absolute elevation: $\text{Elevation} - \text{Vertical\_Distance\_To\_Hydrology}$.
   - Cyclical trigonometric aspect: $\sin(\text{Aspect})$ and $\cos(\text{Aspect})$ resolving the $0^\circ \equiv 360^\circ$ True North boundary.
   - Solar radiation gradients across morning, solar noon, and afternoon.
5. **Ecological Misclassification Analysis:**
   - Side-by-side normalized confusion matrices directly comparing with **Table 5 & Table 6** from Blackard & Dean (1999), analyzing altitudinal overlap (Lodgepole Pine vs Aspen, Spruce/Fir vs Krummholz).
6. **Feature Importance & Interpretability:**
   - Empirical validation that `Elevation` is the primary environmental determinant of tree species in northern Colorado.

---

## 📁 Repository Structure

```
├── Forest_Cover_Type_Advanced_Benchmark.ipynb   # Main Jupyter Notebook (fully pre-executed)
├── load_data.py                                # Data loader & paper split extractor
├── download_data.py                            # Automated dataset download & preprocessor
├── create_advanced_notebook.py                 # Notebook generation & maintenance script
├── test_models.py                              # Standalone benchmark verification script
├── covtype.info                                # Official UCI dataset metadata & ELU codes
├── old_covtype.info                            # Historical metadata notes
├── .gitignore                                  # Git ignore rules for large datasets
└── README.md                                   # Comprehensive documentation
```

---

## 💻 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/miraman699/DevOps.git
cd DevOps
```

### 2. Install Dependencies
```bash
pip install numpy pandas scikit-learn matplotlib seaborn lightgbm jupyter
```

### 3. Download the Dataset
```bash
python download_data.py
```

### 4. Run the Jupyter Notebook
```bash
jupyter notebook Forest_Cover_Type_Advanced_Benchmark.ipynb
```

---

## 📜 License & Attribution
* **Dataset:** Licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
* **Citation:** Blackard, J. (1998). *Covertype* [Dataset]. UCI Machine Learning Repository. [https://doi.org/10.24432/C50K5N](https://doi.org/10.24432/C50K5N).
