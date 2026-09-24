"""
Smart Waste AI - Standalone Image Predictor
Implements:
  Mode A: Real AI Model (TensorFlow / Keras .keras load & inference)
  Mode B: Demo Mode (Deterministic simulated CNN prediction with visible flag)
"""

import os
import sys
import json
import random
from typing import Dict, Any, List
import numpy as np

# Configurable Mode Switch
# Change this to "real" or "demo" or let it auto-detect based on model file existence
MODEL_MODE = os.getenv("MODEL_MODE", "auto")

MODELS_DIR = os.path.join(os.path.dirname(__file__), "models")
MODEL_FILE = os.path.join(MODELS_DIR, "waste_classifier.keras")
CLASS_NAMES_FILE = os.path.join(MODELS_DIR, "class_names.json")

DEFAULT_CLASSES = [
    "Plastic",
    "Paper",
    "Cardboard",
    "Glass",
    "Metal",
    "Organic Waste",
    "E-Waste",
    "Other / Unknown"
]

_loaded_model = None
_loaded_classes = None

def get_classes() -> List[str]:
    global _loaded_classes
    if _loaded_classes is None:
        if os.path.exists(CLASS_NAMES_FILE):
            try:
                with open(CLASS_NAMES_FILE, "r") as f:
                    _loaded_classes = json.load(f)
            except Exception:
                _loaded_classes = DEFAULT_CLASSES
        else:
            _loaded_classes = DEFAULT_CLASSES
    return _loaded_classes

def get_active_mode() -> str:
    if MODEL_MODE in ("real", "demo"):
        return MODEL_MODE
    # Auto mode: Check if model file exists
    return "real" if os.path.exists(MODEL_FILE) else "demo"

def predict_image(image_path: str) -> Dict[str, Any]:
    """
    Predicts the waste category for an uploaded image.
    Returns:
    {
        "predicted_class": "Plastic",
        "confidence": 0.946,
        "top_predictions": [...],
        "mode": "real" | "demo"
    }
    """
    classes = get_classes()
    active_mode = get_active_mode()

    if active_mode == "real" and os.path.exists(MODEL_FILE):
        try:
            import tensorflow as tf
            from preprocess import load_and_preprocess_image

            global _loaded_model
            if _loaded_model is None:
                _loaded_model = tf.keras.models.load_model(MODEL_FILE)

            preprocessed = load_and_preprocess_image(image_path)
            probabilities = _loaded_model.predict(preprocessed, verbose=0)[0]
            
            top_indices = np.argsort(probabilities)[::-1][:3]
            top_predictions = [
                {"class": classes[i], "confidence": round(float(probabilities[i]), 4)}
                for i in top_indices
            ]

            return {
                "predicted_class": top_predictions[0]["class"],
                "confidence": top_predictions[0]["confidence"],
                "top_predictions": top_predictions,
                "mode": "real"
            }
        except Exception as e:
            print(f"[WARN] Real model inference failed ({e}), falling back to Demo Mode.")
            active_mode = "demo"

    # DEMO MODE (Mode B)
    # Provides a realistic, deterministic distribution based on image attributes or demo classes
    filename = os.path.basename(image_path).lower()
    
    # Infer based on common keyword hints if available in filename or fallback to balanced distribution
    if "plastic" in filename or "bottle" in filename or "cup" in filename:
        primary = "Plastic"
        conf = 0.946
        secondary = "Glass"
        sec_conf = 0.034
    elif "can" in filename or "metal" in filename or "tin" in filename or "foil" in filename:
        primary = "Metal"
        conf = 0.962
        secondary = "Plastic"
        sec_conf = 0.025
    elif "box" in filename or "cardboard" in filename or "carton" in filename:
        primary = "Cardboard"
        conf = 0.924
        secondary = "Paper"
        sec_conf = 0.051
    elif "paper" in filename or "newspaper" in filename or "flyer" in filename:
        primary = "Paper"
        conf = 0.938
        secondary = "Cardboard"
        sec_conf = 0.042
    elif "glass" in filename or "jar" in filename or "bottle" in filename:
        primary = "Glass"
        conf = 0.951
        secondary = "Plastic"
        sec_conf = 0.031
    elif "apple" in filename or "fruit" in filename or "organic" in filename or "food" in filename:
        primary = "Organic Waste"
        conf = 0.937
        secondary = "Other / Unknown"
        sec_conf = 0.041
    elif "circuit" in filename or "pcb" in filename or "cable" in filename or "battery" in filename or "phone" in filename:
        primary = "E-Waste"
        conf = 0.912
        secondary = "Metal"
        sec_conf = 0.058
    else:
        # Balanced sample prediction
        primary = "Plastic"
        conf = 0.915
        secondary = "Metal"
        sec_conf = 0.055

    tertiary_candidates = [c for c in classes if c not in (primary, secondary)]
    tertiary = tertiary_candidates[0] if tertiary_candidates else "Other / Unknown"
    tert_conf = round(1.0 - conf - sec_conf, 4)

    return {
        "predicted_class": primary,
        "confidence": conf,
        "top_predictions": [
            {"class": primary, "confidence": conf},
            {"class": secondary, "confidence": sec_conf},
            {"class": tertiary, "confidence": max(0.01, tert_conf)}
        ],
        "mode": "demo"
    }

if __name__ == "__main__":
    if len(sys.argv) > 1:
        result = predict_image(sys.argv[1])
        print(json.dumps(result, indent=2))
    else:
        print("Usage: python predict.py <path_to_image>")
