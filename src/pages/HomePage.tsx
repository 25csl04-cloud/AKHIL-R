import React from 'react';
import { WASTE_CATEGORIES, SAMPLE_WASTE_ITEMS } from '../data/wasteCategories';
import { WasteCategory } from '../types/waste';
import { CategoryIcon } from '../components/CategoryIcon';
import {
  UploadCloud,
  Cpu,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe2,
  Sparkles
} from 'lucide-react';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  onSelectSampleItem?: (sample: typeof SAMPLE_WASTE_ITEMS[0]) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab, onSelectSampleItem }) => {
  const categoriesList = Object.values(WASTE_CATEGORIES);

  const steps = [
    {
      num: '01',
      title: 'Upload Image',
      desc: 'Snap or drag-and-drop any waste item photo (JPG, PNG, WebP up to 10 MB).',
      icon: UploadCloud
    },
    {
      num: '02',
      title: 'AI Analyzes',
      desc: 'Deep neural network normalizes pixel tensors and extracts high-level convolutional features.',
      icon: Cpu
    },
    {
      num: '03',
      title: 'Waste Classified',
      desc: 'Softmax layer produces categorical probabilities across 8 standardized recycling streams.',
      icon: CheckCircle2
    },
    {
      num: '04',
      title: 'Get Disposal Guidance',
      desc: 'Receive preparation steps, recyclability status, and local segregation instructions.',
      icon: BookOpen
    }
  ];

  const benefits = [
    {
      title: 'Better Waste Segregation',
      desc: 'Eliminates confusion at the bin by classifying complex multi-material items accurately.'
    },
    {
      title: 'Improved Recycling Awareness',
      desc: 'Provides clear actionable steps (rinsing, removing lids, detaching liners) to prevent batch rejections.'
    },
    {
      title: 'Reduced Contamination',
      desc: 'Prevents non-recyclable grease, ceramics, and electronics from spoiling recyclable streams.'
    },
    {
      title: 'Rapid Automated Classification',
      desc: 'Instant sub-second inference speeds suitable for integration with smart municipal sorting bins.'
    },
    {
      title: 'Educational Value for Communities',
      desc: 'Designed as a student viva-ready computer vision prototype with full architecture transparency.'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 md:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Computer Vision & Deep Learning Mini-Project</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                AI That Knows Where Your Waste Belongs
              </h1>

              <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl leading-relaxed">
                Upload a waste image and let Smart Waste AI identify, classify, and guide you toward better disposal.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('analyze')}
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-sm transition-colors inline-flex items-center gap-2"
                >
                  <span>Analyze Waste</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="px-6 py-3.5 text-sm font-semibold text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-300 rounded-xl transition-colors"
                >
                  View Dashboard
                </button>
              </div>

              {/* Zero-Pill Metric Ribbon */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-neutral-500 font-medium">
                <span className="flex items-center gap-1.5 text-neutral-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>8 Standard Categories</span>
                </span>
                <span aria-hidden="true" className="text-neutral-300">·</span>
                <span>MobileNetV2 / Keras CNN</span>
                <span aria-hidden="true" className="text-neutral-300">·</span>
                <span>Sub-Second Inference</span>
                <span aria-hidden="true" className="text-neutral-300">·</span>
                <span>Grad-CAM Explainability</span>
              </div>
            </div>

            {/* Visual Hero Asset Frame */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-200 bg-neutral-900 group">
                <img
                  src="/src/assets/images/hero_smart_waste_1790219100273.jpg"
                  alt="High-tech automated waste recycling sorting conveyor with computer vision camera"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/30 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between text-xs text-emerald-300 font-mono mb-1">
                    <span>Optical Sensor Node</span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Active 224x224 RGB
                    </span>
                  </div>
                  <p className="text-xs text-neutral-200">
                    Real-time waste segregation pipeline ready for college viva & smart municipality deployment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK BENCHMARK SAMPLES STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-neutral-100">
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                Try Pre-Loaded Waste Specimens
              </h3>
              <p className="text-xs text-neutral-500">
                Click any specimen below to immediately load it into the classification engine.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 shrink-0">
              6 Test Samples
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SAMPLE_WASTE_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (onSelectSampleItem) {
                    onSelectSampleItem(item);
                  }
                  setActiveTab('analyze');
                }}
                className="group p-2.5 rounded-xl border border-neutral-200 hover:border-emerald-500 hover:shadow-md transition-all text-left bg-neutral-50/50 hover:bg-white flex flex-col justify-between"
              >
                <div className="w-full aspect-square rounded-lg overflow-hidden bg-neutral-200 mb-2 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 text-[9px] font-mono text-white rounded">
                    {item.category}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-neutral-800 truncate group-hover:text-emerald-700">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-neutral-500 font-mono">
                    {item.fileSize}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            From raw camera capture to actionable ecological guidance in 4 synchronized phases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs hover:border-neutral-300 transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-neutral-400">
                    Step {step.num}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SUPPORTED CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Supported Categories
            </h2>
            <p className="text-sm text-neutral-600">
              Trained across 8 distinct municipal waste streams with specialized handling protocols.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('analyze')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>Test a category in Analyzer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categoriesList.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-xl p-5 border border-neutral-200 hover:border-emerald-300 hover:shadow-xs transition-all space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-lg bg-neutral-100 text-neutral-800 flex items-center justify-center">
                    <CategoryIcon category={cat.id} className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                      cat.recyclableStatus === 'Recyclable'
                        ? 'bg-blue-50 text-blue-700'
                        : cat.recyclableStatus === 'Compostable'
                        ? 'bg-emerald-50 text-emerald-700'
                        : cat.recyclableStatus === 'Special Handling Required'
                        ? 'bg-purple-50 text-purple-700'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {cat.recyclableStatus}
                  </span>
                </div>

                <h3 className="text-base font-bold text-neutral-900">{cat.name}</h3>
                <p className="text-xs text-neutral-600 line-clamp-2 mt-1">
                  {cat.shortDesc}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-100 text-[11px] text-neutral-500">
                <span className="font-semibold text-neutral-700">Examples: </span>
                {cat.exampleItems.slice(0, 3).join(', ')}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY IT MATTERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-900 to-neutral-900 text-white rounded-3xl p-8 md:p-12 overflow-hidden relative">
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
              <Globe2 className="w-4 h-4" />
              <span>Environmental & Scientific Impact</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Why AI-Driven Waste Classification Matters
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Improper waste sorting causes over 25% of municipal recyclables to be rejected and diverted to landfills due to contamination. Automated vision models offer consistent, instant guidance right at the point of disposal.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{benefit.title}</h4>
                    <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button
                onClick={() => setActiveTab('analyze')}
                className="px-6 py-3 text-sm font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors inline-flex items-center gap-2"
              >
                <span>Launch Analysis Console</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
