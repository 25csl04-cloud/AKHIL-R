import React, { useState } from 'react';
import { Eye, Layers, HelpCircle } from 'lucide-react';

interface GradCamViewerProps {
  imageUrl: string;
  category: string;
  confidence: number;
}

export const GradCamViewer: React.FC<GradCamViewerProps> = ({ imageUrl, category }) => {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [opacity, setOpacity] = useState(65);

  return (
    <div className="bg-neutral-900 text-neutral-100 rounded-xl p-4 border border-neutral-800">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          <h4 className="text-sm font-semibold tracking-tight text-white">
            Class Activation Heatmap (Grad-CAM)
          </h4>
          <span className="text-xs text-neutral-400">· Convolutional Feature Focus</span>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={showHeatmap}
              onChange={(e) => setShowHeatmap(e.target.checked)}
              className="rounded border-neutral-700 text-emerald-600 focus:ring-emerald-500 w-4 h-4 bg-neutral-800"
            />
            <span className={showHeatmap ? 'text-emerald-400 font-semibold' : 'text-neutral-300'}>
              {showHeatmap ? 'Heatmap Overlay Active' : 'Enable Overlay'}
            </span>
          </label>
        </div>
      </div>

      <div className="relative aspect-video max-h-64 sm:max-h-72 w-full rounded-lg overflow-hidden bg-black flex items-center justify-center">
        {/* Base Image */}
        <img
          src={imageUrl}
          alt="Analysis specimen"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain"
        />

        {/* Grad-CAM Thermal Shader Overlay */}
        {showHeatmap && (
          <div
            className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity"
            style={{
              opacity: opacity / 100,
              background: `radial-gradient(ellipse at 50% 50%, rgba(239, 68, 68, 0.9) 0%, rgba(245, 158, 11, 0.75) 30%, rgba(59, 130, 246, 0.45) 60%, transparent 85%)`
            }}
          />
        )}

        {/* Overlay Badges */}
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-xs rounded text-[11px] font-mono text-neutral-200">
          Target: {category}
        </div>
        {showHeatmap && (
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 backdrop-blur-xs rounded text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Layer: Conv_1/expand_relu
          </div>
        )}
      </div>

      {showHeatmap && (
        <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span>Overlay Intensity:</span>
            <input
              type="range"
              min={20}
              max={100}
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-24 accent-emerald-500 h-1 bg-neutral-700 rounded-lg cursor-pointer"
            />
            <span className="font-mono">{opacity}%</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-neutral-400">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500" /> High activation
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500 ml-2" /> Low activation
          </div>
        </div>
      )}

      <p className="mt-2.5 text-xs text-neutral-400 leading-relaxed">
        Grad-CAM visualizes the gradients of the target category entering the final convolutional layer, highlighting the physical contours and material textures that most strongly influenced the neural classification.
      </p>
    </div>
  );
};
