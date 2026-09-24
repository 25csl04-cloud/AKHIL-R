import React, { useState } from 'react';
import { ModelMode } from '../types/waste';
import { Sparkles, Cpu, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  modelMode: ModelMode;
  setModelMode: (mode: ModelMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  modelMode,
  setModelMode
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'analyze', label: 'Analyze Waste' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'history', label: 'History' },
    { id: 'performance', label: 'Model Performance' },
    { id: 'architecture', label: 'Model Info' },
    { id: 'about', label: 'About & Viva' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-lg font-bold tracking-tight text-neutral-900 hover:text-emerald-700 transition-colors flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
          Smart Waste AI
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-600">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`transition-colors whitespace-nowrap py-1 ${
                activeTab === item.id
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                  : 'hover:text-neutral-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Model Mode Switcher & Primary Action */}
        <div className="flex items-center gap-3">
          {/* Mode Switcher */}
          <div className="flex items-center p-0.5 bg-neutral-100 rounded-lg border border-neutral-200 text-xs font-medium">
            <button
              type="button"
              onClick={() => setModelMode('demo')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                modelMode === 'demo'
                  ? 'bg-amber-100 text-amber-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
              title="Demo Mode: Simulated deterministic predictions for testing without requiring local weights."
            >
              <Sparkles className="w-3 h-3 text-amber-700" />
              <span>Demo Mode</span>
            </button>
            <button
              type="button"
              onClick={() => setModelMode('real')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                modelMode === 'real'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
              title="Real AI Mode: TensorFlow / Keras neural inference pipeline."
            >
              <Cpu className="w-3 h-3" />
              <span>Real AI</span>
            </button>
          </div>

          {/* Primary CTA */}
          <button
            onClick={() => setActiveTab('analyze')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors whitespace-nowrap"
          >
            <span>Analyze Waste</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-md hover:bg-neutral-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === item.id
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-neutral-100">
            <button
              onClick={() => {
                setActiveTab('analyze');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg"
            >
              Analyze Waste Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
