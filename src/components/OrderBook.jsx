import { useMemo } from 'react';
import { generateOrderBook } from '../data/mockData';

export default function OrderBook({ basePrice, decimals }) {
  const { bids, asks } = useMemo(() => generateOrderBook(basePrice, decimals), [basePrice, decimals]);

  const maxSize = Math.max(...bids.map(b => b.size), ...asks.map(a => a.size));

  return (
    <div className="flex flex-col" style={{ gap: 1 }}>
      {/* Header */}
      <div className="flex items-center justify-between text-text-muted" style={{ fontSize: 9, padding: '0 2px', marginBottom: 4 }}>
        <span>Price</span>
        <span>Size (Lots)</span>
      </div>

      {/* Asks (sells) - reversed so lowest ask is at bottom */}
      {asks.map((ask, i) => (
        <div key={`a-${i}`} className="flex items-center justify-between relative" style={{ padding: '2px 4px', fontSize: 11 }}>
          <div
            className="absolute right-0 top-0 bottom-0 bg-sell/[0.08]"
            style={{ width: `${(ask.size / maxSize) * 100}%` }}
          />
          <span className="text-sell tabular-nums font-medium relative">{ask.price.toFixed(decimals)}</span>
          <span className="text-text-secondary tabular-nums relative">{ask.size.toFixed(2)}</span>
        </div>
      ))}

      {/* Spread / current price */}
      <div className="flex items-center justify-center bg-bg-elevated/50 rounded" style={{ padding: '5px 0', margin: '2px 0' }}>
        <span className="text-accent font-bold tabular-nums" style={{ fontSize: 13 }}>{basePrice.toFixed(decimals)}</span>
      </div>

      {/* Bids (buys) */}
      {bids.map((bid, i) => (
        <div key={`b-${i}`} className="flex items-center justify-between relative" style={{ padding: '2px 4px', fontSize: 11 }}>
          <div
            className="absolute right-0 top-0 bottom-0 bg-buy/[0.08]"
            style={{ width: `${(bid.size / maxSize) * 100}%` }}
          />
          <span className="text-buy tabular-nums font-medium relative">{bid.price.toFixed(decimals)}</span>
          <span className="text-text-secondary tabular-nums relative">{bid.size.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}
