import { useMemo } from 'react';
import { generateOrderBook } from '../data/mockData';

export default function OrderBook({ basePrice, decimals, spread }) {
  const { bids, asks } = useMemo(() => generateOrderBook(basePrice, decimals), [basePrice, decimals]);

  const maxSize = Math.max(...bids.map(b => b.size), ...asks.map(a => a.size));
  const totalBidSize = bids.reduce((s, b) => s + b.size, 0);
  const totalAskSize = asks.reduce((s, a) => s + a.size, 0);
  const bidPct = Math.round((totalBidSize / (totalBidSize + totalAskSize)) * 100);

  const bestBid = bids[0]?.price ?? basePrice;
  const bestAsk = asks[asks.length - 1]?.price ?? basePrice;

  return (
    <div className="flex flex-col" style={{ gap: 1 }}>
      {/* Bid / Ask Summary */}
      <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
        <div className="flex flex-col">
          <span className="text-text-muted" style={{ fontSize: 7 }}>BID</span>
          <span className="text-buy font-bold tabular-nums" style={{ fontSize: 10 }}>{bestBid.toFixed(decimals)}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-text-muted" style={{ fontSize: 7 }}>SPREAD</span>
          <span className="text-accent font-bold tabular-nums" style={{ fontSize: 9 }}>{spread ?? (bestAsk - bestBid).toFixed(decimals)}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-text-muted" style={{ fontSize: 7 }}>ASK</span>
          <span className="text-sell font-bold tabular-nums" style={{ fontSize: 10 }}>{bestAsk.toFixed(decimals)}</span>
        </div>
      </div>
      {/* Bid/Ask ratio bar */}
      <div className="flex rounded-full overflow-hidden" style={{ height: 3, marginBottom: 5 }}>
        <div className="bg-buy" style={{ width: `${bidPct}%` }} />
        <div className="bg-sell" style={{ width: `${100 - bidPct}%` }} />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between text-text-muted" style={{ fontSize: 8, padding: '0 2px', marginBottom: 3 }}>
        <span>Price</span>
        <span>Size</span>
      </div>

      {/* Asks (sells) - reversed so lowest ask is at bottom */}
      {asks.map((ask, i) => (
        <div key={`a-${i}`} className="flex items-center justify-between relative" style={{ padding: '1px 3px', fontSize: 9 }}>
          <div
            className="absolute right-0 top-0 bottom-0 bg-sell/[0.08]"
            style={{ width: `${(ask.size / maxSize) * 100}%` }}
          />
          <span className="text-sell tabular-nums font-medium relative">{ask.price.toFixed(decimals)}</span>
          <span className="text-text-secondary tabular-nums relative">{ask.size.toFixed(2)}</span>
        </div>
      ))}

      {/* Spread / current price */}
      <div className="flex items-center justify-center bg-bg-elevated/50 rounded" style={{ padding: '3px 0', margin: '2px 0' }}>
        <span className="text-accent font-bold tabular-nums" style={{ fontSize: 11 }}>{basePrice.toFixed(decimals)}</span>
      </div>

      {/* Bids (buys) */}
      {bids.map((bid, i) => (
        <div key={`b-${i}`} className="flex items-center justify-between relative" style={{ padding: '1px 3px', fontSize: 9 }}>
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
