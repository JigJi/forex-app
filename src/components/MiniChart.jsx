import { useMemo } from 'react';
import { generateMiniChartData } from '../data/mockData';

export default function MiniChart({ positive = true, width = 120, height = 40 }) {
  const data = useMemo(() => generateMiniChartData(), []);
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height * 0.9) - height * 0.05;
      return `${x},${y}`;
    })
    .join(' ');

  const color = positive ? '#0ECB81' : '#F6465D';
  const gradientId = `mini-grad-${positive}-${width}`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill={`url(#${gradientId})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.85"
      />
    </svg>
  );
}
