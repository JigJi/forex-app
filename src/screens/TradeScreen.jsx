import { useState, useMemo } from 'react';
import { ChevronDown, Minus, Plus, TrendingUp, Clock, BarChart3, ArrowUpDown, X, ChevronRight } from 'lucide-react';
import CandlestickChart from '../components/CandlestickChart';
import OrderBook from '../components/OrderBook';
import RecentTrades from '../components/RecentTrades';
import SentimentBar from '../components/SentimentBar';
import { forexPairs, leverageOptions, openPositions, closedTrades } from '../data/mockData';

export default function TradeScreen() {
  const [selectedPair, setSelectedPair] = useState(forexPairs[0]);
  const [selectedLeverage, setSelectedLeverage] = useState('1:100');
  const [lotSize, setLotSize] = useState(0.10);
  const [timeframe, setTimeframe] = useState('1H');
  const [showPairPicker, setShowPairPicker] = useState(false);
  const [orderType, setOrderType] = useState('market');
  const [middleTab, setMiddleTab] = useState('orderbook');
  const [bottomTab, setBottomTab] = useState('positions');
  const [tp, setTp] = useState('');
  const [sl, setSl] = useState('');

  const timeframes = ['1M', '5M', '15M', '1H', '4H', '1D'];
  const decimals = selectedPair.price > 100 ? 2 : 4;

  const pairPositions = openPositions.filter(p => p.pair === selectedPair.pair);
  const allPositions = openPositions;

  const bidPrice = (selectedPair.price - selectedPair.spread * 0.0001 / 2).toFixed(decimals);
  const askPrice = (selectedPair.price + selectedPair.spread * 0.0001 / 2).toFixed(decimals);

  // Mock 24h stats
  const stats24h = useMemo(() => ({
    high: +(selectedPair.price * 1.005).toFixed(decimals),
    low: +(selectedPair.price * 0.994).toFixed(decimals),
    volume: selectedPair.volume,
  }), [selectedPair, decimals]);

  return (
    <div className="h-full bg-bg-primary flex flex-col">
      {/* ── Header ── */}
      <div className="flex items-center justify-between glass-strong shrink-0" style={{ padding: '12px 16px' }}>
        <button onClick={() => setShowPairPicker(!showPairPicker)} className="flex items-center" style={{ gap: 6 }}>
          <h2 className="text-text-primary font-bold" style={{ fontSize: 16 }}>{selectedPair.pair}</h2>
          <ChevronDown className={`text-text-muted transition-transform duration-200 ${showPairPicker ? 'rotate-180' : ''}`} style={{ width: 14, height: 14 }} />
        </button>
        <div className="flex items-center" style={{ gap: 8 }}>
          <span className={`font-semibold rounded-md ${selectedPair.change >= 0 ? 'text-buy bg-buy-glow' : 'text-sell bg-sell-glow'}`} style={{ fontSize: 10, padding: '2px 6px' }}>
            {selectedPair.change >= 0 ? '+' : ''}{selectedPair.change}%
          </span>
          <span className="text-text-primary font-bold tabular-nums" style={{ fontSize: 15 }}>
            {selectedPair.price.toFixed(decimals)}
          </span>
        </div>
      </div>

      {/* ── Pair Picker Dropdown ── */}
      {showPairPicker && (
        <div className="glass rounded-xl animate-slideDown shrink-0" style={{ padding: 6, margin: '0 16px 6px' }}>
          {forexPairs.map((pair) => (
            <button
              key={pair.pair}
              onClick={() => { setSelectedPair(pair); setShowPairPicker(false); }}
              className={`w-full flex items-center justify-between rounded-xl text-sm transition-all ${
                selectedPair.pair === pair.pair ? 'bg-accent/[0.08] text-accent' : 'text-text-primary hover:bg-bg-elevated'
              }`}
              style={{ padding: '8px 12px' }}
            >
              <span className="font-medium" style={{ fontSize: 13 }}>{pair.pair}</span>
              <div className="flex items-center" style={{ gap: 10 }}>
                <span className={`font-medium ${pair.change >= 0 ? 'text-buy' : 'text-sell'}`} style={{ fontSize: 11 }}>
                  {pair.change >= 0 ? '+' : ''}{pair.change}%
                </span>
                <span className="text-text-secondary tabular-nums" style={{ fontSize: 11 }}>{pair.price.toFixed(pair.price > 100 ? 2 : 4)}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto custom-scroll">

      {/* ── 24h Stats Bar ── */}
      <div className="flex items-center justify-between shrink-0 border-b border-border" style={{ padding: '6px 16px' }}>
        <div className="flex items-center" style={{ gap: 14 }}>
          <div>
            <span className="text-text-muted block" style={{ fontSize: 9 }}>24h High</span>
            <span className="text-text-primary tabular-nums font-medium" style={{ fontSize: 11 }}>{stats24h.high}</span>
          </div>
          <div>
            <span className="text-text-muted block" style={{ fontSize: 9 }}>24h Low</span>
            <span className="text-text-primary tabular-nums font-medium" style={{ fontSize: 11 }}>{stats24h.low}</span>
          </div>
          <div>
            <span className="text-text-muted block" style={{ fontSize: 9 }}>Volume</span>
            <span className="text-text-primary tabular-nums font-medium" style={{ fontSize: 11 }}>{stats24h.volume}</span>
          </div>
        </div>
        <div style={{ minWidth: 70 }}>
          <span className="text-text-muted block" style={{ fontSize: 9 }}>Spread</span>
          <span className="text-accent tabular-nums font-medium" style={{ fontSize: 11 }}>{selectedPair.spread} pips</span>
        </div>
      </div>

      {/* ── Timeframe Tabs ── */}
      <div className="shrink-0" style={{ padding: '6px 16px 4px' }}>
        <div className="flex bg-bg-secondary rounded-xl border border-border" style={{ gap: 4, padding: 5 }}>
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`flex-1 rounded-lg font-semibold transition-all ${
                timeframe === tf ? 'bg-accent/[0.12] text-accent' : 'text-text-muted hover:text-text-secondary'
              }`}
              style={{ padding: '5px 0', fontSize: 10 }}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* ── Chart (fixed compact height) ── */}
      <div className="shrink-0" style={{ padding: '4px 16px 6px', height: 250 }}>
        <div className="gradient-card rounded-xl border border-border h-full flex items-center justify-center" style={{ padding: 6 }}>
          <CandlestickChart />
        </div>
      </div>

      {/* ── Order Entry Panel — immediately after chart ── */}
      <div className="shrink-0 glass-strong border-t border-border" style={{ padding: '10px 16px' }}>
        {/* Order Type + Lot Size row */}
        <div className="flex items-center" style={{ gap: 8, marginBottom: 8 }}>
          <div className="flex bg-bg-secondary rounded-lg border border-border" style={{ gap: 2, padding: 3 }}>
            {[
              { id: 'market', label: 'Market', icon: TrendingUp },
              { id: 'limit', label: 'Limit', icon: Clock },
              { id: 'stop', label: 'Stop', icon: BarChart3 },
            ].map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setOrderType(type.id)}
                  className={`rounded-md font-semibold flex items-center transition-all ${
                    orderType === type.id ? 'bg-bg-elevated text-text-primary shadow-sm' : 'text-text-muted'
                  }`}
                  style={{ padding: '5px 7px', gap: 3, fontSize: 10 }}
                >
                  <Icon style={{ width: 10, height: 10 }} /> {type.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center ml-auto" style={{ gap: 6 }}>
            <span className="text-text-muted" style={{ fontSize: 10 }}>Lots</span>
            <button
              onClick={() => setLotSize(Math.max(0.01, +(lotSize - 0.01).toFixed(2)))}
              className="rounded-md bg-bg-card border border-border flex items-center justify-center active:bg-bg-elevated transition-all"
              style={{ width: 26, height: 26 }}
            >
              <Minus className="text-text-secondary" style={{ width: 11, height: 11 }} />
            </button>
            <span className="text-text-primary font-bold tabular-nums text-center" style={{ fontSize: 12, width: 36 }}>{lotSize.toFixed(2)}</span>
            <button
              onClick={() => setLotSize(+(lotSize + 0.01).toFixed(2))}
              className="rounded-md bg-bg-card border border-border flex items-center justify-center active:bg-bg-elevated transition-all"
              style={{ width: 26, height: 26 }}
            >
              <Plus className="text-text-secondary" style={{ width: 11, height: 11 }} />
            </button>
          </div>
        </div>

        {/* Lot Size Quick Presets */}
        <div className="flex" style={{ gap: 4, marginBottom: 8 }}>
          {[0.01, 0.1, 0.5, 1.0].map((preset) => (
            <button
              key={preset}
              onClick={() => setLotSize(preset)}
              className={`flex-1 rounded-md font-semibold border transition-all ${
                lotSize === preset
                  ? 'border-accent/40 bg-accent/[0.08] text-accent'
                  : 'border-border text-text-muted hover:border-border-hover'
              }`}
              style={{ padding: '4px 0', fontSize: 9 }}
            >
              {preset.toFixed(2)}
            </button>
          ))}
        </div>

        {/* TP / SL row */}
        <div className="flex" style={{ gap: 8, marginBottom: 8 }}>
          <div className="flex-1 flex items-center bg-bg-card rounded-lg border border-border" style={{ padding: '0 8px' }}>
            <span className="text-buy font-semibold" style={{ fontSize: 9, marginRight: 6 }}>TP</span>
            <input
              type="text"
              placeholder={`e.g. ${(selectedPair.price * 1.003).toFixed(decimals)}`}
              value={tp}
              onChange={(e) => setTp(e.target.value)}
              className="bg-transparent text-text-primary w-full outline-none tabular-nums"
              style={{ fontSize: 11, padding: '7px 0' }}
            />
          </div>
          <div className="flex-1 flex items-center bg-bg-card rounded-lg border border-border" style={{ padding: '0 8px' }}>
            <span className="text-sell font-semibold" style={{ fontSize: 9, marginRight: 6 }}>SL</span>
            <input
              type="text"
              placeholder={`e.g. ${(selectedPair.price * 0.997).toFixed(decimals)}`}
              value={sl}
              onChange={(e) => setSl(e.target.value)}
              className="bg-transparent text-text-primary w-full outline-none tabular-nums"
              style={{ fontSize: 11, padding: '7px 0' }}
            />
          </div>
        </div>

        {/* Leverage row */}
        <div className="flex" style={{ gap: 4, marginBottom: 8 }}>
          {leverageOptions.map((lev) => (
            <button
              key={lev}
              onClick={() => setSelectedLeverage(lev)}
              className={`flex-1 rounded-md font-semibold border transition-all ${
                selectedLeverage === lev
                  ? 'border-accent/40 bg-accent/[0.08] text-accent'
                  : 'border-border text-text-muted hover:border-border-hover'
              }`}
              style={{ padding: '5px 0', fontSize: 9 }}
            >
              {lev}
            </button>
          ))}
        </div>

        {/* Trade Info row */}
        <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
          <span className="text-text-muted" style={{ fontSize: 9 }}>Margin: <span className="text-text-secondary font-medium">${(selectedPair.price * lotSize * 100000 / parseInt(selectedLeverage.split(':')[1])).toFixed(2)}</span></span>
          <span className="text-text-muted" style={{ fontSize: 9 }}>Pip: <span className="text-text-secondary font-medium">${(lotSize * 10).toFixed(2)}</span></span>
          <span className="text-text-muted" style={{ fontSize: 9 }}>Risk: <span className="text-accent font-medium">{selectedLeverage}</span></span>
        </div>

        {/* Buy / Sell Buttons */}
        <div className="flex items-center" style={{ gap: 6 }}>
          <button className="flex-1 bg-sell hover:shadow-[0_4px_20px_rgba(246,70,93,0.3)] active:scale-[0.97] text-white font-bold rounded-lg transition-all duration-200 flex flex-col items-center relative overflow-hidden group" style={{ padding: '7px 0' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-sell-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="font-medium opacity-70 relative" style={{ fontSize: 8, marginBottom: 1 }}>SELL</span>
            <span className="relative tabular-nums font-bold" style={{ fontSize: 12 }}>{bidPrice}</span>
          </button>
          <div className="shrink-0 bg-bg-elevated rounded border border-border flex items-center justify-center" style={{ padding: '3px 6px' }}>
            <span className="text-text-muted tabular-nums" style={{ fontSize: 8 }}>{selectedPair.spread} pips</span>
          </div>
          <button className="flex-1 bg-buy hover:shadow-[0_4px_20px_rgba(14,203,129,0.3)] active:scale-[0.97] text-white font-bold rounded-lg transition-all duration-200 flex flex-col items-center relative overflow-hidden group" style={{ padding: '7px 0' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-buy-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="font-medium opacity-70 relative" style={{ fontSize: 8, marginBottom: 1 }}>BUY</span>
            <span className="relative tabular-nums font-bold" style={{ fontSize: 12 }}>{askPrice}</span>
          </button>
        </div>
      </div>

      {/* ── Positions / Orders — right after trade buttons ── */}
      <div className="shrink-0 border-t border-border" style={{ paddingBottom: 8 }}>
        <div className="flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {[
            { id: 'positions', label: `Positions (${allPositions.length})` },
            { id: 'orders', label: 'Pending (0)' },
            { id: 'history', label: 'History' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setBottomTab(tab.id)}
              className={`flex-1 font-semibold transition-all relative ${
                bottomTab === tab.id ? 'text-accent' : 'text-text-muted'
              }`}
              style={{ padding: '8px 0', fontSize: 11 }}
            >
              {tab.label}
              {bottomTab === tab.id && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-accent rounded-t-full" style={{ width: 24, height: 2 }} />
              )}
            </button>
          ))}
        </div>

        <div style={{ padding: '8px 16px' }}>
          {bottomTab === 'positions' && (
            allPositions.length > 0 ? (
              <div className="flex flex-col" style={{ gap: 6 }}>
                {allPositions.map((pos, i) => (
                  <div key={i} className="gradient-card rounded-xl border border-border flex items-center justify-between" style={{ padding: '10px 12px' }}>
                    <div className="flex items-center" style={{ gap: 8 }}>
                      <span className={`text-xs font-bold rounded px-1 py-0.5 ${pos.type === 'BUY' ? 'text-buy bg-buy/[0.12]' : 'text-sell bg-sell/[0.12]'}`}>
                        {pos.type}
                      </span>
                      <div>
                        <span className="text-text-primary font-semibold" style={{ fontSize: 12 }}>{pos.pair}</span>
                        <span className="text-text-muted block" style={{ fontSize: 9 }}>{pos.lots} lots @ {pos.openPrice}</span>
                      </div>
                    </div>
                    <div className="flex items-center" style={{ gap: 8 }}>
                      <div className="text-right">
                        <span className={`font-bold tabular-nums ${pos.pl >= 0 ? 'text-buy' : 'text-sell'}`} style={{ fontSize: 13 }}>
                          {pos.pl >= 0 ? '+' : ''}${pos.pl.toFixed(2)}
                        </span>
                        <span className={`block tabular-nums font-medium ${pos.pl >= 0 ? 'text-buy' : 'text-sell'}`} style={{ fontSize: 9 }}>
                          {(() => {
                            const pct = pos.type === 'BUY'
                              ? ((pos.currentPrice - pos.openPrice) / pos.openPrice * 100)
                              : ((pos.openPrice - pos.currentPrice) / pos.openPrice * 100);
                            return `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`;
                          })()}
                        </span>
                      </div>
                      <button
                        onClick={() => alert('Close position')}
                        className="rounded-md bg-bg-elevated border border-border flex items-center justify-center hover:border-sell/30 hover:text-sell transition-all"
                        style={{ width: 22, height: 22 }}
                      >
                        <X className="text-text-muted" style={{ width: 10, height: 10 }} />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between" style={{ padding: '4px 4px 0' }}>
                  <span className="text-text-muted font-medium" style={{ fontSize: 10 }}>Total P/L</span>
                  <span className="text-buy font-bold tabular-nums" style={{ fontSize: 13 }}>
                    +${allPositions.reduce((sum, p) => sum + p.pl, 0).toFixed(2)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-text-muted" style={{ padding: '20px 0' }}>
                <ArrowUpDown style={{ width: 20, height: 20, marginBottom: 6, opacity: 0.4 }} />
                <span style={{ fontSize: 11 }}>No open positions</span>
              </div>
            )
          )}

          {bottomTab === 'orders' && (
            <div className="flex flex-col items-center justify-center text-text-muted" style={{ padding: '20px 0' }}>
              <Clock style={{ width: 20, height: 20, marginBottom: 6, opacity: 0.4 }} />
              <span style={{ fontSize: 11 }}>No pending orders</span>
            </div>
          )}

          {bottomTab === 'history' && (
            <div className="flex flex-col" style={{ gap: 6 }}>
              {closedTrades.map((trade, i) => (
                <div key={i} className="gradient-card rounded-xl border border-border flex items-center justify-between" style={{ padding: '10px 12px' }}>
                  <div className="flex items-center" style={{ gap: 8 }}>
                    <span className={`text-xs font-bold rounded px-1 py-0.5 ${trade.type === 'BUY' ? 'text-buy bg-buy/[0.12]' : 'text-sell bg-sell/[0.12]'}`}>
                      {trade.type}
                    </span>
                    <div>
                      <span className="text-text-primary font-semibold" style={{ fontSize: 12 }}>{trade.pair}</span>
                      <span className="text-text-muted block" style={{ fontSize: 9 }}>{trade.lots} lots · {trade.duration}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`font-bold tabular-nums ${trade.pl >= 0 ? 'text-buy' : 'text-sell'}`} style={{ fontSize: 13 }}>
                      {trade.pl >= 0 ? '+' : ''}${trade.pl.toFixed(2)}
                    </span>
                    <span className="text-text-muted block" style={{ fontSize: 9 }}>{trade.closedAt}</span>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between" style={{ padding: '4px 4px 0' }}>
                <span className="text-text-muted font-medium" style={{ fontSize: 10 }}>Total Closed P/L</span>
                <span className="text-buy font-bold tabular-nums" style={{ fontSize: 13 }}>
                  +${closedTrades.reduce((sum, t) => sum + t.pl, 0).toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Order Book / Trades / Info — supplementary data at bottom ── */}
      <div className="shrink-0 border-t border-border" style={{ paddingBottom: 16 }}>
        <div className="flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {[
            { id: 'orderbook', label: 'Order Book' },
            { id: 'trades', label: 'Trades' },
            { id: 'info', label: 'Info' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setMiddleTab(tab.id)}
              className={`flex-1 font-semibold transition-all relative ${
                middleTab === tab.id ? 'text-accent' : 'text-text-muted'
              }`}
              style={{ padding: '8px 0', fontSize: 11 }}
            >
              {tab.label}
              {middleTab === tab.id && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-accent rounded-t-full" style={{ width: 24, height: 2 }} />
              )}
            </button>
          ))}
        </div>

        <div style={{ padding: '8px 16px' }}>
          {middleTab === 'orderbook' && (
            <OrderBook basePrice={selectedPair.price} decimals={decimals} />
          )}
          {middleTab === 'trades' && (
            <RecentTrades basePrice={selectedPair.price} decimals={decimals} />
          )}
          {middleTab === 'info' && (
            <div className="flex flex-col" style={{ gap: 10 }}>
              <div>
                <span className="text-text-muted" style={{ fontSize: 10, marginBottom: 4, display: 'block' }}>Market Sentiment</span>
                <SentimentBar buy={selectedPair.sentiment.buy} sell={selectedPair.sentiment.sell} />
              </div>
              <div className="grid grid-cols-2" style={{ gap: 8 }}>
                {[
                  { label: 'Spread', value: `${selectedPair.spread} pips` },
                  { label: 'Volume', value: selectedPair.volume },
                  { label: 'Pip Value', value: `$${(lotSize * 10).toFixed(2)}` },
                  { label: 'Margin Req.', value: `$${(selectedPair.price * lotSize * 100000 / parseInt(selectedLeverage.split(':')[1])).toFixed(2)}` },
                  { label: 'Swap Long', value: '-2.35' },
                  { label: 'Swap Short', value: '+1.12' },
                ].map((item) => (
                  <div key={item.label} className="gradient-card rounded-xl border border-border" style={{ padding: '8px 10px' }}>
                    <span className="text-text-muted block" style={{ fontSize: 9 }}>{item.label}</span>
                    <span className="text-text-primary font-medium" style={{ fontSize: 12 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      </div>{/* end scrollable */}
    </div>
  );
}
