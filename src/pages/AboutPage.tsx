import React from 'react';
import {
  BookOpen,
  Workflow,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe2
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const workflowNodes = [
    { title: 'Image Upload', subtitle: 'JPG, PNG, WebP (224x224)', icon: '📷' },
    { title: 'Preprocessing', subtitle: 'Normalization [-1, 1]', icon: '⚙️' },
    { title: 'CNN Model', subtitle: 'MobileNetV2 Transfer Head', icon: '🧠' },
    { title: 'Prediction', subtitle: 'Softmax Vector (8 Classes)', icon: '📊' },
    { title: 'Guidance', subtitle: 'Preparation & Local Rules', icon: '♻️' },
    { title: 'Persistence', subtitle: 'SQLite History & Analytics', icon: '💾' }
  ];

  const futureEnhancements = [
    {
      title: 'Real-Time Camera Stream Classification',
      desc: 'In-browser WebRTC video stream processing using TensorFlow.js or ONNX Runtime for live video object tagging.'
    },
    {
      title: 'Multiple-Object Detection (YOLOv8)',
      desc: 'Simultaneous bounding-box localization and multi-item classification within a single composite waste frame.'
    },
    {
      title: 'Multilingual Disposal Guidance',
      desc: 'Localization support for Spanish, Hindi, French, and Mandarin municipal recycling terminology.'
    },
    {
      title: 'Location-Based Recycling Center Suggestions',
      desc: 'Geolocation-based lookup of nearest verified municipal e-waste kiosks, battery drop-offs, and composting sites.'
    },
    {
      title: 'IoT Smart-Bin Automated Actuation',
      desc: 'Microcontroller (ESP32/Raspberry Pi) servo motor integration to automatically tilt bin lids into the correct bin.'
    },
    {
      title: 'Mobile Progressive Web App (PWA)',
      desc: 'Offline caching with service workers for field workers and municipal waste audit personnel.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Page Header */}
      <div className="pb-6 border-b border-neutral-200">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          About Smart Waste AI
        </h1>
        <p className="text-sm text-neutral-600 mt-1">
          Academic documentation, project synopsis, system architecture, and evaluation report for college presentation.
        </p>
      </div>

      {/* INTERACTIVE WORKFLOW PIPELINE DIAGRAM */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
        <div>
          <h3 className="text-base font-bold text-neutral-900">
            End-to-End System Workflow
          </h3>
          <p className="text-xs text-neutral-500">
            Execution path from client-side capture to neural prediction, disposal synthesis, and analytics aggregation.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {workflowNodes.map((node, idx) => (
            <div
              key={idx}
              className="relative p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col items-center text-center space-y-2 group hover:border-emerald-500 transition-colors"
            >
              <span className="text-2xl">{node.icon}</span>
              <div>
                <h4 className="text-xs font-bold text-neutral-900">{node.title}</h4>
                <p className="text-[10px] text-neutral-500 mt-0.5">{node.subtitle}</p>
              </div>
              <span className="text-[9px] font-mono font-bold text-neutral-400">
                Step 0{idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* COLLEGE PROJECT FORMAL REPORT SECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Problem Statement & Existing Issues */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
          <div className="space-y-2 pb-4 border-b border-neutral-100">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Academic Problem Statement
            </span>
            <h3 className="text-lg font-bold text-neutral-900">
              The Municipal Contamination Crisis
            </h3>
          </div>

          <div className="space-y-4 text-xs text-neutral-600 leading-relaxed">
            <p>
              <strong>Existing Problem:</strong> Despite widespread consumer awareness of environmental degradation, municipal waste segregation at the source remains critically flawed. Over 25% of recyclable waste in municipal collections is rejected due to cross-contamination (e.g. food oils on paper, complex composite plastics, or hazardous lithium batteries tossed into general trash).
            </p>
            <p>
              Traditional public signage fails because material recycling rules are often counterintuitive (e.g., disposable coffee cups have hidden polyethylene liners and cannot be recycled with regular paper).
            </p>
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 space-y-1 text-xs">
            <span className="font-bold text-emerald-900">Proposed AI Solution:</span>
            <p className="text-emerald-950 leading-relaxed">
              Smart Waste AI introduces a computer-vision powered classification assistant that inspects uploaded specimens in real time, computes categorical probabilities across 8 streams, and delivers tailored preparation instructions (e.g. rinse, remove caps, special e-waste depot handling).
            </p>
          </div>
        </div>

        {/* Project Objectives & Expected Outcomes */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
          <div className="space-y-2 pb-4 border-b border-neutral-100">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Project Objectives & Deliverables
            </span>
            <h3 className="text-lg font-bold text-neutral-900">
              Core Technical Goals
            </h3>
          </div>

          <ul className="space-y-3 text-xs text-neutral-600">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Develop a high-accuracy Convolutional Neural Network (CNN) using MobileNetV2 transfer learning trained on standardized benchmark datasets.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Deliver an intuitive responsive web application with sub-second inference speeds and visual feedback.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Implement Grad-CAM explainability to allow students and judges to verify what visual features influenced model decisions.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Maintain persistent relational history and dynamic statistics dashboard without relying on fabricated mock figures.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Provide robust Mode A (Real AI) and Mode B (Demo) toggle to ensure reliable live demonstrations during college vivas.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* TECHNOLOGY STACK SPECIFICATION */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-neutral-900 pb-3 border-b border-neutral-100">
          Complete Technology Stack
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="space-y-2">
            <span className="font-bold text-neutral-900 text-sm">Frontend Client</span>
            <ul className="space-y-1 text-neutral-600 font-mono">
              <li>React 19 (TypeScript)</li>
              <li>Tailwind CSS v4</li>
              <li>Vite 8 Build Tool</li>
              <li>Lucide Vector Icons</li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-neutral-900 text-sm">Backend Services</span>
            <ul className="space-y-1 text-neutral-600 font-mono">
              <li>Python 3.10+ / FastAPI</li>
              <li>Uvicorn ASGI Server</li>
              <li>Pydantic v2 Validation</li>
              <li>SQLAlchemy ORM</li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-neutral-900 text-sm">Machine Learning</span>
            <ul className="space-y-1 text-neutral-600 font-mono">
              <li>TensorFlow 2.16+ / Keras 3</li>
              <li>MobileNetV2 Base (ImageNet)</li>
              <li>Pillow (PIL) Resampling</li>
              <li>scikit-learn Metrics</li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-neutral-900 text-sm">Database & Storage</span>
            <ul className="space-y-1 text-neutral-600 font-mono">
              <li>SQLite (Local Development)</li>
              <li>PostgreSQL Ready</li>
              <li>LocalStorage Client Cache</li>
              <li>Static File Upload Vault</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FUTURE ENHANCEMENTS SECTION (Section 28) */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
        <div className="pb-3 border-b border-neutral-100">
          <h3 className="text-base font-bold text-neutral-900">
            Future Scope & Roadmap
          </h3>
          <p className="text-xs text-neutral-500">
            Planned technological advancements for commercial and civic municipal scaling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {futureEnhancements.map((feat, i) => (
            <div
              key={i}
              className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1.5"
            >
              <h4 className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>{feat.title}</span>
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
