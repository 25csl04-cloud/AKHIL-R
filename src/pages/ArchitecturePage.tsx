import React from 'react';
import {
  Cpu,
  Layers,
  Database,
  Binary,
  Sliders,
  CheckCircle2,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  const layerSummary = [
    { layer: 'Input Layer', shape: '(224, 224, 3)', params: '0', role: 'Accepts raw normalized RGB image tensors' },
    { layer: 'Rescaling Layer', shape: '(224, 224, 3)', params: '0', role: 'Maps pixel intensities from [0, 255] to [-1.0, 1.0]' },
    { layer: 'Data Augmentation', shape: '(224, 224, 3)', params: '0', role: 'Random flips, rotation (±8%), zoom (±8%) during training' },
    { layer: 'MobileNetV2 Base (Frozen)', shape: '(7, 7, 1280)', params: '2,257,984', role: 'Pre-trained ImageNet depthwise separable conv feature extractor' },
    { layer: 'GlobalAveragePooling2D', shape: '(1280)', params: '0', role: 'Reduces spatial 7x7 grid to 1D continuous feature vector' },
    { layer: 'BatchNormalization', shape: '(1280)', params: '5,120', role: 'Stabilizes internal covariance shift across training mini-batches' },
    { layer: 'Dropout (Rate = 0.3)', shape: '(1280)', params: '0', role: 'Regularizes dense connections to prevent co-adaptation overfitting' },
    { layer: 'Dense Hidden (ReLU)', shape: '(128)', params: '163,968', role: 'Learns specialized waste material discriminant representations' },
    { layer: 'Dense Output (Softmax)', shape: '(8)', params: '1,032', role: 'Yields normalized categorical probabilities across 8 waste classes' }
  ];

  const vivaQuestions = [
    {
      q: 'Why choose MobileNetV2 instead of training a deep CNN from scratch?',
      a: 'MobileNetV2 leverages pre-trained feature weights from ImageNet (1.4M images) capturing low-level edges, textures, and material contours. This prevents overfitting on small waste datasets, drastically shortens training time, and uses Depthwise Separable Convolutions to run smoothly on edge devices and standard CPUs.'
    },
    {
      q: 'What is the loss function and optimization algorithm used?',
      a: 'Sparse Categorical Crossentropy is used because the 8 waste classes are mutually exclusive categorical labels. The optimizer is Adam with an initial learning rate of 1e-4, dynamically adjusted via ReduceLROnPlateau and EarlyStopping callbacks.'
    },
    {
      q: 'How does Grad-CAM produce visual heatmaps without retraining?',
      a: 'Grad-CAM computes the gradient of the predicted score with respect to the feature map activations of the final convolutional layer. These gradients are pooled and linearly combined to produce a coarse localization map highlighting discriminative regions in the input image.'
    },
    {
      q: 'How does the system gracefully handle missing weights (Demo Mode)?',
      a: 'The application implements a decoupled architecture: if the TensorFlow/Keras .keras weights are not yet generated, the system activates a clearly labeled Demo Mode that returns deterministic sample predictions, guaranteeing seamless project demonstrations without breaking.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="pb-6 border-b border-neutral-200">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          Model Architecture & Engineering Specifications
        </h1>
        <p className="text-sm text-neutral-600 mt-1">
          Technical specifications, transfer learning pipeline, layer breakdowns, and viva defense notes for academic demonstration.
        </p>
      </div>

      {/* OVERVIEW SPECIFICATIONS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-xs space-y-1">
          <span className="text-xs font-medium text-neutral-500">Base Architecture</span>
          <div className="text-xl font-bold text-neutral-900">MobileNetV2</div>
          <p className="text-[11px] text-neutral-400">Pretrained on ImageNet-1k</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-xs space-y-1">
          <span className="text-xs font-medium text-neutral-500">Input Specification</span>
          <div className="text-xl font-bold font-mono text-neutral-900">224 × 224 × 3</div>
          <p className="text-[11px] text-neutral-400">Normalized RGB channels</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-xs space-y-1">
          <span className="text-xs font-medium text-neutral-500">Output Categories</span>
          <div className="text-xl font-bold font-mono text-neutral-900">8 Classes</div>
          <p className="text-[11px] text-neutral-400">Softmax categorical vector</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-xs space-y-1">
          <span className="text-xs font-medium text-neutral-500">Total Parameters</span>
          <div className="text-xl font-bold font-mono text-emerald-700">2,428,104</div>
          <p className="text-[11px] text-neutral-400">170,120 trainable head params</p>
        </div>
      </div>

      {/* ARCHITECTURE LAYER SUMMARY TABLE */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              Keras Model Sequential Pipeline Breakdown
            </h3>
            <p className="text-xs text-neutral-500">
              Summary generated from <code className="font-mono bg-neutral-100 px-1 py-0.5 rounded">model.summary()</code>
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded">
            TensorFlow 2.16 / Keras 3
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                <th className="py-3 px-4">Layer Name</th>
                <th className="py-3 px-4 font-mono">Output Shape</th>
                <th className="py-3 px-4 font-mono text-right">Parameters</th>
                <th className="py-3 px-4">Role & Mechanism</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-mono text-neutral-700">
              {layerSummary.map((row, idx) => (
                <tr key={idx} className="hover:bg-neutral-50/60">
                  <td className="py-3 px-4 font-sans font-semibold text-neutral-900">
                    {row.layer}
                  </td>
                  <td className="py-3 px-4 text-emerald-700">{row.shape}</td>
                  <td className="py-3 px-4 text-right text-neutral-600">{row.params}</td>
                  <td className="py-3 px-4 font-sans text-neutral-600 text-[11px]">
                    {row.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TRAINING & PIPELINE METHODOLOGY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
            <Sliders className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-neutral-900">
              Data Preprocessing & Augmentation
            </h3>
          </div>
          <ul className="space-y-2.5 text-xs text-neutral-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span><strong>Resizing:</strong> Fixed 224 × 224 interpolation with high-fidelity Lanczos resampling.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span><strong>Normalization:</strong> Channel scaling mapped to [-1.0, 1.0] to match ImageNet pre-training distributions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span><strong>Data Augmentation:</strong> Random horizontal/vertical flip, ±8% rotation, and ±8% subtle zoom to prevent memorization while keeping material physics intact.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
            <Binary className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-neutral-900">
              Two-Phase Training Strategy
            </h3>
          </div>
          <ul className="space-y-2.5 text-xs text-neutral-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span><strong>Phase 1 (Warmup):</strong> Base MobileNetV2 layers are frozen. Only the new classification head (Dense 128 + Softmax) is trained for 20 epochs at lr = 1e-4.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span><strong>Phase 2 (Fine-Tuning):</strong> Top base convolutional layers (from layer 100 onwards) are unfrozen and fine-tuned for 15 epochs at a lower learning rate (1e-5).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span><strong>Regularization:</strong> EarlyStopping (patience=5) and ReduceLROnPlateau prevent catastrophic forgetting and overfitting.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* VIVA DEFENSE PREPARATION SECTION */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              College Project Viva & Demonstration Guide
            </h3>
            <p className="text-xs text-neutral-500">
              Standard examiner questions and technical defense rationale.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {vivaQuestions.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2"
            >
              <h4 className="text-xs font-bold text-neutral-900 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-800 flex items-center justify-center shrink-0 font-mono text-[10px]">
                  Q{index + 1}
                </span>
                <span>{item.q}</span>
              </h4>
              <p className="text-xs text-neutral-600 pl-7 leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
