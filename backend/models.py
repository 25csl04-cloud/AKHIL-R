"""
Smart Waste AI - SQLAlchemy ORM Models
Tables:
  - classification_history: Records user predictions, uploaded image path, confidence, mode, and timestamp.
  - model_metrics: Persists periodic training accuracy, validation accuracy, and test evaluation snapshots.
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, Text
from database import Base

class ClassificationHistory(Base):
    __tablename__ = "classification_history"

    id = Column(String(64), primary_key=True, index=True)
    image_path = Column(String(512), nullable=False)
    predicted_class = Column(String(64), nullable=False, index=True)
    item_name = Column(String(128), nullable=True)
    confidence = Column(Float, nullable=False)
    mode = Column(String(32), default="demo")  # "real" or "demo"
    is_demo_seed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

class ModelMetricsRecord(Base):
    __tablename__ = "model_metrics"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    model_name = Column(String(128), nullable=False)
    accuracy = Column(Float, nullable=False)
    validation_accuracy = Column(Float, nullable=False)
    test_accuracy = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    metrics_json = Column(Text, nullable=True)
