import { Wallet, TrendingUp, TrendingDown, Eye, EyeOff, Bell, ArrowUpRight, ArrowDownRight, LayoutDashboard, FolderOpen, BarChart3, Target, Clock, Award } from 'lucide-react';
import { useState } from 'react';
import { walletData, openPositions, weeklyPerformance, forexPairs } from '../data/mockData';

export default function HomeScreen({ onNavigate, onOpenAlerts }) {
  const [showBalance, setShowBalance] = useState(true);

  // Build sparkline SVG path from weekly P/L data
  const plData = weeklyPerformance.plData;
  const maxPL = Math.max(...plData);
  const minPL = Math.min(...plData);
  const range = maxPL - minPL || 1;
  const chartW = 260;
  const chartH = 50;
  const points = plData.map((v, i) => {
    const x = (i / (plData.length - 1)) * chartW;
    const y = chartH - ((v - minPL) / range) * (chartH - 4) - 2;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="h-full bg-bg-primary flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between glass-strong shrink-0" style={{ padding: '12px 16px' }}>
        <div className="flex items-center" style={{ gap: 8 }}>
          <LayoutDashboard className="text-accent" style={{ width: 18, height: 18 }} />
          <h2 className="text-text-primary font-bold" style={{ fontSize: 16 }}>Dashboard</h2>
        </div>
        <button onClick={onOpenAlerts} className="relative rounded-lg bg-bg-card border border-border flex items-center justify-center hover:border-border-hover transition-colors" style={{ width: 36, height: 36 }}>
          <Bell className="text-text-secondary" style={{ width: 16, height: 16 }} />
          <div className="absolute rounded-full bg-accent shadow-[0_0_6px_rgba(255,216,102,0.5)]" style={{ top: 7, right: 7, width: 7, height: 7 }} />
        </button>
      </div>



      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scroll" style={{ padding: '12px 16px 32px' }}>

        {/* Balance Card */}
        <div className="gradient-hero rounded-2xl border border-border relative overflow-hidden" style={{ padding: '16px 16px', marginBottom: 14 }}>
          <div className="absolute bg-accent/[0.03] rounded-full blur-2xl pointer-events-none" style={{ top: -64, right: -64, width: 128, height: 128 }} />

          <div className="flex items-center justify-between relative" style={{ marginBottom: 14 }}>
            <div className="flex items-center" style={{ gap: 8 }}>
              <div className="rounded-lg gradient-gold-subtle flex items-center justify-center border border-accent/10" style={{ width: 30, height: 30 }}>
                <Wallet className="text-accent" style={{ width: 14, height: 14 }} />
              </div>
              <span className="text-text-muted text-xs font-medium">Total Balance</span>
            </div>
            <button onClick={() => setShowBalance(!showBalance)} className="text-text-muted hover:text-text-secondary transition-colors" style={{ padding: 6 }}>
              {showBalance ? <Eye style={{ width: 16, height: 16 }} /> : <EyeOff style={{ width: 16, height: 16 }} />}
            </button>
          </div>

          <h1 className="text-text-primary font-bold tracking-tight relative" style={{ fontSize: 26, marginBottom: 8 }}>
            {showBalance ? `$${walletData.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••••'}
          </h1>

          <div className="flex items-center relative" style={{ gap: 10, marginBottom: 16 }}>
            <div className={`flex items-center rounded-lg ${walletData.todayPL >= 0 ? 'bg-buy-glow' : 'bg-sell-glow'}`} style={{ gap: 6, padding: '4px 10px' }}>
              {walletData.todayPL >= 0 ? <TrendingUp className="text-buy" style={{ width: 14, height: 14 }} /> : <TrendingDown className="text-sell" style={{ width: 14, height: 14 }} />}
              <span className={`text-xs font-semibold ${walletData.todayPL >= 0 ? 'text-buy' : 'text-sell'}`}>
                {walletData.todayPL >= 0 ? '+' : ''}${walletData.todayPL.toFixed(2)}
              </span>
            </div>
            <span className="text-text-muted text-xs">today</span>
          </div>

          <div className="grid grid-cols-3 border-t border-border/40 relative" style={{ gap: 12, paddingTop: 14 }}>
            {[
              { label: 'Equity', value: showBalance ? `$${walletData.equity.toLocaleString()}` : '••••' },
              { label: 'Free Margin', value: showBalance ? `$${walletData.freeMargin.toLocaleString()}` : '••••' },
              { label: 'Open Pos.', value: walletData.openPositions },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-text-muted" style={{ fontSize: 11, marginBottom: 6 }}>{item.label}</p>
                <p className="text-text-primary text-sm font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div style={{ marginBottom: 14 }}>
          <div className="flex items-center" style={{ gap: 6, marginBottom: 12 }}>
            <FolderOpen className="text-accent" style={{ width: 15, height: 15 }} />
            <span className="text-text-primary font-bold" style={{ fontSize: 13 }}>Open Positions</span>
          </div>
          <div className="gradient-card rounded-xl border border-border overflow-hidden">
            {openPositions.map((pos, i) => {
              const pairData = forexPairs.find((p) => p.pair === pos.pair);
              const spreadCost = pairData ? pairData.spread * pos.lots * 10 : 0;
              const commission = pos.lots * 7;
              const totalFee = spreadCost + commission;
              const netPL = pos.pl - totalFee;
              const margin = pairData ? pairData.price * pos.lots * 100000 / 100 : 0;
              const netPct = margin > 0 ? (netPL / margin) * 100 : 0;
              return (
                <div
                  key={i}
                  className={`${i < openPositions.length - 1 ? 'border-b border-border/40' : ''}`}
                  style={{ padding: '10px 12px' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center" style={{ gap: 10 }}>
                      <div className={`rounded-lg flex items-center justify-center ${pos.type === 'BUY' ? 'bg-buy-glow' : 'bg-sell-glow'}`} style={{ width: 30, height: 30 }}>
                        {pos.type === 'BUY'
                          ? <ArrowUpRight className="text-buy" style={{ width: 14, height: 14 }} />
                          : <ArrowDownRight className="text-sell" style={{ width: 14, height: 14 }} />
                        }
                      </div>
                      <div>
                        <p className="text-text-primary font-semibold" style={{ fontSize: 12 }}>{pos.pair}</p>
                        <p className="text-text-muted" style={{ fontSize: 10, marginTop: 2 }}>{pos.type} · {pos.lots} lots</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold tabular-nums ${pos.pl >= 0 ? 'text-buy' : 'text-sell'}`} style={{ fontSize: 12 }}>
                        {pos.pl >= 0 ? '+' : ''}${pos.pl.toFixed(2)}
                      </p>
                      <p className="text-text-muted" style={{ fontSize: 10, marginTop: 1 }}>{pos.currentPrice}</p>
                    </div>
                  </div>
                  {/* Net P/L after fees */}
                  <div className="flex items-center justify-between bg-bg-elevated/50 rounded-lg" style={{ padding: '6px 8px', marginTop: 6 }}>
                    <div className="flex items-center" style={{ gap: 8 }}>
                      <span className="text-text-muted" style={{ fontSize: 8 }}>Net after fees</span>
                      <span className={`font-bold tabular-nums ${netPL >= 0 ? 'text-buy' : 'text-sell'}`} style={{ fontSize: 10 }}>
                        {netPL >= 0 ? '+' : ''}${netPL.toFixed(2)}
                      </span>
                      <span className={`tabular-nums ${netPL >= 0 ? 'text-buy' : 'text-sell'}`} style={{ fontSize: 8 }}>
                        ({netPct >= 0 ? '+' : ''}{netPct.toFixed(2)}%)
                      </span>
                    </div>
                    <button
                      onClick={() => {}}
                      className={`rounded font-semibold text-white transition-all active:scale-95 ${netPL >= 0 ? 'bg-buy' : 'bg-sell'}`}
                      style={{ padding: '3px 10px', fontSize: 8 }}
                    >
                      Close
                    </button>
                  </div>
                  <div className="flex items-center" style={{ gap: 8, marginTop: 3 }}>
                    <span className="text-text-muted" style={{ fontSize: 7 }}>Spread: -${spreadCost.toFixed(2)}</span>
                    <span className="text-text-muted" style={{ fontSize: 7 }}>Comm: -${commission.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Performance */}
        <div style={{ marginBottom: 14 }}>
          <div className="flex items-center" style={{ gap: 6, marginBottom: 12 }}>
            <BarChart3 className="text-accent" style={{ width: 15, height: 15 }} />
            <span className="text-text-primary font-bold" style={{ fontSize: 13 }}>Weekly Performance</span>
          </div>
          <div className="gradient-card rounded-xl border border-border" style={{ padding: '12px 14px' }}>
            {/* Sparkline */}
            <div className="flex items-center justify-center" style={{ marginBottom: 12 }}>
              <svg width={chartW} height={chartH} viewBox={`0 0 ${chartW} ${chartH}`}>
                <defs>
                  <linearGradient id="plGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ECB81" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0ECB81" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon
                  points={`0,${chartH} ${points} ${chartW},${chartH}`}
                  fill="url(#plGrad)"
                />
                <polyline
                  points={points}
                  fill="none"
                  stroke="#0ECB81"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {/* Day labels */}
            <div className="flex justify-between" style={{ marginBottom: 12, padding: '0 2px' }}>
              {weeklyPerformance.days.map((d) => (
                <span key={d} className="text-text-muted" style={{ fontSize: 9 }}>{d}</span>
              ))}
            </div>
            {/* Stats row */}
            <div className="grid grid-cols-3 border-t border-border/40" style={{ paddingTop: 10, gap: 8 }}>
              <div className="text-center">
                <p className="text-text-muted" style={{ fontSize: 10, marginBottom: 4 }}>Trades</p>
                <p className="text-text-primary font-bold" style={{ fontSize: 13 }}>{weeklyPerformance.totalTrades}</p>
              </div>
              <div className="text-center">
                <p className="text-text-muted" style={{ fontSize: 10, marginBottom: 4 }}>Win Rate</p>
                <p className="text-buy font-bold" style={{ fontSize: 13 }}>{weeklyPerformance.winRate}%</p>
              </div>
              <div className="text-center">
                <p className="text-text-muted" style={{ fontSize: 10, marginBottom: 4 }}>Weekly P/L</p>
                <p className="text-buy font-bold" style={{ fontSize: 13 }}>+${weeklyPerformance.weeklyPL.toFixed(0)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Stats */}
        <div style={{ marginBottom: 14 }}>
          <div className="flex items-center" style={{ gap: 6, marginBottom: 12 }}>
            <Award className="text-accent" style={{ width: 15, height: 15 }} />
            <span className="text-text-primary font-bold" style={{ fontSize: 13 }}>Account Stats</span>
          </div>
          <div className="grid grid-cols-2" style={{ gap: 8 }}>
            {[
              { icon: BarChart3, label: 'Total Trades', value: '142', color: 'text-text-primary' },
              { icon: Target, label: 'Win Rate', value: '68%', color: 'text-buy' },
              { icon: Award, label: 'Best Pair', value: 'GBP/USD', color: 'text-accent' },
              { icon: Clock, label: 'Avg Holding', value: '4h 30m', color: 'text-text-primary' },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="gradient-card rounded-xl border border-border" style={{ padding: '10px 12px' }}>
                  <div className="flex items-center" style={{ gap: 6, marginBottom: 8 }}>
                    <Icon className="text-text-muted" style={{ width: 12, height: 12 }} />
                    <p className="text-text-muted" style={{ fontSize: 10 }}>{stat.label}</p>
                  </div>
                  <span className={`font-bold ${stat.color}`} style={{ fontSize: 15 }}>{stat.value}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
