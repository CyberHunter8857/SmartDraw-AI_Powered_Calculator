import React from 'react';

const COLORS = [
  '#ffffff',
  '#ff3b30',
  '#34c759',
  '#0a84ff',
  '#ffd60a',
  '#ff9f0a',
  '#e91e63',
  '#a55eea',
  '#00d1b2',
  '#aaaaaa',
];

export default function Controls({
  currentColor,
  setCurrentColor,
  onRun,
  onReset,
  isLoading,
  variables,
  setVariables,
}) {
  const updateVar = (k, v) => setVariables((prev) => ({ ...prev, [k]: v }));
  
  return (
    <div className="flex flex-col sm:flex-row h-auto sm:h-24 w-full items-center justify-between bg-gradient-to-r from-neutral-800 to-neutral-900 px-3 sm:px-6 py-3 sm:py-0 shadow-lg border-b border-neutral-700 gap-3 sm:gap-0">
      {/* Left Section - Color Picker */}
      <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-center sm:justify-start">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <span className="text-xs sm:text-sm font-medium text-neutral-300 tracking-wide whitespace-nowrap">Drawing Color</span>
          <div className="flex gap-1 sm:gap-2 p-1 bg-neutral-700/50 rounded-lg flex-wrap justify-center">
            {COLORS.map((c) => (
              <button
                key={c}
                className={`h-6 w-6 sm:h-8 sm:w-8 rounded-full border-2 border-neutral-600 transition-all duration-200 hover:scale-110 hover:shadow-lg ${
                  currentColor === c 
                    ? 'ring-2 ring-white ring-offset-1 sm:ring-offset-2 ring-offset-neutral-800 shadow-lg' 
                    : 'hover:border-neutral-400'
                }`}
                style={{ background: c }}
                onClick={() => setCurrentColor(c)}
                title={`Select ${c} color`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Section - Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-center sm:justify-end">
        <button
          onClick={onReset}
          className="flex-1 sm:flex-none px-3 sm:px-6 py-2 sm:py-3 rounded-lg bg-neutral-700/80 text-neutral-200 font-medium hover:bg-neutral-600 transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed border border-neutral-600 hover:border-neutral-500 text-sm sm:text-base"
          disabled={isLoading}
          title="Clear canvas and reset variables"
        >
          <span className="flex items-center gap-1 sm:gap-2 justify-center">
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="hidden xs:inline">Reset</span>
            <span className="xs:hidden">R</span>
          </span>
        </button>
        <button
          onClick={onRun}
          className="flex-1 sm:flex-none px-4 sm:px-8 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed border border-indigo-500 hover:border-indigo-400 shadow-md text-sm sm:text-base"
          disabled={isLoading}
          title="Analyze drawing with AI"
        >
          <span className="flex items-center gap-1 sm:gap-2 justify-center">
            {isLoading ? (
              <>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="hidden xs:inline">Processing...</span>
                <span className="xs:hidden">...</span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="hidden xs:inline">Analyze</span>
                <span className="xs:hidden">Go</span>
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
