import React, { useState } from 'react';
import { ClassificationRecord } from '../types/waste';
import {
  getCalculatedStatistics,
  loadDemoSeeds,
  clearDemoSeeds
} from '../services/api';
import {
  CategoryDistributionChart,
  TimelineTrendChart,
  CategoryConfidenceChart
} from '../components/DashboardCharts';
import {
  BarChart3,
  TrendingUp,
  Recycle,
  AlertTriangle,
  Award,
  Layers,
  Sparkles,
  Trash2,
  ArrowRight,
  Database
} from 'lucide-react';

interface DashboardPageProps {
  records: ClassificationRecord[];
  onRefreshRecords: () => void;
  setActiveTab: (tab: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  records,
  onRefreshRecords,
  setActiveTab
}) => {
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const stats = getCalculatedStatistics(records);

  const handleLoadDemo = () => {
    loadDemoSeeds();
    onRefreshRecords();
    setActionFeedback('Pre-loaded 8 sample test records into analytics.');
    setTimeout(() => setActionFeedback(null), 3500);
  };

  const handleClearDemo = () => {
    clearDemoSeeds();
    onRefreshRecords();
    setActionFeedback('Cleared demo test records from active dataset.');
    setTimeout(() => setActionFeedback(null), 3500);
  };

  const demoRecordsCount = records.filter((r) => r.is_demo_seed).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header and Action Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            Waste Analytics & Metrics Dashboard
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            Real-time telemetry aggregated from optical classifications, recycling divergency, and confidence distributions.
          </p>
        </div>

        {/* Demo Data Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleLoadDemo}
            className="px-3 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Load Demo Data</span>
          </button>

          {demoRecordsCount > 0 && (
            <button
              onClick={handleClearDemo}
              className="px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Demo Data ({demoRecordsCount})</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('analyze')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
          >
            + Analyze New Image
          </button>
        </div>
      </div>

      {/* Action Toast Feedback */}
      {actionFeedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between animate-fade-in">
          <span>{actionFeedback}</span>
          <button
            onClick={() => setActionFeedback(null)}
            className="text-emerald-700 font-bold ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* EMPTY STATE */}
      {records.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-neutral-200 shadow-xs text-center space-y-4 max-w-lg mx-auto my-12">
          <div className="w-16 h-16 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
            <BarChart3 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-neutral-900">
              No analysis data yet
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Upload your first waste image to start gathering data, or click "Load Demo Data" above to preview analytics charts.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('analyze')}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg"
            >
              Analyze First Specimen
            </button>
            <button
              onClick={handleLoadDemo}
              className="px-4 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg"
            >
              Load Demo Records
            </button>
          </div>
        </div>
      ) : (
        /* POPULATED METRICS & CHARTS */
        <div className="space-y-8">
          {/* STATS METRIC CARDS ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* 1. Total Images Analyzed */}
            <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Total Images Analyzed</span>
                <Layers className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-900">
                {stats.total}
              </div>
              <p className="text-[11px] text-neutral-400">
                {demoRecordsCount > 0 ? `${demoRecordsCount} demo / ${stats.total - demoRecordsCount} user` : 'Real test records'}
              </p>
            </div>

            {/* 2. Recyclable Items */}
            <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Recyclable Items</span>
                <Recycle className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-700">
                {stats.recyclable}
              </div>
              <p className="text-[11px] text-neutral-400">
                {Math.round((stats.recyclable / stats.total) * 100)}% of total volume
              </p>
            </div>

            {/* 3. Non-Recyclable / Special */}
            <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Special / Non-Recyclable</span>
                <AlertTriangle className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-700">
                {stats.specialHandling + stats.nonRecyclable}
              </div>
              <p className="text-[11px] text-neutral-400">
                E-Waste & residual streams
              </p>
            </div>

            {/* 4. Most Common Waste Type */}
            <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Dominant Waste Type</span>
                <Award className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-neutral-900 truncate">
                {stats.mostCommon}
              </div>
              <p className="text-[11px] text-neutral-400">
                Highest frequency stream
              </p>
            </div>

            {/* 5. Average Confidence */}
            <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Average Confidence</span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-700">
                {stats.avgConfidence}%
              </div>
              <p className="text-[11px] text-neutral-400">
                Mean neural activation
              </p>
            </div>
          </div>

          {/* CHARTS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Chart 1: Category Distribution */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">
                    Waste Category Distribution
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Breakdown of items sorted across 8 material streams
                  </p>
                </div>
                <span className="text-xs font-mono text-neutral-500">
                  {Object.keys(stats.categoryDistribution).length} Active Classes
                </span>
              </div>
              <CategoryDistributionChart
                distribution={stats.categoryDistribution}
                total={stats.total}
              />
            </div>

            {/* Chart 2: Timeline Activity Trend */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">
                    Analysis Count Over Time
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Daily classification volume over the last 7 days
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Active
                </span>
              </div>
              <TimelineTrendChart timeline={stats.timeline} />
            </div>

            {/* Chart 3: Average Confidence by Category */}
            <div className="lg:col-span-12 bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">
                    Average Prediction Confidence by Waste Category
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Mean model certainty across individual class distributions
                  </p>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  Scale: 0% to 100%
                </span>
              </div>
              <CategoryConfidenceChart
                categoryConfidence={stats.categoryConfidence}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
