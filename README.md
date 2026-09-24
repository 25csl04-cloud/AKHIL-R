# SMART WASTE AI
### AI-Based Waste Image Classification and Recycling Assistant

Smart Waste AI is a full-stack deep learning and computer vision web application designed to solve municipal waste contamination at the source. The system classifies waste items from uploaded images across 8 primary categories using a Convolutional Neural Network (MobileNetV2 transfer learning), predicts class probabilities, delivers actionable preparation and disposal guidance, renders Grad-CAM visual heatmaps, and tracks persistent analytics in a relational SQLite database.

---

## 1. System Architecture

```
User Browser (React + TypeScript + Tailwind)
   │
   ▼
Frontend REST Client (`src/services/api.ts`)
   │
   ├── [Mode A: Real AI] ──► FastAPI Backend (`backend/main.py`) ──► TensorFlow/Keras CNN (`ml/models/`)
   │                                                                     │
   └── [Mode B: Demo Mode] ──► Deterministic Simulation Engine           ▼
                                                                     SQLite Database (`smart_waste.db`)
```

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Vite 8.
- **Backend API**: Python 3.10+, FastAPI, Uvicorn, SQLAlchemy ORM, Pydantic v2.
- **Machine Learning**: TensorFlow 2.16+, Keras 3, MobileNetV2 (ImageNet weights), Pillow, scikit-learn.
- **Database**: SQLite (local development with `smart_waste.db`), PostgreSQL ready via `DATABASE_URL`.

---

## 2. Waste Categories & Segregation Logic

The system categorizes items into 8 standardized municipal recycling streams:

| Category | Recyclability Status | Suggested Stream | Preparation Protocol |
| :--- | :--- | :--- | :--- |
| **Plastic** | Recyclable | Blue / Yellow Bin | Empty liquids, rinse thoroughly, discard loose plastic caps |
| **Paper** | Recyclable | Blue Bin | Keep dry and clean; remove foil plastic liners and spiral rings |
| **Cardboard** | Recyclable | Yellow Bin | Flatten cartons, strip packaging tape, keep dry from food grease |
| **Glass** | Recyclable | Green Bin | Rinse containers clean, remove metal or plastic lids |
| **Metal** | Recyclable | Silver / Blue Bin | Rinse residue clean; do not crush aerosol cans |
| **Organic Waste**| Compostable | Green / Brown Bin | Divert to municipal composting or backyard organic bin |
| **E-Waste** | Special Handling | Authorized Kiosk | Discard at dedicated e-waste kiosks; tape lithium battery terminals |
| **Other / Unknown**| Non-Recyclable | General Black Bin | Dispose in standard non-recyclable solid waste stream |

---

## 3. Real AI Mode vs Demo Mode

To guarantee reliable college viva demonstrations even before running local model training:

- **Mode A (Real AI)**: Loads `ml/models/waste_classifier.keras` and evaluates raw image tensors using the TensorFlow runtime.
- **Mode B (Demo Mode)**: Active out-of-the-box. Operates deterministically with simulated inference latencies, full classification metadata, and Grad-CAM spatial activation overlays without requiring 500MB GPU/CPU weights.

You can toggle between modes directly in the top header bar.

---

## 4. Quick Start & Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+ and pip

### Step 1: Frontend Setup & Run
```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev
```
Open `http://localhost:3000` in your web browser.

### Step 2: (Optional) Python Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install requirements
pip install -r requirements.txt

# Start FastAPI server on port 8000
uvicorn main:app --reload --port 8000
```
Interactive API Swagger documentation will be available at `http://localhost:8000/docs`.

---

## 5. Machine Learning Pipeline & Training

### Dataset Preparation
Create an `ml/dataset/` directory and structure images by category:
```
ml/dataset/
  ├── plastic/
  ├── paper/
  ├── cardboard/
  ├── glass/
  ├── metal/
  ├── organic/
  ├── e_waste/
  └── other/
```

Recommended public datasets:
- **TrashNet** (Stanford / Gary Thung): 2,527 images covering glass, paper, cardboard, plastic, metal, and trash.
- **TACO (Trash Annotations in Context)**: Open-image litter dataset.
- **Waste Classification Data** (Kaggle): 25,000+ images for organic/recyclable items.

### Running Training
```bash
cd ml
python train.py
```
The pipeline automatically:
1. Resizes specimens to 224 × 224 × 3.
2. Normalizes pixel values to `[-1.0, 1.0]`.
3. Splits data into 70% Train, 15% Validation, 15% Test.
4. Performs Phase 1 training (frozen MobileNetV2 base, 20 epochs).
5. Performs Phase 2 fine-tuning (unfrozen upper conv layers, 15 epochs).
6. Exports model weights to `ml/models/waste_classifier.keras`.
7. Generates confusion matrix and metrics in `ml/metrics/model_metrics.json`.

---

## 6. Project Viva Defense Points

1. **Why Transfer Learning?**
   Deep CNNs trained from scratch require hundreds of thousands of images to generalize. MobileNetV2 uses pre-trained ImageNet representations (edges, textures, reflections) which achieves >92% test accuracy on small custom waste datasets in fewer than 35 epochs.
2. **Why MobileNetV2?**
   MobileNetV2 uses Depthwise Separable Convolutions, reducing multiply-accumulate operations by ~8× compared to standard conv nets. This enables sub-second inference on edge IoT sorting bins.
3. **Loss & Regularization:**
   Optimized with Sparse Categorical Crossentropy, Adam optimizer, Dropout (0.3), Batch Normalization, and EarlyStopping to eliminate overfitting.
