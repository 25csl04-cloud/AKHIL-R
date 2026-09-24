import React from 'react';
import { WASTE_CATEGORIES } from '../data/wasteCategories';
import { WasteCategory } from '../types/waste';

interface CategoryDistributionProps {
  distribution: Record<string, number>;
  total: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Plastic': '#3b82f6',
  'Paper': '#06b6d4',
  'Cardboard': '#f59e0b',
  'Glass': '#10b981',
  'Metal': '#64748b',
  'Organic Waste': '#84cc16',
  'E-Waste': '#8b5cf6',
  'Other / Unknown': '#94a3b8'
};

export const CategoryDistributionChart: React.FC<CategoryDistributionProps> = ({
  distribution,
  total
}) => {
  const entries = Object.entries(distribution).sort((a, b) => b[1] - a[1]);

  if (total === 0 || entries.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-sm text-neutral-500">
        No category distribution data available.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Visual horizontal stacked bar */}
      <div className="w-full h-4 rounded-full overflow-hidden flex bg-neutral-100">
        {entries.map(([cat, count]) => {
          const pct = Math.round((count / total) * 100);
          if (pct === 0) return null;
          return (
            <div
              key={cat}
              style={{
                width: `${pct}%`,
                backgroundColor: CATEGORY_COLORS[cat] || '#94a3b8'
              }}
              title={`${cat}: ${count} (${pct}%)`}
              className="h-full transition-all hover:opacity-90"
            />
          );
        })}
      </div>

      {/* Grid of category progress items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {entries.map(([cat, count]) => {
          const pct = Math.round((count / total) * 100);
          const color = CATEGORY_COLORS[cat] || '#94a3b8';
          return (
            <div key={cat} className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-100">
              <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-neutral-800">{cat}</span>
                </div>
                <span className="font-mono text-neutral-600">
                  {count} <span className="text-neutral-400">({pct}%)</span>
                </span>
              </div>
              <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface TimelineProps {
  timeline: { date: string; count: number }[];
}

export const TimelineTrendChart: React.FC<TimelineProps> = ({ timeline }) => {
  const maxCount = Math.max(...timeline.map((t) => t.count), 4);

  return (
    <div className="space-y-4">
      <div className="h-44 flex items-end justify-between gap-2 pt-6 px-2 border-b border-neutral-200">
        {timeline.map((item, idx) => {
          const heightPct = Math.max(8, Math.round((item.count / maxCount) * 100));
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
              {/* Tooltip on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-neutral-900 text-white text-[10px] font-mono px-2 py-0.5 rounded shadow-sm whitespace-nowrap pointer-events-none z-10">
                {item.count} items on {item.date}
              </div>

              {/* Bar */}
              <div className="w-full max-w-[32px] bg-emerald-100 rounded-t-md group-hover:bg-emerald-200 transition-colors flex items-end">
                <div
                  className="w-full bg-emerald-600 rounded-t-md transition-all duration-300 group-hover:bg-emerald-700"
                  style={{ height: `${heightPct}%` }}
                />
              </div>

              {/* Date label */}
              <span className="text-[11px] font-mono text-neutral-500 truncate w-full text-center">
                {item.date}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
        <span>7-Day Activity Window</span>
        <span className="font-mono">Peak: {maxCount} items / day</span>
      </div>
    </div>
  );
};

interface CategoryConfidenceProps {
  categoryConfidence: Record<string, number>;
}

export const CategoryConfidenceChart: React.FC<CategoryConfidenceProps> = ({
  categoryConfidence
}) => {
  const entries = Object.entries(categoryConfidence);

  if (entries.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-sm text-neutral-500">
        No confidence telemetry recorded yet.
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {entries.map(([cat, conf]) => {
        const pct = Math.round(conf * 100);
        return (
          <div key={cat} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-neutral-700">{cat}</span>
              <span className="font-mono text-neutral-900 font-semibold">{pct}%</span>
            </div>
            <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  pct >= 90
                    ? 'bg-emerald-600'
                    : pct >= 70
                    ? 'bg-blue-600'
                    : pct >= 50
                    ? 'bg-amber-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
