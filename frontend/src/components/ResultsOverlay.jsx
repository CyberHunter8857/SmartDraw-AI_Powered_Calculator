import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function ResultsOverlay({ results }) {
  return (
    <div className="pointer-events-none absolute inset-0 w-full h-full">
      {results.map((r, idx) => (
        <ResultCard key={idx} expr={r.expr} result={r.result} x={r.x} y={r.y} />
      ))}
    </div>
  );
}

function ResultCard({ expr, result, x, y }) {
  const nodeRef = useRef(null);
  return (
    <Draggable nodeRef={nodeRef} defaultPosition={{ x: x ?? 40, y: y ?? 40 }}>
      <div ref={nodeRef} className="pointer-events-auto rounded bg-black/70 p-2 text-white shadow">
        <div className="text-xs opacity-80">expr</div>
        <div className="mb-1">{safeMath(expr)}</div>
        <div className="text-xs opacity-80">result</div>
        <div>{safeMath(result)}</div>
      </div>
    </Draggable>
  );
}

function safeMath(s) {
  const text = String(s);
  
  // Check if it's likely a mathematical expression
  const hasMathSymbols = /[+\-*/^=()\[\]{}]/.test(text);
  const isShortExpression = text.length < 50;
  
  // If it looks like math and is short, try to render as LaTeX
  if (hasMathSymbols && isShortExpression) {
    try {
      return <BlockMath math={text} />;
    } catch {
      // Fall through to text rendering
    }
  }
  
  // Render as regular text with proper wrapping
  return (
    <div className="font-mono text-sm break-words leading-relaxed">
      {text}
    </div>
  );
}
