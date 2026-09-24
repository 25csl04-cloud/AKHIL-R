# Dataset Preparation Guide

Smart Waste AI classifies waste images across 8 primary target classes.

## Directory Structure

To train the CNN model, organize your images in `ml/dataset/` under the following subfolders:

```
ml/dataset/
├── plastic/
│   ├── plastic_001.jpg
│   └── ...
├── paper/
│   ├── paper_001.jpg
│   └── ...
├── cardboard/
│   ├── cardboard_001.jpg
│   └── ...
├── glass/
│   ├── glass_001.jpg
│   └── ...
├── metal/
│   ├── metal_001.jpg
│   └── ...
├── organic/
│   ├── organic_001.jpg
│   └── ...
├── e_waste/
│   ├── ewaste_001.jpg
│   └── ...
└── other/
    ├── other_001.jpg
    └── ...
```

## Recommended Benchmark Datasets

You can download freely available academic waste datasets for training:

1. **TrashNet Dataset** (Stanford University / Gary Thung & Mindy Yang):
   - Contains 2,527 images covering Glass, Paper, Cardboard, Plastic, Metal, and Trash.
   - GitHub: `https://github.com/garythung/trashnet`
   - Kaggle: Search "TrashNet Dataset"

2. **Waste Classification Data** (Kaggle):
   - Contains 25,000+ images categorized into Organic and Recyclable items.
   - Useful for augmenting the Organic Waste category.

3. **TACO (Trash Annotations in Context)**:
   - Open image dataset of litter in diverse real-world environments.
   - Website: `http://tacodataset.org`

## Training the Model

Once your images are in place:

```bash
cd ml
python train.py
```

The script will automatically:
1. Split images into 70% Train, 15% Validation, 15% Test.
2. Apply data augmentation (flips, rotations, subtle zoom).
3. Train a MobileNetV2 transfer learning model.
4. Fine-tune upper convolutional layers.
5. Save `ml/models/waste_classifier.keras`.
6. Export evaluation metrics to `ml/metrics/model_metrics.json`.
