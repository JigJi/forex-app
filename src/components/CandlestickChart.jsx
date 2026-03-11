import { useMemo } from 'react';
import { generateCandlestickData } from '../data/mockData';

export default function CandlestickChart() {
  const data = useMemo(() => generateCandlestickData(), []);
  const width = 340;
  const height = 220;
  const padding = { top: 10, right: 10, bottom: 10, left: 10 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const allPrices = data.flatMap((d) => [d.high, d.low]);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const priceRange = maxPrice - minPrice || 0.001;

  const candleWidth = chartW / data.length;
  const bodyWidth = candleWidth * 0.55;

  const scaleY = (price) =>
    padding.top + chartH - ((price - minPrice) / priceRange) * chartH;

  const bullColor = '#0ECB81';
  const bearColor = '#F6465D';
  const accentColor = '#FFD866';

  return (
    <svg width={width} height={height} className="w-full" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        {/* Subtle grid gradient */}
        <linearGradient id="gridFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.04" />
          <stop offset="100%" stopColor="white" stopOpacity="0.01" />
        </linearGradient>
        {/* Price line glow */}
        <filter id="priceGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((pct) => (
        <line
          key={pct}
          x1={padding.left}
          y1={padding.top + chartH * pct}
          x2={width - padding.right}
          y2={padding.top + chartH * pct}
          stroke="white"
          strokeOpacity="0.04"
          strokeWidth="0.5"
        />
      ))}

      {data.map((candle, i) => {
        const x = padding.left + i * candleWidth + candleWidth / 2;
        const isBullish = candle.close >= candle.open;
        const color = isBullish ? bullColor : bearColor;
        const bodyTop = scaleY(Math.max(candle.open, candle.close));
        const bodyBottom = scaleY(Math.min(candle.open, candle.close));
        const bodyHeight = Math.max(bodyBottom - bodyTop, 1);

        return (
          <g key={i}>
            {/* Wick */}
            <line
              x1={x}
              y1={scaleY(candle.high)}
              x2={x}
              y2={scaleY(candle.low)}
              stroke={color}
              strokeWidth="0.8"
              strokeOpacity="0.7"
            />
            {/* Body */}
            <rect
              x={x - bodyWidth / 2}
              y={bodyTop}
              width={bodyWidth}
              height={bodyHeight}
              fill={color}
              rx="0.5"
              fillOpacity="0.9"
            />
          </g>
        );
      })}

      {/* Current price line with glow */}
      {data.length > 0 && (
        <>
          <line
            x1={padding.left}
            y1={scaleY(data[data.length - 1].close)}
            x2={width - padding.right}
            y2={scaleY(data[data.length - 1].close)}
            stroke={accentColor}
            strokeWidth="0.5"
            strokeDasharray="4 3"
            strokeOpacity="0.6"
            filter="url(#priceGlow)"
          />
          <rect
            x={width - padding.right - 52}
            y={scaleY(data[data.length - 1].close) - 10}
            width="52"
            height="20"
            fill={accentColor}
            rx="4"
          />
          <text
            x={width - padding.right - 26}
            y={scaleY(data[data.length - 1].close) + 4}
            textAnchor="middle"
            fill="#0B0E11"
            fontSize="9"
            fontWeight="700"
            fontFamily="Inter, system-ui, sans-serif"
          >
            {data[data.length - 1].close.toFixed(4)}
          </text>
        </>
      )}
    </svg>
  );
}
