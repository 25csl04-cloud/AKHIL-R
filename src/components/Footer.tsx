import React from 'react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="border-t border-neutral-200 bg-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-base font-bold tracking-tight text-neutral-900">
              Smart Waste AI
            </span>
            <p className="text-xs text-neutral-500">
              AI-assisted waste classification and recycling guidance system.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-neutral-600 font-medium">
            <button
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-emerald-700 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => {
                setActiveTab('analyze');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-emerald-700 transition-colors"
            >
              Analyze
            </button>
            <button
              onClick={() => {
                setActiveTab('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-emerald-700 transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                setActiveTab('performance');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-emerald-700 transition-colors"
            >
              Model Performance
            </button>
            <button
              onClick={() => {
                setActiveTab('architecture');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-emerald-700 transition-colors"
            >
              Model Info
            </button>
            <button
              onClick={() => {
                setActiveTab('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-emerald-700 transition-colors"
            >
              About & Viva
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-2">
          <span>College AI/ML Mini-Project Demonstration Edition</span>
          <span>TensorFlow · Keras · FastAPI · React</span>
        </div>
      </div>
    </footer>
  );
};
