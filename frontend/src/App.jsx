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
    <div className="h-screen w-screen bg-neutral-900 text-neutral-100">
      <Controls
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
        onRun={run}
        onReset={reset}
        isLoading={isLoading}
        variables={variables}
        setVariables={setVariables}
      />

      <div className="relative">
        <CanvasBoard
          currentColor={currentColor}
          onReady={onCanvasReady}
          resetSignal={resetSignal}
        />
        <div className="pointer-events-none absolute inset-0">
          <ResultsOverlay results={results} />
        </div>
      </div>

      {error && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded bg-red-600 px-4 py-2 text-white shadow">
          {error}
        </div>
      )}
    </div>
  );
}
