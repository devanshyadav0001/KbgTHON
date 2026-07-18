import React from 'react';

export default function RiskChart({ currentScore }) {
  // Normalize score for the chart (0-10 -> pixels 0-100 max)
  // We'll plot Current (Today), 3 Months, 1 Year
  // If score is high (>6), risk goes up sharply over 1 year (e.g. 90% risk of resistant infection).
  // If score is low (<3), risk stays relatively low.
  
  const score = currentScore || 0;
  
  const todayRisk = (score / 10) * 40; // Max 40%
  const month3Risk = score > 5 ? todayRisk + 20 : todayRisk + 5;
  const year1Risk = score > 5 ? Math.min(todayRisk + 50, 95) : todayRisk + 10;
  
  // Chart dimensions
  const w = 300;
  const h = 150;
  
  // Data points: x, y (inverted for SVG where 0 is top)
  const p1 = { x: 20, y: h - (todayRisk / 100) * h };
  const p2 = { x: w / 2, y: h - (month3Risk / 100) * h };
  const p3 = { x: w - 20, y: h - (year1Risk / 100) * h };

  return (
    <div className="w-full bg-surface-container-low rounded-lg p-md border border-outline-variant mt-6">
      <h4 className="text-label-md font-bold text-on-surface mb-4">Projected AMR Risk Trajectory</h4>
      
      <div className="relative w-full overflow-hidden flex justify-center">
        <svg width="100%" height={h + 40} viewBox={`0 0 ${w} ${h + 40}`} className="overflow-visible">
          
          {/* Grid lines */}
          <line x1="0" y1={h} x2={w} y2={h} stroke="currentColor" strokeWidth="1" className="text-outline-variant" />
          <line x1="0" y1={h/2} x2={w} y2={h/2} stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-outline-variant/50" />
          <line x1="0" y1="0" x2={w} y2="0" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-outline-variant/50" />
          
          {/* Y Axis Labels */}
          <text x="0" y={h - 5} fontSize="10" className="fill-on-surface-variant font-label-sm">0%</text>
          <text x="0" y={h/2 - 5} fontSize="10" className="fill-on-surface-variant font-label-sm">50%</text>
          <text x="0" y="10" fontSize="10" className="fill-on-surface-variant font-label-sm">100%</text>

          {/* Area under the curve */}
          <path 
            d={`M ${p1.x} ${h} L ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${p3.x} ${h} Z`}
            fill="url(#riskGradient)"
            opacity="0.5"
          />

          {/* Line */}
          <path 
            d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-error"
          />
          
          {/* Data Points */}
          <circle cx={p1.x} cy={p1.y} r="4" className="fill-error" />
          <circle cx={p2.x} cy={p2.y} r="4" className="fill-error" />
          <circle cx={p3.x} cy={p3.y} r="4" className="fill-error" />

          {/* X Axis Labels */}
          <text x={p1.x} y={h + 20} textAnchor="middle" fontSize="12" className="fill-on-surface-variant font-label-md">Today</text>
          <text x={p2.x} y={h + 20} textAnchor="middle" fontSize="12" className="fill-on-surface-variant font-label-md">3 Mos</text>
          <text x={p3.x} y={h + 20} textAnchor="middle" fontSize="12" className="fill-on-surface-variant font-label-md">1 Year</text>

          {/* Value Labels */}
          <text x={p1.x} y={p1.y - 10} textAnchor="middle" fontSize="12" className="fill-error font-bold">{Math.round(todayRisk)}%</text>
          <text x={p2.x} y={p2.y - 10} textAnchor="middle" fontSize="12" className="fill-error font-bold">{Math.round(month3Risk)}%</text>
          <text x={p3.x} y={p3.y - 10} textAnchor="middle" fontSize="12" className="fill-error font-bold">{Math.round(year1Risk)}%</text>

          {/* Gradient Def */}
          <defs>
            <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-error, #ba1a1a)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--color-error, #ba1a1a)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p className="text-body-sm text-on-surface-variant text-center mt-2 italic">
        * Projected probability of acquiring an antibiotic-resistant infection based on current behaviors.
      </p>
    </div>
  );
}
