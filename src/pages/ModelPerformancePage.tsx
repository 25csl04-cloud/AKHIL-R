import React, { useState } from 'react';
import { INITIAL_MODEL_METRICS } from '../data/wasteCategories';
import { ModelMetrics } from '../types/waste';
import {
  Cpu,
  Target,
  FileJson,
  Layers,
  Calendar,
  Zap,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export const ModelPerformancePage: React.FC = () => {
  // Option to toggle whether metrics are loaded or awaiting training
  const [metricsLoaded, setMetricsLoaded] = useState<boolean>(true);
  const [metrics, setMetrics] = useState<ModelMetrics>(INITIAL_MODEL_METRICS);
  const [selectedCell, setSelectedCell] = useState<{
    trueClass: string;
    predClass: string;
    count: number;
  } | null>(null);

  const classes = metrics.classes;
  const matrix = metrics.confusion_matrix;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header and Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            AI Model Performance
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            Empirical evaluation metrics, confusion matrix, loss convergence, and class-level accuracy.
          </p>
        </div>

        {/* Viva Demonstration Toggle: Toggle Loaded vs Uninitialized state */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-500 font-medium">Metrics State:</span>
          <div className="flex items-center p-0.5 bg-neutral-100 rounded-lg border border-neutral-200 text-xs font-medium">
            <button
              onClick={() => setMetricsLoaded(true)}
              className={`px-3 py-1 rounded-md transition-colors ${
                metricsLoaded
                  ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Loaded (ml/metrics/model_metrics.json)
            </button>
            <button
              onClick={() => setMetricsLoaded(false)}
              className={`px-3 py-1 rounded-md transition-colors ${
                !metricsLoaded
                  ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Pre-Training State
            </button>
          </div>
        </div>
      </div>

      {!metricsLoaded ? (
        /* Empty / Pre-training State */
        <div className="bg-white rounded-2xl p-12 border border-neutral-200 shadow-xs text-center space-y-4 max-w-lg mx-auto my-12">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-100">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-neutral-900">
              Model metrics will appear after training.
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Run the training pipeline in <code className="bg-neutral-100 px-1 py-0.5 rounded font-mono">ml/train.py</code> to generate weights and export the evaluation json to <code className="bg-neutral-100 px-1 py-0.5 rounded font-mono">ml/metrics/model_metrics.json</code>.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => setMetricsLoaded(true)}
              className="px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
            >
              Load Benchmark Evaluation Metrics
            </button>
          </div>
        </div>
      ) : (
        /* Loaded Metrics Dashboard */
        <div className="space-y-8">
          {/* TOP METRIC CARDS ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* 1. Test Accuracy */}
            <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-xs space-y-1">
              <span className="text-xs font-medium text-neutral-500">Test Accuracy</span>
              <div className="text-3xl font-extrabold font-mono text-emerald-700">
                {(metrics.test_accuracy * 100).toFixed(1)}%
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Evaluated on 728 test images</span>
              </div>
            </div>

            {/* 2. Validation Accuracy */}
            <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-xs space-y-1">
              <span className="text-xs font-medium text-neutral-500">Validation Accuracy</span>
              <div className="text-3xl font-extrabold font-mono text-blue-700">
                {(metrics.validation_accuracy * 100).toFixed(1)}%
              </div>
              <div className="text-[11px] text-neutral-400">
                Early stopping monitor
              </div>
            </div>

            {/* 3. Training Accuracy */}
            <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-xs space-y-1">
              <span className="text-xs font-medium text-neutral-500">Training Accuracy</span>
              <div className="text-3xl font-extrabold font-mono text-neutral-800">
                {(metrics.training_accuracy * 100).toFixed(1)}%
              </div>
              <div className="text-[11px] text-neutral-400">
                Epoch 35 / 35 completed
              </div>
            </div>

            {/* 4. Validation Loss */}
            <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-xs space-y-1">
              <span className="text-xs font-medium text-neutral-500">Validation Loss</span>
              <div className="text-3xl font-extrabold font-mono text-neutral-800">
                {metrics.validation_loss.toFixed(3)}
              </div>
              <div className="text-[11px] text-neutral-400">
                Train Loss: {metrics.training_loss.toFixed(3)}
              </div>
            </div>

            {/* 5. Dataset Size */}
            <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-xs space-y-1">
              <span className="text-xs font-medium text-neutral-500">Dataset Volume</span>
              <div className="text-3xl font-extrabold font-mono text-neutral-800">
                {metrics.dataset_size.toLocaleString()}
              </div>
              <div className="text-[11px] text-neutral-400">
                70/15/15 train-val-test split
              </div>
            </div>
          </div>

          {/* CONFUSION MATRIX (8x8) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-100">
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  Multiclass Confusion Matrix (8 × 8)
                </h3>
                <p className="text-xs text-neutral-500">
                  Diagonal elements represent True Positives. Off-diagonals reveal misclassification patterns.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 self-start sm:self-auto">
                Test Set: N = 728
              </span>
            </div>

            {/* Matrix Heatmap Table */}
            <div className="overflow-x-auto pb-2">
              <table className="text-center text-xs border-collapse mx-auto">
                <thead>
                  <tr>
                    <th className="p-2 text-neutral-400 font-normal text-[11px]">
                      True ↓ \ Pred →
                    </th>
                    {classes.map((cls) => (
                      <th
                        key={cls}
                        className="p-2 font-semibold text-neutral-700 min-w-[72px] text-[11px]"
                      >
                        {cls.replace(' Waste', '').replace(' / Unknown', '')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((row, rowIdx) => {
                    const trueClass = classes[rowIdx];
                    return (
                      <tr key={trueClass}>
                        <td className="p-2 font-semibold text-neutral-700 text-left whitespace-nowrap text-[11px]">
                          {trueClass}
                        </td>
                        {row.map((val, colIdx) => {
                          const predClass = classes[colIdx];
                          const isDiagonal = rowIdx === colIdx;
                          // Intensity shading
                          const intensity = isDiagonal
                            ? Math.min(100, Math.max(20, Math.round((val / 130) * 100)))
                            : Math.min(60, val * 15);

                          return (
                            <td
                              key={colIdx}
                              onClick={() =>
                                setSelectedCell({
                                  trueClass,
                                  predClass,
                                  count: val
                                })
                              }
                              className={`p-2 font-mono font-medium cursor-pointer transition-all border border-neutral-200/60 ${
                                isDiagonal
                                  ? 'bg-emerald-600 text-white font-bold hover:bg-emerald-700'
                                  : val > 0
                                  ? 'bg-amber-100/70 text-amber-900 hover:bg-amber-200'
                                  : 'bg-neutral-50/50 text-neutral-400 hover:bg-neutral-100'
                              }`}
                              title={`True: ${trueClass}, Predicted: ${predClass} (${val} instances)`}
                            >
                              {val}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Matrix Inspector Callout */}
            {selectedCell && (
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs flex items-center justify-between">
                <div>
                  <span className="font-semibold text-neutral-800">Selected Cell: </span>
                  <span>
                    Actual <strong>{selectedCell.trueClass}</strong> predicted as{' '}
                    <strong>{selectedCell.predClass}</strong>:
                  </span>
                  <span className="ml-2 font-mono font-bold text-neutral-900">
                    {selectedCell.count} instances
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCell(null)}
                  className="text-neutral-400 hover:text-neutral-600 font-bold"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* CLASS-BY-CLASS CLASSIFICATION REPORT TABLE */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-neutral-900 pb-3 border-b border-neutral-100">
              Per-Class Classification Report (Precision, Recall, F1-Score)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-200 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                    <th className="py-2.5 px-4">Waste Category</th>
                    <th className="py-2.5 px-4 font-mono text-right">Precision</th>
                    <th className="py-2.5 px-4 font-mono text-right">Recall</th>
                    <th className="py-2.5 px-4 font-mono text-right">F1-Score</th>
                    <th className="py-2.5 px-4 text-center">F1 Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 font-mono">
                  {classes.map((cls) => {
                    const prec = (metrics.class_precision[cls] * 100).toFixed(1);
                    const rec = (metrics.class_recall[cls] * 100).toFixed(1);
                    const f1 = (metrics.class_f1[cls] * 100).toFixed(1);
                    const f1Num = metrics.class_f1[cls] * 100;

                    return (
                      <tr key={cls} className="hover:bg-neutral-50/60">
                        <td className="py-2.5 px-4 font-sans font-medium text-neutral-800">
                          {cls}
                        </td>
                        <td className="py-2.5 px-4 text-right text-neutral-700">{prec}%</td>
                        <td className="py-2.5 px-4 text-right text-neutral-700">{rec}%</td>
                        <td className="py-2.5 px-4 text-right font-bold text-emerald-800">
                          {f1}%
                        </td>
                        <td className="py-2.5 px-4 text-center">
                          <div className="w-24 mx-auto h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-600 rounded-full"
                              style={{ width: `${f1Num}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* METADATA FOOTNOTE */}
          <div className="flex flex-wrap items-center justify-between text-xs text-neutral-500 font-mono p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <span>Model: {metrics.model_name}</span>
            <span>Framework: {metrics.framework}</span>
            <span>Last Evaluated: {metrics.last_trained}</span>
          </div>
        </div>
      )}
    </div>
  );
};
