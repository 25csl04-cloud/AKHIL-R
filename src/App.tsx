/**
 * Smart Waste AI - Main Application Entry Point
 * An AI-Based Waste Image Classification and Recycling Assistant
 */

import React, { useState, useEffect } from 'react';
import { ModelMode, ClassificationRecord } from './types/waste';
import { SAMPLE_WASTE_ITEMS } from './data/wasteCategories';
import { getLocalHistory, getSavedMode, setSavedMode } from './services/api';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AnalyzePage } from './pages/AnalyzePage';
import { DashboardPage } from './pages/DashboardPage';
import { HistoryPage } from './pages/HistoryPage';
import { ModelPerformancePage } from './pages/ModelPerformancePage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [modelMode, setModelModeState] = useState<ModelMode>('demo');
  const [records, setRecords] = useState<ClassificationRecord[]>([]);
  const [selectedSample, setSelectedSample] = useState<typeof SAMPLE_WASTE_ITEMS[0] | null>(null);

  // Initialize on mount
  useEffect(() => {
    const savedMode = getSavedMode();
    setModelModeState(savedMode);
    const history = getLocalHistory();
    setRecords(history);
  }, []);

  const handleSetModelMode = (mode: ModelMode) => {
    setModelModeState(mode);
    setSavedMode(mode);
  };

  const handleRefreshRecords = () => {
    const updated = getLocalHistory();
    setRecords(updated);
  };

  const handleSelectSample = (sample: typeof SAMPLE_WASTE_ITEMS[0]) => {
    setSelectedSample(sample);
    setActiveTab('analyze');
  };

  const handleClearSample = () => {
    setSelectedSample(null);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50/50 text-neutral-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* 3-Zone Global Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        modelMode={modelMode}
        setModelMode={handleSetModelMode}
      />

      {/* Main Routed Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={handleTabChange}
            onSelectSampleItem={handleSelectSample}
          />
        )}

        {activeTab === 'analyze' && (
          <AnalyzePage
            modelMode={modelMode}
            selectedSample={selectedSample}
            onClearSample={handleClearSample}
            onAnalysisComplete={() => handleRefreshRecords()}
            setActiveTab={handleTabChange}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardPage
            records={records}
            onRefreshRecords={handleRefreshRecords}
            setActiveTab={handleTabChange}
          />
        )}

        {activeTab === 'history' && (
          <HistoryPage
            records={records}
            onRefreshRecords={handleRefreshRecords}
            setActiveTab={handleTabChange}
          />
        )}

        {activeTab === 'performance' && <ModelPerformancePage />}

        {activeTab === 'architecture' && <ArchitecturePage />}

        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Global Minimal Footer */}
      <Footer setActiveTab={handleTabChange} />
    </div>
  );
}
