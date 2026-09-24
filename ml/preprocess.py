"""
Smart Waste AI - Machine Learning Pipeline: Preprocessing & Data Augmentation
Prepares raw images for transfer learning and CNN training.
Target Dimensions: 224 x 224 x 3 (Standard for MobileNetV2 / ResNet)
"""

import os
from typing import Tuple
import numpy as np
from PIL import Image

TARGET_SIZE: Tuple[int, int] = (224, 224)

def load_and_preprocess_image(image_path: str, target_size: Tuple[int, int] = TARGET_SIZE) -> np.ndarray:
    """
    Loads an image from file system, converts to RGB, resizes with high-quality Lanczos resampling,
    and normalizes pixel values to [0.0, 1.0] (or [-1, 1] depending on model requirements).
    """
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found at path: {image_path}")

    # Open image with Pillow and guarantee 3-channel RGB
    with Image.open(image_path) as img:
        img_rgb = img.convert('RGB')
        # Resize to model input specification
        img_resized = img_rgb.resize(target_size, Image.Resampling.LANCZOS)
        
        # Convert to numpy float32 array
        arr = np.asarray(img_resized, dtype=np.float32)
        
        # MobileNetV2 standard normalization: map [0, 255] to [-1.0, 1.0]
        normalized = (arr / 127.5) - 1.0
        
        # Add batch dimension: shape (1, 224, 224, 3)
        return np.expand_dims(normalized, axis=0)

def get_data_augmentation_layers():
    """
    Returns Keras Sequential data augmentation pipeline suitable for waste images.
    Applies small random rotations, horizontal/vertical flips, subtle zoom, and contrast adjustments.
    Avoids excessive distortions to prevent unnatural distortion of waste geometry.
    """
    import tensorflow as tf
    from tensorflow.keras import layers

    return tf.keras.Sequential([
        layers.RandomFlip("horizontal_and_vertical", name="aug_random_flip"),
        layers.RandomRotation(0.08, fill_mode="nearest", name="aug_random_rotation"),
        layers.RandomZoom(0.08, fill_mode="nearest", name="aug_random_zoom"),
        layers.RandomContrast(0.1, name="aug_random_contrast")
    ], name="data_augmentation")

if __name__ == "__main__":
    print("Smart Waste AI Preprocessing module loaded.")
    print(f"Standard Input Dimension: {TARGET_SIZE[0]}x{TARGET_SIZE[1]}x3 RGB")
