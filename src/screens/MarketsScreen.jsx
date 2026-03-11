import { useState } from 'react';
import { Search, Star, TrendingUp, Users, ArrowUpRight, ArrowDownRight, Copy, Globe, BarChart3, ChevronRight, Gauge, X } from 'lucide-react';
import { forexPairs, copyTraders, topMovers, marketSessions, currencyStrength } from '../data/mockData';
import MiniChart from '../components/MiniChart';
import SentimentBar from '../components/SentimentBar';

export default function MarketsScreen({ onNavigate }) {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');
  const [favorites, setFavorites] = useState(['EUR/USD', 'GBP/USD']);
  const [expandedSection, setExpandedSection] = useState(null);

  const filteredPairs = forexPairs.filter((pair) =>
    pair.pair.toLowerCase().includes(search.toLowerCase())
  );

  const displayPairs = tab === 'favorites'
    ? filteredPairs.filter((p) => favorites.includes(p.pair))
    : filteredPairs;

  const toggleFavorite = (pair) => {
    setFavorites((prev) =>
      prev.includes(pair) ? prev.filter((p) => p !== pair) : [...prev, pair]
    );
  };

  return (
    <div className="h-full bg-bg-primary flex flex-col relative">
      {/* Header */}
      <div className="glass-strong shrink-0" style={{ padding: '12px 16px' }}>
        <div className="flex items-center" style={{ gap: 8 }}>
          <BarChart3 className="text-accent" style={{ width: 18, height: 18 }} />
          <h2 className="text-text-primary font-bold" style={{ fontSize: 16 }}>Markets</h2>
        </div>
      </div>

      {/* Market Hours Bar */}
      <div className="shrink-0 flex items-center border-b border-border" style={{ padding: '6px 16px', gap: 6 }}>
        <Globe className="text-text-muted" style={{ width: 11, height: 11 }} />
        <div className="flex items-center" style={{ gap: 10 }}>
          {marketSessions.map((s) => (
            <div key={s.name} className="flex items-center" style={{ gap: 3 }}>
              <span style={{ fontSize: 11 }}>{s.flag}</span>
              <span className={`font-medium ${s.active ? 'text-buy' : 'text-text-muted'}`} style={{ fontSize: 9 }}>{s.name}</span>
              {s.active && <div className="rounded-full bg-buy animate-pulse" style={{ width: 4, height: 4 }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scroll" style={{ padding: '12px 16px 32px' }}>

        {/* Top Movers — horizontal scroll */}
        <div style={{ marginBottom: 14 }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
            <div className="flex items-center" style={{ gap: 8 }}>
              <TrendingUp className="text-accent" style={{ width: 15, height: 15 }} />
              <h3 className="text-text-primary font-bold" style={{ fontSize: 13 }}>Top Movers</h3>
              <span className="text-text-muted" style={{ fontSize: 10 }}>{topMovers.length} pairs</span>
            </div>
            <button onClick={() => setExpandedSection('movers')} className="flex items-center text-accent font-semibold hover:text-accent-dark transition-colors" style={{ fontSize: 11, gap: 2 }}>
              All <ChevronRight style={{ width: 13, height: 13 }} />
            </button>
          </div>
          <div className="flex overflow-x-auto custom-scroll" style={{ gap: 8, marginLeft: -16, marginRight: -16, paddingLeft: 16, paddingRight: 16 }}>
            {topMovers.map((m) => {
              const isUp = m.change > 0;
              return (
                <div key={m.pair} className="gradient-card rounded-xl border border-border shrink-0 flex items-center" style={{ width: 200, padding: '8px 10px', gap: 10 }}>
                  <div className={`rounded-lg flex items-center justify-center shrink-0 ${isUp ? 'bg-buy-glow' : 'bg-sell-glow'}`} style={{ width: 30, height: 30 }}>
                    {isUp ? <ArrowUpRight className="text-buy" style={{ width: 14, height: 14 }} /> : <ArrowDownRight className="text-sell" style={{ width: 14, height: 14 }} />}
                  </div>
                  <div className="flex-1" style={{ minWidth: 0 }}>
                    <span className="text-text-primary font-bold" style={{ fontSize: 11 }}>{m.pair}</span>
                    <div className="flex items-center" style={{ gap: 6, marginTop: 1 }}>
                      <span className="text-text-secondary tabular-nums font-medium" style={{ fontSize: 9 }}>
                        {m.price > 100 ? m.price.toFixed(2) : m.price.toFixed(4)}
                      </span>
                      <span className={`font-bold tabular-nums ${isUp ? 'text-buy' : 'text-sell'}`} style={{ fontSize: 9 }}>
                        {isUp ? '+' : ''}{m.change}%
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <MiniChart positive={isUp} width={48} height={24} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Currency Strength — horizontal scroll ── */}
        <div style={{ marginBottom: 14 }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
            <div className="flex items-center" style={{ gap: 8 }}>
              <Gauge className="text-accent" style={{ width: 15, height: 15 }} />
              <h3 className="text-text-primary font-bold" style={{ fontSize: 13 }}>Currency Strength</h3>
              <span className="text-text-muted" style={{ fontSize: 10 }}>Today</span>
            </div>
            <button onClick={() => setExpandedSection('strength')} className="flex items-center text-accent font-semibold hover:text-accent-dark transition-colors" style={{ fontSize: 11, gap: 2 }}>
              All <ChevronRight style={{ width: 13, height: 13 }} />
            </button>
          </div>
          <div className="flex overflow-x-auto custom-scroll" style={{ gap: 8, marginLeft: -16, marginRight: -16, paddingLeft: 16, paddingRight: 16 }}>
            {currencyStrength.map((c) => {
              const isPositive = c.change > 0;
              const barColor = c.strength >= 60 ? 'bg-buy' : c.strength >= 40 ? 'bg-accent' : 'bg-sell';
              return (
                <div key={c.currency} className="gradient-card rounded-xl border border-border shrink-0 flex items-center" style={{ width: 140, padding: '7px 10px', gap: 8 }}>
                  <img src={c.flagImg} alt={c.currency} className="rounded-sm shrink-0" style={{ width: 20, height: 14, objectFit: 'cover' }} loading="lazy" />
                  <div className="flex-1" style={{ minWidth: 0 }}>
                    <div className="flex items-center justify-between" style={{ marginBottom: 3 }}>
                      <span className="text-text-primary font-bold" style={{ fontSize: 10 }}>{c.currency}</span>
                      <span className="text-text-primary font-bold tabular-nums" style={{ fontSize: 10 }}>{c.strength}</span>
                    </div>
                    <div className="bg-bg-elevated rounded-full overflow-hidden" style={{ height: 4 }}>
                      <div className={`h-full rounded-full ${barColor}`} style={{ width: `${c.strength}%` }} />
                    </div>
                  </div>
                  <span className={`font-semibold tabular-nums shrink-0 ${isPositive ? 'text-buy' : 'text-sell'}`} style={{ fontSize: 8 }}>
                    {isPositive ? '+' : ''}{c.change.toFixed(1)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Price Alerts — hidden for now ── */}
        {/* ── Correlation Heatmap — hidden for now ── */}

        {/* Search */}
        <div className="relative" style={{ marginBottom: 12 }}>
          <Search className="absolute text-text-muted" style={{ left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16 }} />
          <input
            type="text"
            placeholder="Search pairs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bg-input border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40 transition-all"
            style={{ padding: '10px 14px 10px 38px', fontSize: 12 }}
          />
        </div>

        {/* Tabs */}
        <div className="flex bg-bg-secondary rounded-xl border border-border" style={{ gap: 4, padding: 5, marginBottom: 14 }}>
          {[
            { id: 'all', label: 'All Pairs' },
            { id: 'favorites', label: 'Favorites' },
            { id: 'sentiment', label: 'Sentiment' },
            { id: 'copy', label: 'Copy Trade' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 rounded-lg font-semibold transition-all ${
                tab === t.id ? 'bg-accent/[0.12] text-accent' : 'text-text-muted hover:text-text-secondary'
              }`}
              style={{ padding: '8px 0', fontSize: 10 }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* All Pairs / Favorites */}
        {(tab === 'all' || tab === 'favorites') && (
          <div>
            {displayPairs.map((pair, i) => (
              <button
                key={pair.pair}
                onClick={() => onNavigate('trade')}
                className="w-full gradient-card rounded-xl border border-border flex items-center hover:border-border-hover transition-all active:scale-[0.98]"
                style={{ padding: '10px 12px', gap: 10, marginBottom: i < displayPairs.length - 1 ? 8 : 0 }}
              >
                <div className={`rounded-lg flex items-center justify-center ${pair.change >= 0 ? 'bg-buy-glow' : 'bg-sell-glow'}`} style={{ width: 34, height: 34 }}>
                  {pair.change >= 0
                    ? <ArrowUpRight className="text-buy" style={{ width: 16, height: 16 }} />
                    : <ArrowDownRight className="text-sell" style={{ width: 16, height: 16 }} />
                  }
                </div>
                <div className="flex-1 text-left">
                  <p className="text-text-primary font-semibold" style={{ fontSize: 12 }}>{pair.pair}</p>
                  <p className="text-text-muted" style={{ fontSize: 10, marginTop: 2 }}>Spread: {pair.spread} · {pair.volume}</p>
                </div>
                <div className="flex items-center" style={{ gap: 10 }}>
                  <MiniChart positive={pair.change >= 0} width={50} height={24} />
                  <div className="text-right" style={{ minWidth: 54 }}>
                    <p className="text-text-primary font-bold tabular-nums" style={{ fontSize: 12 }}>{pair.price.toFixed(pair.price > 100 ? 2 : 4)}</p>
                    <p className={`font-semibold ${pair.change >= 0 ? 'text-buy' : 'text-sell'}`} style={{ fontSize: 10, marginTop: 1 }}>
                      {pair.change >= 0 ? '+' : ''}{pair.change}%
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(pair.pair); }}
                  style={{ padding: 4 }}
                >
                  <Star className={`transition-all ${
                    favorites.includes(pair.pair)
                      ? 'text-accent fill-accent drop-shadow-[0_0_4px_rgba(255,216,102,0.4)]'
                      : 'text-text-muted hover:text-text-secondary'
                  }`} style={{ width: 14, height: 14 }} />
                </button>
              </button>
            ))}
            {displayPairs.length === 0 && (
              <div className="text-center" style={{ padding: '40px 0' }}>
                <p className="text-text-muted" style={{ fontSize: 12 }}>{tab === 'favorites' ? 'No favorites yet' : 'No pairs found'}</p>
              </div>
            )}
          </div>
        )}

        {/* Sentiment Tab */}
        {tab === 'sentiment' && (
          <div>
            {forexPairs.map((pair, i) => (
              <div
                key={pair.pair}
                className="gradient-card rounded-xl border border-border hover:border-border-hover transition-colors"
                style={{ padding: '12px 14px', marginBottom: i < forexPairs.length - 1 ? 8 : 0 }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                  <span className="text-text-primary font-semibold" style={{ fontSize: 12 }}>{pair.pair}</span>
                  <span className="text-text-primary font-bold tabular-nums" style={{ fontSize: 12 }}>
                    {pair.price.toFixed(pair.price > 100 ? 2 : 4)}
                  </span>
                </div>
                <SentimentBar buy={pair.sentiment.buy} sell={pair.sentiment.sell} />
              </div>
            ))}
          </div>
        )}

        {/* Copy Trade Tab */}
        {tab === 'copy' && (
          <div>
            {copyTraders.map((trader, i) => (
              <div
                key={trader.name}
                className="gradient-card rounded-xl border border-border flex items-center"
                style={{ padding: '10px 12px', gap: 10, marginBottom: i < copyTraders.length - 1 ? 8 : 0 }}
              >
                {/* Photo + Rank */}
                <div className="relative shrink-0">
                  <div className="rounded-full overflow-hidden border-2 border-accent/20" style={{ width: 38, height: 38 }}>
                    <img src={trader.photo} alt={trader.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  {i < 3 && (
                    <div className="absolute gradient-gold flex items-center justify-center rounded-full shadow-[0_0_8px_rgba(255,216,102,0.3)]" style={{ top: -3, right: -3, width: 15, height: 15 }}>
                      <span className="text-bg-primary font-bold" style={{ fontSize: 7 }}>{i + 1}</span>
                    </div>
                  )}
                </div>
                {/* Info */}
                <div className="flex-1" style={{ minWidth: 0 }}>
                  <div className="flex items-center" style={{ gap: 6, marginBottom: 2 }}>
                    <span className="text-text-primary font-bold" style={{ fontSize: 11 }}>{trader.name}</span>
                    <span className={`font-semibold ${trader.riskLevel === 'Low' ? 'text-buy' : trader.riskLevel === 'High' ? 'text-sell' : 'text-accent'}`} style={{ fontSize: 8 }}>{trader.riskLevel}</span>
                  </div>
                  <div className="flex items-center" style={{ gap: 8 }}>
                    <span className="text-buy font-bold tabular-nums" style={{ fontSize: 10 }}>ROI {trader.roi}%</span>
                    <span className="text-text-muted" style={{ fontSize: 9 }}>WR {trader.winRate}%</span>
                    <span className="text-text-muted" style={{ fontSize: 9 }}>
                      <Users style={{ width: 9, height: 9, display: 'inline', verticalAlign: 'middle', marginRight: 2 }} />
                      {trader.copiers}
                    </span>
                  </div>
                </div>
                {/* Chart + Copy */}
                <div className="flex items-center shrink-0" style={{ gap: 8 }}>
                  <MiniChart positive width={44} height={24} />
                  <button className="btn-primary rounded-lg font-bold" style={{ padding: '5px 12px', fontSize: 9 }}>
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Full-screen Popup Overlay ── */}
      {expandedSection && (
        <div className="absolute inset-0 bg-bg-primary z-50 flex flex-col animate-slideUp">
          <div className="glass-strong shrink-0 flex items-center justify-between" style={{ padding: '14px 20px' }}>
            <div className="flex items-center" style={{ gap: 8 }}>
              {expandedSection === 'movers' && <TrendingUp className="text-accent" style={{ width: 18, height: 18 }} />}
              {expandedSection === 'strength' && <Gauge className="text-accent" style={{ width: 18, height: 18 }} />}
              <h3 className="text-text-primary font-bold" style={{ fontSize: 16 }}>
                {expandedSection === 'movers' && 'Top Movers'}
                {expandedSection === 'strength' && 'Currency Strength'}
              </h3>
            </div>
            <button
              onClick={() => setExpandedSection(null)}
              className="rounded-lg bg-bg-elevated border border-border flex items-center justify-center hover:bg-bg-card transition-colors"
              style={{ width: 32, height: 32 }}
            >
              <X className="text-text-secondary" style={{ width: 16, height: 16 }} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scroll" style={{ padding: '16px 16px 32px' }}>

            {/* Movers — full list */}
            {expandedSection === 'movers' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {topMovers.map((m) => {
                  const isUp = m.change > 0;
                  return (
                    <div key={m.pair} className="gradient-card rounded-xl border border-border flex items-center" style={{ padding: '10px 12px', gap: 10 }}>
                      <div className={`rounded-lg flex items-center justify-center shrink-0 ${isUp ? 'bg-buy-glow' : 'bg-sell-glow'}`} style={{ width: 34, height: 34 }}>
                        {isUp ? <ArrowUpRight className="text-buy" style={{ width: 16, height: 16 }} /> : <ArrowDownRight className="text-sell" style={{ width: 16, height: 16 }} />}
                      </div>
                      <div className="flex-1" style={{ minWidth: 0 }}>
                        <span className="text-text-primary font-bold" style={{ fontSize: 12 }}>{m.pair}</span>
                        <div className="flex items-center" style={{ gap: 8, marginTop: 2 }}>
                          <span className="text-text-secondary tabular-nums font-medium" style={{ fontSize: 10 }}>
                            {m.price > 100 ? m.price.toFixed(2) : m.price.toFixed(4)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center shrink-0" style={{ gap: 10 }}>
                        <MiniChart positive={isUp} width={56} height={28} />
                        <span className={`font-bold tabular-nums ${isUp ? 'text-buy' : 'text-sell'}`} style={{ fontSize: 12 }}>
                          {isUp ? '+' : ''}{m.change}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Strength — full list with bars */}
            {expandedSection === 'strength' && (
              <div className="gradient-card rounded-xl border border-border" style={{ padding: '12px 14px' }}>
                {currencyStrength.map((c, i) => {
                  const isPositive = c.change > 0;
                  const ringColor = c.strength >= 60 ? '#0ECB81' : c.strength >= 40 ? '#FFD866' : '#F6465D';
                  const barColor = c.strength >= 60 ? 'bg-buy' : c.strength >= 40 ? 'bg-accent' : 'bg-sell';
                  const pct = c.strength;
                  const r = 18;
                  const circ = 2 * Math.PI * r;
                  const offset = circ - (pct / 100) * circ;
                  return (
                    <div key={c.currency} className={`flex items-center ${i < currencyStrength.length - 1 ? 'border-b border-border/30' : ''}`} style={{ gap: 12, padding: '10px 0' }}>
                      {/* Circular gauge */}
                      <div className="relative shrink-0" style={{ width: 42, height: 42 }}>
                        <svg width="42" height="42" viewBox="0 0 42 42">
                          <circle cx="21" cy="21" r={r} fill="none" stroke="currentColor" strokeWidth="3.5" className="text-bg-elevated" />
                          <circle cx="21" cy="21" r={r} fill="none" stroke={ringColor} strokeWidth="3.5" strokeLinecap="round"
                            strokeDasharray={circ} strokeDashoffset={offset}
                            transform="rotate(-90 21 21)" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-text-primary font-bold tabular-nums" style={{ fontSize: 10 }}>{c.strength}</span>
                        </div>
                      </div>
                      {/* Info + bar */}
                      <div className="flex-1">
                        <div className="flex items-center" style={{ gap: 6, marginBottom: 4 }}>
                          <img src={c.flagImg} alt={c.currency} className="rounded-sm" style={{ width: 22, height: 15, objectFit: 'cover' }} loading="lazy" />
                          <span className="text-text-primary font-bold" style={{ fontSize: 12 }}>{c.currency}</span>
                          <span className={`font-semibold tabular-nums ${isPositive ? 'text-buy' : 'text-sell'}`} style={{ fontSize: 10 }}>
                            {isPositive ? '+' : ''}{c.change.toFixed(1)}
                          </span>
                        </div>
                        <div className="bg-bg-elevated rounded-full overflow-hidden" style={{ height: 6 }}>
                          <div className={`h-full rounded-full ${barColor} transition-all`} style={{ width: `${c.strength}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
