import { useMemo } from 'react';
import { generateRecentTrades } from '../data/mockData';

export default function RecentTrades({ basePrice, decimals }) {
  const trades = useMemo(() => generateRecentTrades(basePrice, decimals), [basePrice, decimals]);

  return (
    <div className="flex flex-col" style={{ gap: 1 }}>
      {/* Header */}
      <div className="flex items-center justify-between text-text-muted" style={{ fontSize: 9, padding: '0 2px', marginBottom: 4 }}>
        <span>Price</span>
        <span>Size</span>
        <span>Time</span>
      </div>

      {trades.map((trade, i) => (
        <div key={i} className="flex items-center justify-between" style={{ padding: '2px 4px', fontSize: 11 }}>
          <span className={`tabular-nums font-medium ${trade.side === 'buy' ? 'text-buy' : 'text-sell'}`}>
            {trade.price.toFixed(decimals)}
          </span>
          <span className="text-text-secondary tabular-nums">{trade.size.toFixed(2)}</span>
          <span className="text-text-muted tabular-nums" style={{ fontSize: 10 }}>{trade.time}</span>
        </div>
      ))}
    </div>
  );
}
