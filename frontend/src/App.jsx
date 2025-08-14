import React, { useRef, useState } from 'react';
import CanvasBoard from './components/CanvasBoard.jsx';
import Controls from './components/Controls.jsx';
import ResultsOverlay from './components/ResultsOverlay.jsx';
import { calculate } from './api.js';

export default function App() {
  const [currentColor, setCurrentColor] = useState('#ffffff');
  const [variables, setVariables] = useState({});
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resetSignal, setResetSignal] = useState(0);
  const canvasRef = useRef(null);

  const onCanvasReady = (canvas) => (canvasRef.current = canvas);

  const run = async () => {
    if (!canvasRef.current) return;
    setIsLoading(true);
    setError(null);
    try {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      const resp = await calculate(dataUrl, variables);

      if (!resp.ok) throw new Error(resp.error || 'Unknown error');
      const arr = Array.isArray(resp.data) ? resp.data : [];

      // If response includes assignments, merge into variables
      const nextVars = { ...variables };
      arr.forEach((item) => {
        if (item.assign && item.expr && item.result != null) {
          nextVars[String(item.expr)] = String(item.result);
        }
      });
      setVariables(nextVars);

      // Seed initial positions (top-left corner cluster)
      const positioned = arr.map((r, i) => ({
        ...r,
        x: 40 + i * 20,
        y: 40 + i * 20,
      }));
      setResults(positioned);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setVariables({});
    setResults([]);
    setError(null);
    setResetSignal((v) => v + 1);
  };

  return (
    <div className="h-screen w-screen bg-neutral-900 text-neutral-100 overflow-hidden">
      <Controls
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
        onRun={run}
        onReset={reset}
        isLoading={isLoading}
        variables={variables}
        setVariables={setVariables}
      />

      <div className="relative flex-1">
        <CanvasBoard
          currentColor={currentColor}
          onReady={onCanvasReady}
          resetSignal={resetSignal}
        />
        <div className="pointer-events-none absolute inset-0">
          <ResultsOverlay results={results} />
        </div>
      </div>

      {/* Mobile-friendly loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-neutral-800 rounded-lg p-6 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white text-lg font-medium">Processing your drawing...</p>
            <p className="text-neutral-400 text-sm mt-2">This may take a few seconds</p>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 rounded bg-red-600 px-4 py-2 text-white shadow text-sm sm:text-base text-center z-40">
          {error}
        </div>
      )}
    </div>
  );
}
