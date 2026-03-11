import { ArrowUpRight, ArrowDownRight, Target, ShieldAlert, Clock } from 'lucide-react';

export default function SignalCard({ signal }) {
  const isBuy = signal.direction === 'BUY';
  const statusLabel = signal.status === 'active' ? 'Active' : signal.status === 'tp_hit' ? 'TP Hit' : 'SL Hit';
  const statusColor = signal.status === 'active' ? 'text-accent bg-accent/[0.08]' : signal.status === 'tp_hit' ? 'text-buy bg-buy-glow' : 'text-sell bg-sell-glow';

  return (
    <div className="gradient-card rounded-2xl border border-border" style={{ padding: 20 }}>
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
        <div className="flex items-center" style={{ gap: 12 }}>
          <div className={`rounded-xl flex items-center justify-center ${isBuy ? 'bg-buy-glow' : 'bg-sell-glow'}`} style={{ width: 40, height: 40 }}>
            {isBuy
              ? <ArrowUpRight className="text-buy" style={{ width: 20, height: 20 }} />
              : <ArrowDownRight className="text-sell" style={{ width: 20, height: 20 }} />
            }
          </div>
          <div>
            <div className="flex items-center" style={{ gap: 8 }}>
              <span className="text-text-primary text-sm font-bold">{signal.pair}</span>
              <span className={`font-bold rounded ${isBuy ? 'text-buy' : 'text-sell'}`} style={{ fontSize: 11 }}>
                {signal.direction}
              </span>
            </div>
            <div className="flex items-center text-text-muted" style={{ gap: 4, marginTop: 4 }}>
              <Clock style={{ width: 12, height: 12 }} />
              <span style={{ fontSize: 11 }}>{signal.timeAgo}</span>
            </div>
          </div>
        </div>
        <span className={`font-semibold rounded-lg ${statusColor}`} style={{ fontSize: 10, padding: '4px 10px' }}>
          {statusLabel}
        </span>
      </div>

      {/* Price Levels */}
      <div className="grid grid-cols-3 bg-bg-secondary/50 rounded-xl" style={{ gap: 1, padding: 12, marginBottom: 16 }}>
        <div className="text-center">
          <p className="text-text-muted" style={{ fontSize: 10, marginBottom: 4 }}>Entry</p>
          <p className="text-text-primary text-xs font-bold tabular-nums">{signal.entry}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center" style={{ gap: 3, marginBottom: 4 }}>
            <Target className="text-buy" style={{ width: 10, height: 10 }} />
            <p className="text-text-muted" style={{ fontSize: 10 }}>TP</p>
          </div>
          <p className="text-buy text-xs font-bold tabular-nums">{signal.tp}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center" style={{ gap: 3, marginBottom: 4 }}>
            <ShieldAlert className="text-sell" style={{ width: 10, height: 10 }} />
            <p className="text-text-muted" style={{ fontSize: 10 }}>SL</p>
          </div>
          <p className="text-sell text-xs font-bold tabular-nums">{signal.sl}</p>
        </div>
      </div>

      {/* Analyst */}
      <div className="flex items-center justify-between">
        <div className="flex items-center" style={{ gap: 10 }}>
          <div className="rounded-full gradient-gold-subtle flex items-center justify-center border border-accent/10" style={{ width: 28, height: 28 }}>
            <span className="text-accent font-bold" style={{ fontSize: 9 }}>{signal.avatar}</span>
          </div>
          <span className="text-text-secondary text-xs font-medium">{signal.analyst}</span>
        </div>
        <span className="text-text-muted" style={{ fontSize: 11 }}>{signal.winRate}% win rate</span>
      </div>
    </div>
  );
}
