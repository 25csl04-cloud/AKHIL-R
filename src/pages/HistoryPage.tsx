import React, { useState, useMemo } from 'react';
import { ClassificationRecord, WasteCategory } from '../types/waste';
import { deleteHistoryItem, clearAllHistory } from '../services/api';
import { CategoryIcon } from '../components/CategoryIcon';
import {
  History,
  Trash2,
  Search,
  Filter,
  ArrowUpDown,
  Calendar,
  Sparkles,
  Cpu,
  Eye,
  CheckCircle2
} from 'lucide-react';

interface HistoryPageProps {
  records: ClassificationRecord[];
  onRefreshRecords: () => void;
  setActiveTab: (tab: string) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  records,
  onRefreshRecords,
  setActiveTab
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<ClassificationRecord | null>(null);

  const categories = [
    'All',
    'Plastic',
    'Paper',
    'Cardboard',
    'Glass',
    'Metal',
    'Organic Waste',
    'E-Waste',
    'Other / Unknown'
  ];

  const filteredRecords = useMemo(() => {
    return records
      .filter((rec) => {
        const matchesCategory =
          selectedCategory === 'All' || rec.predicted_class === selectedCategory;
        const matchesSearch =
          (rec.item_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          rec.predicted_class.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rec.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        if (sortBy === 'oldest') {
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        }
        if (sortBy === 'highest') {
          return b.confidence - a.confidence;
        }
        if (sortBy === 'lowest') {
          return a.confidence - b.confidence;
        }
        return 0;
      });
  }, [records, selectedCategory, sortBy, searchQuery]);

  const handleDelete = (id: string) => {
    deleteHistoryItem(id);
    onRefreshRecords();
    if (selectedRecord?.id === id) {
      setSelectedRecord(null);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all classification history?')) {
      clearAllHistory();
      onRefreshRecords();
      setSelectedRecord(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            Classification History
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            Search, filter, and inspect past waste specimen inferences stored in local database.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {records.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('analyze')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
          >
            + New Analysis
          </button>
        </div>
      </div>

      {/* CONTROLS: Category Tabs, Search & Sort */}
      <div className="space-y-4">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white font-semibold shadow-xs'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, category, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white text-xs border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <ArrowUpDown className="w-4 h-4 text-neutral-400" />
            <span className="text-xs text-neutral-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-neutral-300 text-xs rounded-lg px-2.5 py-2 text-neutral-700 focus:outline-hidden"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Confidence</option>
              <option value="lowest">Lowest Confidence</option>
            </select>
          </div>
        </div>
      </div>

      {/* RECORD LIST / EMPTY STATE */}
      {filteredRecords.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-neutral-200 shadow-xs text-center space-y-3 max-w-md mx-auto my-8">
          <div className="w-12 h-12 rounded-xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
            <History className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-neutral-900">
            No matching records found
          </h3>
          <p className="text-xs text-neutral-500">
            {records.length === 0
              ? 'Your classification history is currently empty. Run an analysis to store results.'
              : 'Try clearing your search query or selecting a different category filter.'}
          </p>
          {records.length === 0 && (
            <button
              onClick={() => setActiveTab('analyze')}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg"
            >
              Analyze a Specimen Now
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50/75 border-b border-neutral-200 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Specimen</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Confidence</th>
                  <th className="py-3 px-4">Mode</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-xs">
                {filteredRecords.map((rec) => {
                  const pct = Math.round(rec.confidence * 1000) / 10;
                  return (
                    <tr
                      key={rec.id}
                      className="hover:bg-neutral-50/70 transition-colors group"
                    >
                      {/* Specimen Thumbnail + Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                            <img
                              src={rec.image_path}
                              alt={rec.predicted_class}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-neutral-900 truncate max-w-[200px]">
                              {rec.item_name || `${rec.predicted_class} Item`}
                            </div>
                            <div className="text-[10px] font-mono text-neutral-400">
                              ID: {rec.id.slice(0, 12)}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-md bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0">
                            <CategoryIcon category={rec.predicted_class} className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-medium text-neutral-800">
                            {rec.predicted_class}
                          </span>
                        </div>
                      </td>

                      {/* Confidence with Mini Progress */}
                      <td className="py-3 px-4">
                        <div className="space-y-1 max-w-[120px]">
                          <div className="flex justify-between font-mono text-[11px] font-semibold text-neutral-900">
                            <span>{pct.toFixed(1)}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-600 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Mode Badge */}
                      <td className="py-3 px-4">
                        <span
                          className={`text-[11px] font-medium font-mono px-2 py-0.5 rounded ${
                            rec.mode === 'real'
                              ? 'bg-emerald-50 text-emerald-800'
                              : 'bg-amber-50 text-amber-800'
                          }`}
                        >
                          {rec.mode === 'real' ? 'Real AI' : 'Demo'}
                        </span>
                      </td>

                      {/* Date / Time */}
                      <td className="py-3 px-4 font-mono text-neutral-500 whitespace-nowrap text-[11px]">
                        {new Date(rec.created_at).toLocaleDateString()} ·{' '}
                        {new Date(rec.created_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>

                      {/* Delete Action */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDelete(rec.id)}
                          className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                          title="Delete this record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 bg-neutral-50/50 border-t border-neutral-200 text-xs text-neutral-500 flex items-center justify-between font-mono">
            <span>Showing {filteredRecords.length} of {records.length} records</span>
            <span>SQLite Table: classification_history</span>
          </div>
        </div>
      )}
    </div>
  );
};
