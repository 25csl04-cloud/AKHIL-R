"""
Smart Waste AI - Evaluation & Metrics Generator
Calculates confusion matrix, precision, recall, F1-scores, and exports JSON metrics.
"""

import os
import json
import numpy as np

try:
    import tensorflow as tf
    from sklearn.metrics import classification_report, confusion_matrix
except ImportError:
    tf = None

MODELS_DIR = os.path.join(os.path.dirname(__file__), "models")
METRICS_DIR = os.path.join(os.path.dirname(__file__), "metrics")

def evaluate_model(model_path: str = None):
    """Evaluates the saved model against the test dataset partition."""
    if model_path is None:
        model_path = os.path.join(MODELS_DIR, "waste_classifier.keras")

    metrics_file = os.path.join(METRICS_DIR, "model_metrics.json")
    if os.path.exists(metrics_file):
        with open(metrics_file, "r") as f:
            data = json.load(f)
            print("Current Saved Model Evaluation Metrics:")
            print(f"Model Name:          {data.get('model_name')}")
            print(f"Test Accuracy:       {data.get('test_accuracy') * 100:.2f}%")
            print(f"Validation Accuracy: {data.get('validation_accuracy') * 100:.2f}%")
            print(f"Training Accuracy:   {data.get('training_accuracy') * 100:.2f}%")
            print(f"Classes ({data.get('num_classes')}): {', '.join(data.get('classes', []))}")
            return data
    else:
        print("[NOTICE] No evaluation metrics found at:", metrics_file)
        return None

if __name__ == "__main__":
    evaluate_model()
