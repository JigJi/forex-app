import { useState } from 'react';
import { Search, Star, TrendingUp, Users, ArrowUpRight, ArrowDownRight, Copy, BarChart3, ChevronRight, Gauge, X, ArrowLeft, Clock, Activity } from 'lucide-react';
import { forexPairs, copyTraders, topMovers, currencyStrength } from '../data/mockData';
import MiniChart from '../components/MiniChart';
import CandlestickChart from '../components/CandlestickChart';
import OrderBook from '../components/OrderBook';
import RecentTrades from '../components/RecentTrades';
import SentimentBar from '../components/SentimentBar';

export default function MarketsScreen({ onNavigate }) {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');
  const [favorites, setFavorites] = useState(['EUR/USD', 'GBP/USD']);
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedPairDetail, setSelectedPairDetail] = useState(null);
  const [detailTab, setDetailTab] = useState('orderbook');

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
                onClick={() => setSelectedPairDetail(pair)}
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

      {/* ── Pair Detail Overlay ── */}
      {selectedPairDetail && (() => {
        const pair = selectedPairDetail;
        const decimals = pair.price > 100 ? 2 : 4;
        const bidPrice = (pair.price - pair.spread * 0.0001 / 2).toFixed(decimals);
        const askPrice = (pair.price + pair.spread * 0.0001 / 2).toFixed(decimals);
        return (
          <div className="absolute inset-0 bg-bg-primary z-50 flex flex-col animate-slideUp">
            {/* Header */}
            <div className="glass-strong shrink-0 flex items-center justify-between" style={{ padding: '12px 16px' }}>
              <div className="flex items-center" style={{ gap: 10 }}>
                <button onClick={() => setSelectedPairDetail(null)} className="rounded-lg bg-bg-elevated border border-border flex items-center justify-center" style={{ width: 30, height: 30 }}>
                  <ArrowLeft className="text-text-secondary" style={{ width: 14, height: 14 }} />
                </button>
                <div>
                  <h3 className="text-text-primary font-bold" style={{ fontSize: 15 }}>{pair.pair}</h3>
                  <div className="flex items-center" style={{ gap: 6 }}>
                    <span className="text-text-primary font-bold tabular-nums" style={{ fontSize: 12 }}>{pair.price.toFixed(decimals)}</span>
                    <span className={`font-semibold ${pair.change >= 0 ? 'text-buy' : 'text-sell'}`} style={{ fontSize: 10 }}>
                      {pair.change >= 0 ? '+' : ''}{pair.change}%
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); toggleFavorite(pair.pair); }}
                style={{ padding: 6 }}
              >
                <Star className={`transition-all ${favorites.includes(pair.pair) ? 'text-accent fill-accent' : 'text-text-muted'}`} style={{ width: 18, height: 18 }} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto custom-scroll" style={{ padding: '12px 16px 32px' }}>

              {/* Timeframe tabs */}
              <div className="flex" style={{ gap: 4, marginBottom: 10 }}>
                {['1H', '4H', '1D', '1W', '1M'].map((tf) => (
                  <button key={tf} className="flex-1 rounded-lg bg-bg-card border border-border text-text-muted font-semibold hover:text-text-primary transition-all first:bg-bg-elevated first:text-text-primary" style={{ padding: '5px 0', fontSize: 9 }}>
                    {tf}
                  </button>
                ))}
              </div>

              {/* Chart */}
              <div className="gradient-card rounded-xl border border-border" style={{ padding: '10px 8px', marginBottom: 12 }}>
                <CandlestickChart />
              </div>

              {/* BID / ASK / Spread */}
              <div className="gradient-card rounded-xl border border-border flex items-center justify-between" style={{ padding: '10px 14px', marginBottom: 12 }}>
                <div className="flex flex-col">
                  <span className="text-text-muted" style={{ fontSize: 8 }}>BID</span>
                  <span className="text-sell font-bold tabular-nums" style={{ fontSize: 14 }}>{bidPrice}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-text-muted" style={{ fontSize: 8 }}>SPREAD</span>
                  <span className="text-accent font-bold tabular-nums" style={{ fontSize: 11 }}>{pair.spread} pips</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-text-muted" style={{ fontSize: 8 }}>ASK</span>
                  <span className="text-buy font-bold tabular-nums" style={{ fontSize: 14 }}>{askPrice}</span>
                </div>
              </div>

              {/* Pair Info */}
              <div className="gradient-card rounded-xl border border-border" style={{ padding: '12px 14px', marginBottom: 12 }}>
                <h4 className="text-text-primary font-bold" style={{ fontSize: 11, marginBottom: 8 }}>Pair Info</h4>
                <div className="flex flex-col" style={{ gap: 6 }}>
                  {[
                    { label: 'Volume', value: pair.volume },
                    { label: 'Spread', value: `${pair.spread} pips` },
                    { label: 'Session', value: 'London / New York' },
                    { label: 'Type', value: pair.pair.includes('USD') ? 'Major' : 'Cross' },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between">
                      <span className="text-text-muted" style={{ fontSize: 10 }}>{row.label}</span>
                      <span className="text-text-secondary font-medium" style={{ fontSize: 10 }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buy / Sell buttons */}
              <div className="flex" style={{ gap: 8, marginBottom: 12 }}>
                <button
                  onClick={() => onNavigate('trade')}
                  className="flex-1 bg-buy hover:shadow-[0_4px_20px_rgba(14,203,129,0.3)] active:scale-[0.97] text-white font-bold rounded-xl transition-all duration-200 flex flex-col items-center relative overflow-hidden group"
                  style={{ padding: '10px 0' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-buy-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="font-medium opacity-70 relative" style={{ fontSize: 9, marginBottom: 1 }}>BUY</span>
                  <span className="relative tabular-nums font-bold" style={{ fontSize: 14 }}>{askPrice}</span>
                </button>
                <button
                  onClick={() => onNavigate('trade')}
                  className="flex-1 bg-sell hover:shadow-[0_4px_20px_rgba(246,70,93,0.3)] active:scale-[0.97] text-white font-bold rounded-xl transition-all duration-200 flex flex-col items-center relative overflow-hidden group"
                  style={{ padding: '10px 0' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-sell-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="font-medium opacity-70 relative" style={{ fontSize: 9, marginBottom: 1 }}>SELL</span>
                  <span className="relative tabular-nums font-bold" style={{ fontSize: 14 }}>{bidPrice}</span>
                </button>
              </div>

              {/* Sentiment */}
              <div className="gradient-card rounded-xl border border-border" style={{ padding: '12px 14px', marginBottom: 12 }}>
                <h4 className="text-text-primary font-bold" style={{ fontSize: 11, marginBottom: 8 }}>Market Sentiment</h4>
                <SentimentBar buy={pair.sentiment.buy} sell={pair.sentiment.sell} />
              </div>

              {/* Order Book / Trades tabs */}
              <div className="gradient-card rounded-xl border border-border" style={{ padding: '10px 12px', marginBottom: 12 }}>
                <div className="flex" style={{ gap: 4, marginBottom: 10 }}>
                  {['orderbook', 'trades'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setDetailTab(t)}
                      className={`flex-1 rounded-lg font-semibold text-center transition-all ${
                        detailTab === t ? 'bg-accent/[0.12] text-accent' : 'text-text-muted'
                      }`}
                      style={{ padding: '6px 0', fontSize: 10 }}
                    >
                      {t === 'orderbook' ? 'Order Book' : 'Recent Trades'}
                    </button>
                  ))}
                </div>
                {detailTab === 'orderbook' && (
                  <OrderBook basePrice={pair.price} decimals={decimals} spread={pair.spread} />
                )}
                {detailTab === 'trades' && (
                  <RecentTrades basePrice={pair.price} decimals={decimals} />
                )}
              </div>
            </div>
          </div>
        );
      })()}

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
