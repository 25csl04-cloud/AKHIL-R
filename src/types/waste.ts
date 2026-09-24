export type WasteCategory =
  | 'Plastic'
  | 'Paper'
  | 'Cardboard'
  | 'Glass'
  | 'Metal'
  | 'Organic Waste'
  | 'E-Waste'
  | 'Other / Unknown';

export type RecyclabilityStatus =
  | 'Recyclable'
  | 'Non-Recyclable'
  | 'Special Handling Required'
  | 'Compostable'
  | 'Check Local Rules';

export type ModelMode = 'real' | 'demo';

export interface CategoryInfo {
  id: WasteCategory;
  name: string;
  shortDesc: string;
  recyclableStatus: RecyclabilityStatus;
  disposalMethod: string;
  preparationSteps: string[];
  environmentalImpact: string;
  exampleItems: string[];
  binColorAdvice: string;
  decompositionTime: string;
  carbonFootprintNote: string;
}

export interface PredictionCandidate {
  category: WasteCategory;
  confidence: number;
}

export interface PredictionResult {
  id: string;
  predicted_class: WasteCategory;
  itemName?: string;
  confidence: number;
  top_predictions: PredictionCandidate[];
  mode: ModelMode;
  created_at: string;
  image_url?: string;
  detected_features?: string[];
  inference_time_ms?: number;
  grad_cam_available?: boolean;
}

export interface ClassificationRecord {
  id: string;
  image_path: string;
  predicted_class: WasteCategory;
  item_name?: string;
  confidence: number;
  mode: ModelMode;
  created_at: string;
  is_demo_seed?: boolean;
}

export interface ModelMetrics {
  model_name: string;
  framework: string;
  input_shape: string;
  num_classes: number;
  classes: WasteCategory[];
  dataset_size: number;
  training_accuracy: number;
  validation_accuracy: number;
  test_accuracy: number;
  training_loss: number;
  validation_loss: number;
  last_trained: string;
  epochs_completed: number;
  batch_size: number;
  optimizer: string;
  confusion_matrix: number[][];
  class_precision: Record<string, number>;
  class_recall: Record<string, number>;
  class_f1: Record<string, number>;
}
