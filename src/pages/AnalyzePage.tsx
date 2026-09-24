import React, { useState, useRef, useEffect } from 'react';
import { ModelMode, PredictionResult, WasteCategory } from '../types/waste';
import { SAMPLE_WASTE_ITEMS, WASTE_CATEGORIES } from '../data/wasteCategories';
import { analyzeWasteImage } from '../services/api';
import { CategoryIcon } from '../components/CategoryIcon';
import { GradCamViewer } from '../components/GradCamViewer';
import {
  UploadCloud,
  FileImage,
  X,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  Clock,
  Layers,
  Leaf,
  RefreshCw
} from 'lucide-react';

interface AnalyzePageProps {
  modelMode: ModelMode;
  selectedSample?: typeof SAMPLE_WASTE_ITEMS[0] | null;
  onClearSample?: () => void;
  onAnalysisComplete?: (result: PredictionResult) => void;
  setActiveTab: (tab: string) => void;
}

export const AnalyzePage: React.FC<AnalyzePageProps> = ({
  modelMode,
  selectedSample,
  onClearSample,
  onAnalysisComplete,
  setActiveTab
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileDetails, setFileDetails] = useState<{ name: string; size: string } | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // If a sample item was chosen from Home page
  useEffect(() => {
    if (selectedSample) {
      setPreviewUrl(selectedSample.imageUrl);
      setFileDetails({
        name: `${selectedSample.name.toLowerCase().replace(/\s+/g, '_')}.jpg`,
        size: selectedSample.fileSize
      });
      setSelectedFile(null);
      setPredictionResult(null);
      setErrorMsg(null);
    }
  }, [selectedSample]);

  const handleFileSelect = (file: File) => {
    setErrorMsg(null);
    setPredictionResult(null);

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg('Please upload a JPG, JPEG, PNG, or WebP image.');
      return;
    }

    // Validate size (10 MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Image size exceeds the 10 MB limit.');
      return;
    }

    setSelectedFile(file);
    if (onClearSample) onClearSample();

    // Format size
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
    const sizeStr = file.size >= 1024 * 1024 ? `${sizeInMb} MB` : `${Math.round(file.size / 1024)} KB`;

    setFileDetails({
      name: file.name,
      size: sizeStr
    });

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setFileDetails(null);
    setPredictionResult(null);
    setErrorMsg(null);
    if (onClearSample) onClearSample();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const runAnalysis = async () => {
    if (!previewUrl && !selectedFile) {
      setErrorMsg('Please select an image before analyzing.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg(null);
    setPredictionResult(null);

    try {
      setAnalysisStep('Resizing specimen to 224 × 224 RGB tensors...');
      await new Promise((r) => setTimeout(r, 350));

      setAnalysisStep('Normalizing pixel values [-1.0, 1.0]...');
      await new Promise((r) => setTimeout(r, 300));

      setAnalysisStep('Running MobileNetV2 convolutional inference...');
      await new Promise((r) => setTimeout(r, 450));

      setAnalysisStep('Applying Softmax categorical distribution & Grad-CAM...');

      let res: PredictionResult;
      if (selectedFile) {
        res = await analyzeWasteImage(selectedFile, modelMode);
      } else if (previewUrl && fileDetails) {
        res = await analyzeWasteImage({ url: previewUrl, name: fileDetails.name }, modelMode);
      } else {
        throw new Error('No image loaded');
      }

      setPredictionResult(res);
      if (onAnalysisComplete) {
        onAnalysisComplete(res);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Unable to analyze this image. Please try another image.');
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep('');
    }
  };

  const getConfidenceLevel = (confidence: number) => {
    const pct = confidence * 100;
    if (pct >= 90) return { label: 'Very High Confidence', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (pct >= 70) return { label: 'High Confidence', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    if (pct >= 50) return { label: 'Moderate Confidence', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { label: 'Low Confidence', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  const selectedCategoryInfo = predictionResult
    ? WASTE_CATEGORIES[predictionResult.predicted_class]
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            Waste Image Classification
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            Feed any specimen photo into the deep learning CNN classifier to obtain category probabilities and recycling protocol.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-xs text-neutral-500 font-medium">Model Pipeline:</span>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-md border flex items-center gap-1.5 ${
              modelMode === 'real'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}
          >
            {modelMode === 'real' ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Real AI Model (TensorFlow / Keras)
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3 text-amber-600" />
                Demo Mode (Simulation Engine)
              </>
            )}
          </span>
        </div>
      </div>

      {/* ERROR BANNER */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button
            onClick={() => setErrorMsg(null)}
            className="text-rose-600 hover:text-rose-800 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* MAIN TWO-COLUMN WORKBENCH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Upload & Preview Area */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-neutral-900">
                Specimen Input
              </h2>
              {fileDetails && (
                <button
                  onClick={handleRemoveImage}
                  disabled={isAnalyzing}
                  className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Remove image</span>
                </button>
              )}
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
              className="hidden"
            />

            {!previewUrl ? (
              /* Drag and Drop Zone */
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[280px] ${
                  dragActive
                    ? 'border-emerald-500 bg-emerald-50/50'
                    : 'border-neutral-300 hover:border-neutral-400 bg-neutral-50/50'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-100/60 text-emerald-800 flex items-center justify-center mb-4">
                  <UploadCloud className="w-7 h-7" />
                </div>

                <h3 className="text-sm font-semibold text-neutral-900 mb-1">
                  Drag and drop your waste image here
                </h3>
                <p className="text-xs text-neutral-500 mb-4 max-w-xs">
                  Or browse your device to select a photo (JPG, JPEG, PNG, or WebP up to 10 MB).
                </p>

                <button
                  type="button"
                  className="px-4 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 shadow-2xs"
                >
                  Select File
                </button>
              </div>
            ) : (
              /* Active Image Preview */
              <div className="space-y-4">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-neutral-900 flex items-center justify-center border border-neutral-200">
                  <img
                    src={previewUrl}
                    alt="Selected waste specimen"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />

                  {/* Scanning HUD Overlay when analyzing */}
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-emerald-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-white p-6 text-center space-y-4">
                      <div className="w-12 h-12 rounded-full border-3 border-emerald-400 border-t-transparent animate-spin" />
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-emerald-200 animate-pulse">
                          Analyzing your waste image...
                        </p>
                        <p className="text-xs font-mono text-neutral-300 max-w-xs">
                          {analysisStep}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* File Metadata Details */}
                {fileDetails && (
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-600 bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                    <span className="truncate max-w-[200px]" title={fileDetails.name}>
                      {fileDetails.name}
                    </span>
                    <span className="text-neutral-500 shrink-0">{fileDetails.size}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={runAnalysis}
                    disabled={isAnalyzing}
                    className="flex-1 py-3 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:bg-neutral-300 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Processing Specimen...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Run AI Classification</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isAnalyzing}
                    className="px-3.5 py-3 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50 rounded-xl"
                    title="Choose a different image"
                  >
                    Replace
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Benchmark Items Strip */}
          <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-800">Need a sample image?</span>
              <span className="text-neutral-500">Instant 1-Click Load</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {SAMPLE_WASTE_ITEMS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => {
                    setPreviewUrl(sample.imageUrl);
                    setFileDetails({
                      name: `${sample.name.toLowerCase().replace(/\s+/g, '_')}.jpg`,
                      size: sample.fileSize
                    });
                    setSelectedFile(null);
                    setPredictionResult(null);
                    setErrorMsg(null);
                  }}
                  disabled={isAnalyzing}
                  className="p-1.5 rounded-lg border border-neutral-200 hover:border-emerald-500 bg-neutral-50 hover:bg-white text-left transition-all group"
                >
                  <div className="aspect-square rounded overflow-hidden bg-neutral-200 mb-1">
                    <img
                      src={sample.imageUrl}
                      alt={sample.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-[11px] font-medium text-neutral-700 truncate group-hover:text-emerald-700">
                    {sample.category}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Prediction Result & Guidance */}
        <div className="lg:col-span-7 space-y-6">
          {!predictionResult && !isAnalyzing ? (
            /* Empty State */
            <div className="bg-white rounded-2xl p-10 border border-neutral-200 shadow-xs text-center space-y-4 min-h-[420px] flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center">
                <FileImage className="w-8 h-8" />
              </div>
              <div className="max-w-md space-y-1">
                <h3 className="text-lg font-bold text-neutral-900">
                  Awaiting Specimen Analysis
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Upload an image on the left or select a sample specimen, then click "Run AI Classification" to view predictions, recyclability, and disposal instructions.
                </p>
              </div>
              <div className="pt-2 text-xs font-mono text-neutral-400">
                Model: 224x224 RGB · Softmax Output (8 Classes)
              </div>
            </div>
          ) : isAnalyzing ? (
            /* Loading State Card */
            <div className="bg-white rounded-2xl p-10 border border-neutral-200 shadow-xs text-center space-y-6 min-h-[420px] flex flex-col items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-emerald-600 animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-neutral-900">
                  Analyzing your waste image...
                </h3>
                <p className="text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md inline-block border border-emerald-100">
                  {analysisStep || 'Evaluating tensor activations...'}
                </p>
              </div>
              <p className="text-xs text-neutral-500 max-w-sm">
                Generating top-3 class probabilities, recyclability audit, and Grad-CAM spatial receptive field map.
              </p>
            </div>
          ) : (
            /* POPULATED PREDICTION RESULT */
            predictionResult && selectedCategoryInfo && (
              <div className="space-y-6">
                {/* 1. Main Prediction Summary Card */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
                  {/* Top Bar with Mode Tag & Inference Time */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-neutral-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neutral-500">Inference Mode:</span>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded font-mono ${
                          predictionResult.mode === 'real'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {predictionResult.mode === 'real' ? 'Real AI Model' : 'Demo Mode'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
                      {predictionResult.inference_time_ms && (
                        <span>{predictionResult.inference_time_ms} ms</span>
                      )}
                      <span>·</span>
                      <span>{new Date(predictionResult.created_at).toLocaleTimeString()}</span>
                    </div>
                  </div>

                  {/* Primary Prediction Display */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                        <CategoryIcon
                          category={predictionResult.predicted_class}
                          className="w-7 h-7"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-neutral-500">
                            Predicted Category
                          </span>
                          <span aria-hidden="true" className="text-neutral-300">·</span>
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded ${
                              selectedCategoryInfo.recyclableStatus === 'Recyclable'
                                ? 'bg-blue-100 text-blue-800'
                                : selectedCategoryInfo.recyclableStatus === 'Compostable'
                                ? 'bg-emerald-100 text-emerald-800'
                                : selectedCategoryInfo.recyclableStatus === 'Special Handling Required'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-neutral-100 text-neutral-800'
                            }`}
                          >
                            {selectedCategoryInfo.recyclableStatus}
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                          {predictionResult.predicted_class}
                        </h2>
                        {predictionResult.itemName && (
                          <p className="text-xs text-neutral-500 mt-0.5">
                            Specimen type: {predictionResult.itemName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Confidence Score Lockup */}
                    <div className="text-left sm:text-right space-y-1">
                      <div className="text-3xl sm:text-4xl font-extrabold font-mono text-neutral-900">
                        {(predictionResult.confidence * 100).toFixed(1)}%
                      </div>
                      <div
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border inline-block ${
                          getConfidenceLevel(predictionResult.confidence).color
                        }`}
                      >
                        {getConfidenceLevel(predictionResult.confidence).label}
                      </div>
                    </div>
                  </div>

                  {/* Confidence Progress Bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs text-neutral-500 font-medium">
                      <span>Prediction Confidence</span>
                      <span className="font-mono">
                        {(predictionResult.confidence * 100).toFixed(1)} / 100%
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all duration-700"
                        style={{ width: `${predictionResult.confidence * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Top 3 Predictions Bar */}
                  <div className="space-y-2 pt-2 border-t border-neutral-100">
                    <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                      Top 3 Candidates (Softmax Distribution)
                    </h4>
                    <div className="space-y-2">
                      {predictionResult.top_predictions.map((p, idx) => {
                        const pct = Math.round(p.confidence * 1000) / 10;
                        return (
                          <div key={idx} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium text-neutral-700 flex items-center gap-1.5">
                                <span className="font-mono text-neutral-400">0{idx + 1}.</span>
                                <span>{p.category}</span>
                              </span>
                              <span className="font-mono text-neutral-900 font-semibold">
                                {pct.toFixed(1)}%
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  idx === 0
                                    ? 'bg-emerald-600'
                                    : idx === 1
                                    ? 'bg-blue-400'
                                    : 'bg-neutral-400'
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Detected Image Features */}
                  {predictionResult.detected_features && (
                    <div className="pt-2 border-t border-neutral-100 space-y-2">
                      <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                        Detected Visual Characteristics
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {predictionResult.detected_features.map((feat, i) => (
                          <div
                            key={i}
                            className="p-2 bg-neutral-50 rounded-lg text-[11px] text-neutral-600 border border-neutral-100 flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. GRAD-CAM Heatmap Viewer */}
                {previewUrl && (
                  <GradCamViewer
                    imageUrl={previewUrl}
                    category={predictionResult.predicted_class}
                    confidence={predictionResult.confidence}
                  />
                )}

                {/* 3. Dedicated Card: "WHAT SHOULD YOU DO?" (Disposal Guidance) */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
                  <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
                    <Leaf className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-lg font-bold text-neutral-900">
                      WHAT SHOULD YOU DO?
                    </h3>
                    <span className="text-xs text-neutral-400">· Recycling & Segregation Plan</span>
                  </div>

                  {/* Recommended Action Summary Box */}
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                    <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Recommended Disposal Action
                    </span>
                    <p className="text-sm font-medium text-emerald-950 leading-relaxed">
                      {selectedCategoryInfo.disposalMethod}
                    </p>
                  </div>

                  {/* Preparation Steps Checklist */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                      Step-by-Step Preparation Protocol
                    </h4>
                    <ul className="space-y-2">
                      {selectedCategoryInfo.preparationSteps.map((step, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2.5 text-xs text-neutral-700"
                        >
                          <span className="w-4 h-4 rounded-full bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold">
                            {index + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ecological Impact & Decomposition */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-100 text-xs">
                    <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 space-y-1">
                      <span className="font-semibold text-neutral-700">Decomposition Period:</span>
                      <p className="font-mono text-neutral-900 font-medium">
                        {selectedCategoryInfo.decompositionTime}
                      </p>
                    </div>

                    <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 space-y-1">
                      <span className="font-semibold text-neutral-700">Suggested Bin Stream:</span>
                      <p className="text-neutral-900 font-medium">
                        {selectedCategoryInfo.binColorAdvice}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 text-xs text-neutral-600 leading-relaxed">
                    <span className="font-semibold text-neutral-800">Environmental Note: </span>
                    {selectedCategoryInfo.carbonFootprintNote}
                  </div>

                  {/* Mandatory Local Disclaimer */}
                  <div className="flex items-center gap-2 text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                    <Info className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span>
                      Disposal recommendations are provided as general best-practice guidance. <strong>Local recycling rules may differ</strong>; please verify with municipal waste guidelines.
                    </span>
                  </div>

                  {/* Navigation CTA */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      onClick={() => setActiveTab('history')}
                      className="text-xs font-semibold text-neutral-700 hover:text-neutral-900 flex items-center gap-1"
                    >
                      <span>View in Classification History</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs font-medium text-neutral-500 hover:text-neutral-700"
                    >
                      Back to Top ↑
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
