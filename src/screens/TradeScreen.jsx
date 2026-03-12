import { useState } from 'react';
import { ChevronDown, ArrowUpDown, X, Clock, Search } from 'lucide-react';
import OrderBook from '../components/OrderBook';
import { forexPairs, openPositions, closedTrades } from '../data/mockData';

export default function TradeScreen() {
  const [selectedPair, setSelectedPair] = useState(forexPairs[0]);
  const [leverageValue, setLeverageValue] = useState(100);
  const [lotSize, setLotSize] = useState(0.10);
  const [showPairPicker, setShowPairPicker] = useState(false);
  const [pairSearch, setPairSearch] = useState('');
  const [orderType, setOrderType] = useState('market');
  const [bottomTab, setBottomTab] = useState('positions');
  const [tp, setTp] = useState('');
  const [sl, setSl] = useState('');
  const [showTpSl, setShowTpSl] = useState(false);
  const [showNetTarget, setShowNetTarget] = useState(false);
  const [netTargetMode, setNetTargetMode] = useState('$'); // '$' or '%'
  const [netProfit, setNetProfit] = useState('');
  const [netLoss, setNetLoss] = useState('');
  const [tradeDirection, setTradeDirection] = useState('buy');

  const decimals = selectedPair.price > 100 ? 2 : 4;

  const allPositions = openPositions;


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
          {/* Search input */}
          <div className="flex items-center bg-bg-card rounded-lg border border-border" style={{ padding: '0 8px', marginBottom: 4 }}>
            <Search className="text-text-muted shrink-0" style={{ width: 12, height: 12 }} />
            <input
              type="text"
              placeholder="Search pair..."
              value={pairSearch}
              onChange={(e) => setPairSearch(e.target.value)}
              autoFocus
              className="bg-transparent text-text-primary w-full outline-none"
              style={{ fontSize: 12, padding: '8px 6px' }}
            />
            {pairSearch && (
              <button onClick={() => setPairSearch('')} className="text-text-muted shrink-0">
                <X style={{ width: 12, height: 12 }} />
              </button>
            )}
          </div>
          {forexPairs
            .filter((pair) => pair.pair.toLowerCase().includes(pairSearch.toLowerCase()))
            .map((pair) => (
            <button
              key={pair.pair}
              onClick={() => { setSelectedPair(pair); setShowPairPicker(false); setPairSearch(''); }}
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

      {/* ── Side-by-side: Order Book + Trade Form ── */}
      <div className="shrink-0 flex items-stretch" style={{ padding: '10px 16px 8px', gap: 8 }}>
        {/* Left column: Order Book (~40%) */}
        <div className="flex flex-col" style={{ width: '40%', minWidth: 0 }}>
          <div className="gradient-card rounded-xl border border-border flex-1 overflow-y-auto custom-scroll" style={{ padding: '10px 10px' }}>
            <OrderBook basePrice={selectedPair.price} decimals={decimals} spread={selectedPair.spread} />
          </div>
        </div>

        {/* Right column: Trade Form (~60%) — Binance style */}
        <div className="flex flex-col" style={{ width: '60%', minWidth: 0 }}>
          <div className="glass-strong rounded-xl border border-border flex flex-col flex-1" style={{ padding: '0' }}>

            {/* ── Buy / Sell Tabs ── */}
            <div className="flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <button
                onClick={() => setTradeDirection('buy')}
                className={`flex-1 font-bold text-center transition-all ${
                  tradeDirection === 'buy' ? 'text-buy bg-buy/[0.08]' : 'text-text-muted hover:text-text-secondary'
                }`}
                style={{ padding: '10px 0', fontSize: 12, borderBottom: tradeDirection === 'buy' ? '2px solid var(--color-buy)' : '2px solid transparent' }}
              >
                Buy
              </button>
              <button
                onClick={() => setTradeDirection('sell')}
                className={`flex-1 font-bold text-center transition-all ${
                  tradeDirection === 'sell' ? 'text-sell bg-sell/[0.08]' : 'text-text-muted hover:text-text-secondary'
                }`}
                style={{ padding: '10px 0', fontSize: 12, borderBottom: tradeDirection === 'sell' ? '2px solid var(--color-sell)' : '2px solid transparent' }}
              >
                Sell
              </button>
            </div>

            <div style={{ padding: '10px 12px' }}>
              {/* ── Order Type Selector ── */}
              <div className="flex bg-bg-secondary rounded-lg border border-border" style={{ gap: 2, padding: 3, marginBottom: 10 }}>
                {[
                  { id: 'market', label: 'Market' },
                  { id: 'limit', label: 'Limit' },
                  { id: 'stop', label: 'Stop' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setOrderType(type.id)}
                    className={`flex-1 rounded-md font-semibold text-center transition-all ${
                      orderType === type.id ? 'bg-bg-elevated text-text-primary shadow-sm' : 'text-text-muted'
                    }`}
                    style={{ padding: '5px 0', fontSize: 10 }}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              {/* ── Lots ── */}
              <div style={{ marginBottom: 10 }}>
                <div className="flex items-center bg-bg-card rounded-lg border border-border" style={{ marginBottom: 5 }}>
                  <span className="text-text-muted font-medium shrink-0" style={{ fontSize: 9, padding: '0 8px' }}>Lots</span>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={lotSize}
                    onChange={(e) => { const v = parseFloat(e.target.value); if (v > 0) setLotSize(v); }}
                    className="bg-transparent text-text-primary font-bold tabular-nums w-full outline-none text-right"
                    style={{ fontSize: 12, padding: '7px 8px' }}
                  />
                </div>
                <div className="flex" style={{ gap: 3 }}>
                  {[0.01, 0.05, 0.1, 0.5, 1.0].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setLotSize(preset)}
                      className={`flex-1 rounded font-medium transition-all ${
                        lotSize === preset
                          ? tradeDirection === 'buy' ? 'bg-buy/[0.12] text-buy' : 'bg-sell/[0.12] text-sell'
                          : 'bg-bg-elevated text-text-muted hover:text-text-secondary'
                      }`}
                      style={{ padding: '3px 0', fontSize: 8 }}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Leverage ── */}
              <div style={{ marginBottom: 10 }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 5 }}>
                  <span className="text-text-muted font-medium" style={{ fontSize: 9 }}>Leverage</span>
                  <div className="flex items-center bg-bg-card rounded border border-border" style={{ padding: '2px 6px' }}>
                    <span className="text-text-muted" style={{ fontSize: 9 }}>1:</span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={leverageValue}
                      onChange={(e) => { const v = parseInt(e.target.value); if (v > 0) setLeverageValue(v); }}
                      className="bg-transparent text-accent font-bold tabular-nums outline-none text-right"
                      style={{ fontSize: 10, width: 36, padding: '1px 0' }}
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={500}
                  step={1}
                  value={leverageValue}
                  onChange={(e) => setLeverageValue(Number(e.target.value))}
                  className="leverage-slider w-full"
                  style={{ color: tradeDirection === 'buy' ? 'var(--color-buy)' : 'var(--color-sell)' }}
                />
                <div className="flex items-center justify-between" style={{ marginTop: 2 }}>
                  {[10, 50, 100, 200, 500].map((v) => (
                    <span key={v} className="text-text-muted" style={{ fontSize: 7 }}>{v}x</span>
                  ))}
                </div>
              </div>

              {/* ── Trade Info ── */}
              <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
                <span className="text-text-muted" style={{ fontSize: 9 }}>Margin: <span className="text-text-secondary font-medium tabular-nums">${(selectedPair.price * lotSize * 100000 / leverageValue).toFixed(2)}</span></span>
                <span className="text-text-muted" style={{ fontSize: 9 }}>Pip: <span className="text-text-secondary font-medium tabular-nums">${(lotSize * 10).toFixed(2)}</span></span>
              </div>

              {/* ── TP/SL Checkbox Toggle ── */}
              <button
                onClick={() => setShowTpSl(!showTpSl)}
                className="flex items-center transition-all"
                style={{ gap: 6, marginBottom: showTpSl ? 8 : 10 }}
              >
                <div className={`rounded border flex items-center justify-center transition-all ${showTpSl ? (tradeDirection === 'buy' ? 'bg-buy border-buy' : 'bg-sell border-sell') : 'border-border bg-bg-card'}`} style={{ width: 14, height: 14 }}>
                  {showTpSl && <span className="text-white font-bold" style={{ fontSize: 9, lineHeight: 1 }}>✓</span>}
                </div>
                <span className="text-text-muted font-medium" style={{ fontSize: 10 }}>TP/SL</span>
              </button>

              {/* ── TP/SL Inputs (collapsible) ── */}
              {showTpSl && (
                <div className="animate-slideDown flex flex-col" style={{ gap: 6, marginBottom: 10 }}>
                  <div className="flex items-center bg-bg-card rounded-lg border border-border" style={{ padding: '0 8px' }}>
                    <span className="text-buy font-semibold shrink-0" style={{ fontSize: 9, marginRight: 6 }}>TP</span>
                    <input
                      type="text"
                      placeholder={`e.g. ${(selectedPair.price * 1.003).toFixed(decimals)}`}
                      value={tp}
                      onChange={(e) => setTp(e.target.value)}
                      className="bg-transparent text-text-primary w-full outline-none tabular-nums"
                      style={{ fontSize: 11, padding: '6px 0' }}
                    />
                  </div>
                  <div className="flex items-center bg-bg-card rounded-lg border border-border" style={{ padding: '0 8px' }}>
                    <span className="text-sell font-semibold shrink-0" style={{ fontSize: 9, marginRight: 6 }}>SL</span>
                    <input
                      type="text"
                      placeholder={`e.g. ${(selectedPair.price * 0.997).toFixed(decimals)}`}
                      value={sl}
                      onChange={(e) => setSl(e.target.value)}
                      className="bg-transparent text-text-primary w-full outline-none tabular-nums"
                      style={{ fontSize: 11, padding: '6px 0' }}
                    />
                  </div>
                </div>
              )}

              {/* ── Auto Close (Net Profit Target) ── */}
              <button
                onClick={() => setShowNetTarget(!showNetTarget)}
                className="flex items-center transition-all"
                style={{ gap: 6, marginBottom: showNetTarget ? 8 : 10 }}
              >
                <div className={`rounded border flex items-center justify-center transition-all ${showNetTarget ? (tradeDirection === 'buy' ? 'bg-buy border-buy' : 'bg-sell border-sell') : 'border-border bg-bg-card'}`} style={{ width: 14, height: 14 }}>
                  {showNetTarget && <span className="text-white font-bold" style={{ fontSize: 9, lineHeight: 1 }}>✓</span>}
                </div>
                <span className="text-text-muted font-medium" style={{ fontSize: 10 }}>Auto Close (Net)</span>
              </button>

              {showNetTarget && (() => {
                const pipValue = lotSize * 10;
                const spreadCost = selectedPair.spread * pipValue;
                const commission = lotSize * 7; // $7 per lot (mock)
                const totalFee = spreadCost + commission;
                return (
                  <div className="animate-slideDown" style={{ marginBottom: 10 }}>
                    {/* Mode toggle: $ / % */}
                    <div className="flex bg-bg-secondary rounded-lg border border-border" style={{ gap: 2, padding: 2, marginBottom: 8 }}>
                      {['$', '%'].map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setNetTargetMode(mode)}
                          className={`flex-1 rounded-md font-semibold text-center transition-all ${
                            netTargetMode === mode ? 'bg-bg-elevated text-text-primary shadow-sm' : 'text-text-muted'
                          }`}
                          style={{ padding: '4px 0', fontSize: 10 }}
                        >
                          {mode === '$' ? 'Amount ($)' : 'Percent (%)'}
                        </button>
                      ))}
                    </div>

                    {/* Net Profit / Loss inputs */}
                    <div className="flex flex-col" style={{ gap: 5, marginBottom: 8 }}>
                      <div className="flex items-center bg-bg-card rounded-lg border border-border" style={{ padding: '0 8px' }}>
                        <span className="text-buy font-semibold shrink-0" style={{ fontSize: 9, marginRight: 6 }}>Profit</span>
                        <input
                          type="text"
                          placeholder={netTargetMode === '$' ? 'e.g. 50.00' : 'e.g. 2.5'}
                          value={netProfit}
                          onChange={(e) => setNetProfit(e.target.value)}
                          className="bg-transparent text-text-primary w-full outline-none tabular-nums text-right"
                          style={{ fontSize: 11, padding: '6px 0' }}
                        />
                        <span className="text-text-muted shrink-0" style={{ fontSize: 9, marginLeft: 4 }}>{netTargetMode}</span>
                      </div>
                      <div className="flex items-center bg-bg-card rounded-lg border border-border" style={{ padding: '0 8px' }}>
                        <span className="text-sell font-semibold shrink-0" style={{ fontSize: 9, marginRight: 6 }}>Loss</span>
                        <input
                          type="text"
                          placeholder={netTargetMode === '$' ? 'e.g. 25.00' : 'e.g. 1.0'}
                          value={netLoss}
                          onChange={(e) => setNetLoss(e.target.value)}
                          className="bg-transparent text-text-primary w-full outline-none tabular-nums text-right"
                          style={{ fontSize: 11, padding: '6px 0' }}
                        />
                        <span className="text-text-muted shrink-0" style={{ fontSize: 9, marginLeft: 4 }}>{netTargetMode}</span>
                      </div>
                    </div>

                    {/* Fee breakdown */}
                    <div className="bg-bg-card rounded-lg border border-border" style={{ padding: '6px 8px' }}>
                      <div className="flex items-center justify-between" style={{ marginBottom: 3 }}>
                        <span className="text-text-muted" style={{ fontSize: 8 }}>Spread cost</span>
                        <span className="text-text-secondary tabular-nums" style={{ fontSize: 8 }}>-${spreadCost.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between" style={{ marginBottom: 3 }}>
                        <span className="text-text-muted" style={{ fontSize: 8 }}>Commission</span>
                        <span className="text-text-secondary tabular-nums" style={{ fontSize: 8 }}>-${commission.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-border" style={{ paddingTop: 3 }}>
                        <span className="text-text-muted font-medium" style={{ fontSize: 8 }}>Total fees</span>
                        <span className="text-accent tabular-nums font-medium" style={{ fontSize: 8 }}>-${totalFee.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* ── Action Button (single, matches direction) ── */}
              <button
                className={`w-full ${tradeDirection === 'buy' ? 'bg-buy hover:shadow-[0_4px_20px_rgba(14,203,129,0.3)]' : 'bg-sell hover:shadow-[0_4px_20px_rgba(246,70,93,0.3)]'} active:scale-[0.97] text-white font-bold rounded-lg transition-all duration-200 flex items-center justify-center relative overflow-hidden group`}
                style={{ padding: '8px 0' }}
              >
                <div className={`absolute inset-0 bg-gradient-to-t ${tradeDirection === 'buy' ? 'from-buy-dark/30' : 'from-sell-dark/30'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                <span className="relative font-bold" style={{ fontSize: 11 }}>
                  {tradeDirection === 'buy' ? `Buy ${selectedPair.pair}` : `Sell ${selectedPair.pair}`}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Positions / Orders / History ── */}
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
                {allPositions.map((pos, i) => {
                  const pairData = forexPairs.find((p) => p.pair === pos.pair);
                  const spreadCost = pairData ? pairData.spread * pos.lots * 10 : 0;
                  const commission = pos.lots * 7;
                  const totalFee = spreadCost + commission;
                  const netPL = pos.pl - totalFee;
                  const margin = pairData ? pairData.price * pos.lots * 100000 / 100 : 0;
                  const netPct = margin > 0 ? (netPL / margin) * 100 : 0;
                  return (
                    <div key={i} className="gradient-card rounded-xl border border-border" style={{ padding: '10px 12px' }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center" style={{ gap: 8 }}>
                          <span className={`text-xs font-bold rounded px-1 py-0.5 ${pos.type === 'BUY' ? 'text-buy bg-buy/[0.12]' : 'text-sell bg-sell/[0.12]'}`}>
                            {pos.type}
                          </span>
                          <div>
                            <span className="text-text-primary font-semibold" style={{ fontSize: 12 }}>{pos.pair}</span>
                            <span className="text-text-muted block" style={{ fontSize: 9 }}>{pos.lots} lots @ {pos.openPrice}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`font-bold tabular-nums ${pos.pl >= 0 ? 'text-buy' : 'text-sell'}`} style={{ fontSize: 12 }}>
                            {pos.pl >= 0 ? '+' : ''}${pos.pl.toFixed(2)}
                          </span>
                          <span className="text-text-muted block" style={{ fontSize: 8 }}>gross</span>
                        </div>
                      </div>
                      {/* Net P/L after fees */}
                      <div className="flex items-center justify-between bg-bg-elevated/50 rounded-lg" style={{ padding: '5px 8px', marginTop: 6 }}>
                        <div className="flex items-center" style={{ gap: 6 }}>
                          <span className="text-text-muted" style={{ fontSize: 8 }}>Net</span>
                          <span className={`font-bold tabular-nums ${netPL >= 0 ? 'text-buy' : 'text-sell'}`} style={{ fontSize: 10 }}>
                            {netPL >= 0 ? '+' : ''}${netPL.toFixed(2)}
                          </span>
                          <span className={`tabular-nums ${netPL >= 0 ? 'text-buy' : 'text-sell'}`} style={{ fontSize: 8 }}>
                            ({netPct >= 0 ? '+' : ''}{netPct.toFixed(2)}%)
                          </span>
                          <span className="text-text-muted" style={{ fontSize: 7 }}>fees: -${totalFee.toFixed(2)}</span>
                        </div>
                        <button
                          onClick={() => {}}
                          className={`rounded font-semibold text-white transition-all active:scale-95 ${netPL >= 0 ? 'bg-buy' : 'bg-sell'}`}
                          style={{ padding: '3px 8px', fontSize: 8 }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  );
                })}
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

      {/* ── Copy Trade Suggestion ── */}
      <div className="shrink-0 border-t border-border" style={{ padding: '10px 16px' }}>
        <button className="flex items-center justify-between w-full" style={{ marginBottom: 8 }}>
          <span className="text-text-secondary font-medium" style={{ fontSize: 11 }}>You may be interested in · <span className="text-accent">Copy</span></span>
          <ChevronDown className="text-text-muted" style={{ width: 12, height: 12, transform: 'rotate(-90deg)' }} />
        </button>
        <div className="gradient-card rounded-xl border border-border" style={{ padding: '12px 14px' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
            <div className="flex items-center" style={{ gap: 8 }}>
              {/* Avatar */}
              <img
                src="https://i.pravatar.cc/64?img=12"
                alt="TraderKeng"
                className="rounded-full object-cover"
                style={{ width: 32, height: 32 }}
              />
              <div>
                <span className="text-text-primary font-semibold block" style={{ fontSize: 12 }}>TraderKeng</span>
                <span className="text-text-muted" style={{ fontSize: 9 }}>👥 148/200 copiers</span>
              </div>
            </div>
            <button className="bg-accent/[0.12] text-accent font-bold rounded-lg hover:bg-accent/[0.2] transition-all" style={{ padding: '5px 14px', fontSize: 10 }}>
              Copy
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-text-muted block" style={{ fontSize: 8 }}>30D PnL (USD)</span>
              <span className="text-buy font-bold tabular-nums" style={{ fontSize: 12 }}>+$12,847.50</span>
            </div>
            <div>
              <span className="text-text-muted block" style={{ fontSize: 8 }}>Win Rate</span>
              <span className="text-buy font-bold tabular-nums" style={{ fontSize: 12 }}>78.4%</span>
            </div>
            <div className="text-right">
              <span className="text-text-muted block" style={{ fontSize: 8 }}>30D ROI</span>
              <span className="text-buy font-bold tabular-nums" style={{ fontSize: 12 }}>+8.32%</span>
            </div>
          </div>
        </div>
      </div>

      </div>{/* end scrollable */}
    </div>
  );
}
