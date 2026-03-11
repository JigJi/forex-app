import { useState } from 'react';
import { Compass, Zap, Newspaper, CalendarDays, ChevronRight, X, MessageCircle, ThumbsUp, BarChart3, Share2, ArrowUpRight, ArrowDownRight, Users, Heart, Radio, Eye, Send, UserPlus, Wallet, TrendingUp } from 'lucide-react';
import { tradingSignals, marketNews, economicEvents, communityPosts, liveStreams } from '../data/mockData';
import MiniChart from '../components/MiniChart';
import CandlestickChart from '../components/CandlestickChart';

export default function DiscoverScreen() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [activeLive, setActiveLive] = useState(null);
  const [chatMsg, setChatMsg] = useState('');
  const [showHoldings, setShowHoldings] = useState(false);

  const impactDot = (impact) => {
    const color = impact === 'high' ? 'bg-sell' : impact === 'medium' ? 'bg-accent' : 'bg-text-muted';
    return <div className={`rounded-full ${color}`} style={{ width: 8, height: 8 }} />;
  };

  const eventsByDate = economicEvents.reduce((acc, event) => {
    if (!acc[event.date]) acc[event.date] = [];
    acc[event.date].push(event);
    return acc;
  }, {});

  const previewNews = marketNews.slice(0, 2);
  const previewEvents = economicEvents.slice(0, 3);

  return (
    <div className="h-full bg-bg-primary flex flex-col relative">
      {/* Header */}
      <div className="glass-strong shrink-0" style={{ padding: '12px 16px' }}>
        <div className="flex items-center" style={{ gap: 8 }}>
          <Compass className="text-accent" style={{ width: 18, height: 18 }} />
          <h2 className="text-text-primary font-bold" style={{ fontSize: 16 }}>Discover</h2>
        </div>
      </div>

      {/* Scrollable Feed */}
      <div className="flex-1 overflow-y-auto custom-scroll" style={{ padding: '12px 16px 24px' }}>

        {/* ── Live — horizontal scroll ── */}
        <div style={{ marginBottom: 16 }}>
          <SectionHeader icon={Radio} title="Live" subtitle={`${liveStreams.length} streaming`} onMore={() => setExpandedSection('live')} />
          <div className="flex overflow-x-auto custom-scroll" style={{ gap: 8, marginLeft: -16, marginRight: -16, paddingLeft: 16, paddingRight: 16 }}>
            {liveStreams.map((stream) => (
              <button
                key={stream.id}
                onClick={() => setActiveLive(stream)}
                className="gradient-card rounded-xl border border-border shrink-0 text-left hover:border-border-hover transition-all active:scale-[0.98] flex items-center"
                style={{ width: 240, padding: '8px 10px', gap: 10 }}
              >
                {/* Host photo */}
                <div className="relative shrink-0">
                  <div className="rounded-full overflow-hidden border-2 border-accent/20" style={{ width: 40, height: 40 }}>
                    <img src={stream.photo} alt={stream.host} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="absolute flex items-center bg-sell rounded" style={{ bottom: -2, left: '50%', transform: 'translateX(-50%)', padding: '0px 4px', gap: 2 }}>
                    <div className="rounded-full bg-white animate-pulse" style={{ width: 4, height: 4 }} />
                    <span className="text-white font-bold" style={{ fontSize: 7 }}>LIVE</span>
                  </div>
                </div>
                {/* Info */}
                <div className="flex-1" style={{ minWidth: 0 }}>
                  <div className="flex items-center" style={{ gap: 5, marginBottom: 2 }}>
                    <span className="text-text-primary font-semibold truncate" style={{ fontSize: 11 }}>{stream.host}</span>
                    <span className="text-accent font-bold shrink-0" style={{ fontSize: 9 }}>{stream.pair}</span>
                  </div>
                  <p className="text-text-secondary truncate" style={{ fontSize: 9 }}>{stream.title}</p>
                  <div className="flex items-center" style={{ gap: 6, marginTop: 3 }}>
                    <div className="flex items-center text-text-muted" style={{ gap: 2 }}>
                      <Eye style={{ width: 9, height: 9 }} />
                      <span style={{ fontSize: 8 }}>{stream.viewers > 1000 ? `${(stream.viewers / 1000).toFixed(1)}K` : stream.viewers}</span>
                    </div>
                    {stream.tags.map(tag => (
                      <span key={tag} className="text-accent bg-accent/[0.08] rounded font-medium" style={{ fontSize: 7, padding: '1px 4px' }}>{tag}</span>
                    ))}
                  </div>
                </div>
                {/* Mini chart */}
                <div className="shrink-0">
                  <MiniChart positive width={48} height={28} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Signals — horizontal scroll ── */}
        <div style={{ marginBottom: 16 }}>
          <SectionHeader icon={Zap} title="Signals" subtitle={`${tradingSignals.filter(s => s.status === 'active').length} active`} onMore={() => setExpandedSection('signals')} />
          <div className="flex overflow-x-auto custom-scroll" style={{ gap: 10, marginLeft: -16, marginRight: -16, paddingLeft: 16, paddingRight: 16 }}>
            {tradingSignals.map((signal) => (
              <SignalCardCompact key={signal.id} signal={signal} />
            ))}
          </div>
        </div>

        {/* ── News — compact list ── */}
        <div style={{ marginBottom: 16 }}>
          <SectionHeader icon={Newspaper} title="News" onMore={() => setExpandedSection('news')} />
          <div className="gradient-card rounded-xl border border-border overflow-hidden">
            {previewNews.map((news, i) => (
              <div key={news.id} className={`flex items-start ${i < previewNews.length - 1 ? 'border-b border-border/40' : ''}`} style={{ padding: '10px 12px', gap: 10 }}>
                <div className="flex-1" style={{ minWidth: 0 }}>
                  <div className="flex items-center" style={{ gap: 6, marginBottom: 3 }}>
                    <span className="text-text-muted" style={{ fontSize: 10 }}>{news.source}</span>
                    <span className="text-text-muted" style={{ fontSize: 9 }}>{news.timeAgo}</span>
                    {news.impact === 'high' && (
                      <span className="text-sell bg-sell-glow font-semibold rounded" style={{ fontSize: 8, padding: '0px 4px' }}>HOT</span>
                    )}
                  </div>
                  <p className="text-text-primary font-semibold" style={{ fontSize: 12, lineHeight: 1.4 }}>{news.headline}</p>
                  <div className="flex" style={{ gap: 4, marginTop: 4 }}>
                    {news.pairs.map(p => (
                      <span key={p} className="text-accent bg-accent/[0.08] rounded font-medium" style={{ fontSize: 9, padding: '1px 5px' }}>{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Calendar — compact ── */}
        <div style={{ marginBottom: 16 }}>
          <SectionHeader icon={CalendarDays} title="Calendar" subtitle={`${economicEvents.filter(e => !e.actual).length} upcoming`} onMore={() => setExpandedSection('calendar')} />
          <div className="gradient-card rounded-xl border border-border overflow-hidden">
            {previewEvents.map((event, i) => (
              <CalendarRow key={event.id} event={event} impactDot={impactDot} isLast={i === previewEvents.length - 1} />
            ))}
          </div>
        </div>

        {/* ── Community — horizontal scroll ── */}
        <div>
          <SectionHeader icon={Users} title="Community" subtitle={`${communityPosts.length} posts`} onMore={() => setExpandedSection('community')} />
          <div className="flex overflow-x-auto custom-scroll" style={{ gap: 10, marginLeft: -16, marginRight: -16, paddingLeft: 16, paddingRight: 16 }}>
            {communityPosts.map((post) => (
              <CommunityCardCompact key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Full-screen Popup Overlay ── */}
      {expandedSection && (
        <div className="absolute inset-0 bg-bg-primary z-50 flex flex-col animate-slideUp">
          <div className="glass-strong shrink-0 flex items-center justify-between" style={{ padding: '14px 20px' }}>
            <div className="flex items-center" style={{ gap: 8 }}>
              {expandedSection === 'live' && <Radio className="text-sell" style={{ width: 18, height: 18 }} />}
              {expandedSection === 'signals' && <Zap className="text-accent" style={{ width: 18, height: 18 }} />}
              {expandedSection === 'news' && <Newspaper className="text-accent" style={{ width: 18, height: 18 }} />}
              {expandedSection === 'calendar' && <CalendarDays className="text-accent" style={{ width: 18, height: 18 }} />}
              {expandedSection === 'community' && <Users className="text-accent" style={{ width: 18, height: 18 }} />}
              <h3 className="text-text-primary font-bold" style={{ fontSize: 16 }}>
                {expandedSection === 'live' && 'Live Streams'}
                {expandedSection === 'signals' && 'Trading Signals'}
                {expandedSection === 'news' && 'Market News'}
                {expandedSection === 'calendar' && 'Economic Calendar'}
                {expandedSection === 'community' && 'Community'}
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
            {expandedSection === 'live' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {liveStreams.map((stream) => (
                  <button
                    key={stream.id}
                    onClick={() => { setExpandedSection(null); setActiveLive(stream); }}
                    className="gradient-card rounded-xl border border-border flex items-center hover:border-border-hover transition-all active:scale-[0.98] text-left"
                    style={{ padding: '10px 12px', gap: 12 }}
                  >
                    {/* Thumbnail */}
                    <div className="relative bg-bg-elevated rounded-lg shrink-0 flex items-center justify-center" style={{ width: 80, height: 56, overflow: 'hidden' }}>
                      <MiniChart positive width={70} height={40} />
                      <div className="absolute flex items-center bg-sell rounded" style={{ top: 3, left: 3, padding: '1px 4px', gap: 2 }}>
                        <div className="rounded-full bg-white animate-pulse" style={{ width: 4, height: 4 }} />
                        <span className="text-white font-bold" style={{ fontSize: 7 }}>LIVE</span>
                      </div>
                    </div>
                    {/* Info */}
                    <div className="flex-1" style={{ minWidth: 0 }}>
                      <div className="flex items-center" style={{ gap: 6, marginBottom: 3 }}>
                        <div className="rounded-full overflow-hidden shrink-0" style={{ width: 24, height: 24 }}>
                          <img src={stream.photo} alt={stream.host} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <span className="text-text-primary font-semibold" style={{ fontSize: 11 }}>{stream.host}</span>
                        <span className="text-accent font-bold" style={{ fontSize: 10 }}>{stream.pair}</span>
                      </div>
                      <p className="text-text-secondary truncate" style={{ fontSize: 10 }}>{stream.title}</p>
                      <div className="flex items-center" style={{ gap: 8, marginTop: 4 }}>
                        <div className="flex items-center text-text-muted" style={{ gap: 3 }}>
                          <Eye style={{ width: 10, height: 10 }} />
                          <span style={{ fontSize: 9 }}>{stream.viewers > 1000 ? `${(stream.viewers / 1000).toFixed(1)}K` : stream.viewers}</span>
                        </div>
                        {stream.tags.map(tag => (
                          <span key={tag} className="text-accent bg-accent/[0.08] rounded font-medium" style={{ fontSize: 8, padding: '1px 5px' }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {expandedSection === 'signals' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {tradingSignals.map((signal) => (
                  <SignalCardCompact key={signal.id} signal={signal} fluid />
                ))}
              </div>
            )}

            {expandedSection === 'news' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {marketNews.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            )}

            {expandedSection === 'calendar' && (
              <div>
                {Object.entries(eventsByDate).map(([date, events]) => (
                  <div key={date} style={{ marginBottom: 20 }}>
                    <h4 className="text-text-secondary text-xs font-semibold uppercase tracking-wider" style={{ marginBottom: 10, paddingLeft: 4 }}>
                      {date}
                    </h4>
                    <div className="gradient-card rounded-2xl border border-border overflow-hidden">
                      {events.map((event, i) => (
                        <CalendarRow key={event.id} event={event} impactDot={impactDot} isLast={i === events.length - 1} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {expandedSection === 'community' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {communityPosts.map((post) => (
                  <CommunityCardFull key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Live Stream Full-screen Popup ── */}
      {activeLive && (
        <div className="absolute inset-0 bg-bg-primary z-[60] flex flex-col animate-slideUp">
          {/* Header */}
          <div className="glass-strong shrink-0 flex items-center justify-between" style={{ padding: '10px 16px' }}>
            <div className="flex items-center" style={{ gap: 8 }}>
              <div className="relative">
                <div className="rounded-full overflow-hidden border-2 border-accent/30" style={{ width: 36, height: 36 }}>
                  <img src={activeLive.photo} alt={activeLive.host} className="w-full h-full object-cover" />
                </div>
                <div className="absolute bg-sell rounded-full border-2 border-bg-primary" style={{ bottom: -1, right: -1, width: 10, height: 10 }} />
              </div>
              <div>
                <div className="flex items-center" style={{ gap: 6 }}>
                  <span className="text-text-primary font-bold" style={{ fontSize: 13 }}>{activeLive.host}</span>
                  <div className="flex items-center bg-sell/20 rounded" style={{ padding: '1px 5px', gap: 3 }}>
                    <div className="rounded-full bg-sell animate-pulse" style={{ width: 5, height: 5 }} />
                    <span className="text-sell font-bold" style={{ fontSize: 8 }}>LIVE</span>
                  </div>
                </div>
                <div className="flex items-center text-text-muted" style={{ gap: 8, marginTop: 1 }}>
                  <span style={{ fontSize: 10 }}>
                    <Eye style={{ width: 10, height: 10, display: 'inline', verticalAlign: 'middle', marginRight: 2 }} />
                    {activeLive.viewers > 1000 ? `${(activeLive.viewers / 1000).toFixed(1)}K` : activeLive.viewers}
                  </span>
                  <span style={{ fontSize: 10 }}>{activeLive.startedAgo}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center" style={{ gap: 8 }}>
              <button className="btn-primary rounded-lg font-bold flex items-center" style={{ padding: '6px 12px', fontSize: 10, gap: 4 }}>
                <UserPlus style={{ width: 12, height: 12 }} />
                Follow
              </button>
              <button
                onClick={() => { setActiveLive(null); setShowHoldings(false); }}
                className="rounded-lg bg-bg-elevated border border-border flex items-center justify-center hover:bg-bg-card transition-colors"
                style={{ width: 32, height: 32 }}
              >
                <X className="text-text-secondary" style={{ width: 16, height: 16 }} />
              </button>
            </div>
          </div>

          {/* Stream Title Bar */}
          <div className="border-b border-border flex items-center justify-between" style={{ padding: '6px 16px' }}>
            <p className="text-text-secondary font-medium truncate" style={{ fontSize: 10, flex: 1, marginRight: 8 }}>{activeLive.title}</p>
            <div className="flex items-center shrink-0" style={{ gap: 4 }}>
              {activeLive.tags.map(tag => (
                <span key={tag} className="text-accent bg-accent/[0.08] rounded font-medium" style={{ fontSize: 8, padding: '1px 6px' }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Chart Area */}
          <div className="border-b border-border relative" style={{ padding: '8px 8px' }}>
            <CandlestickChart />
            {/* Holdings button overlay */}
            <button
              onClick={() => setShowHoldings(!showHoldings)}
              className="absolute flex items-center bg-bg-elevated/90 border border-border rounded-lg hover:bg-bg-card transition-colors"
              style={{ top: 12, right: 12, padding: '5px 10px', gap: 5 }}
            >
              <Wallet className="text-accent" style={{ width: 12, height: 12 }} />
              <span className="text-text-primary font-semibold" style={{ fontSize: 10 }}>Holdings</span>
              {activeLive.holdings.length > 0 && (
                <span className="text-accent font-bold" style={{ fontSize: 10 }}>({activeLive.holdings.length})</span>
              )}
            </button>

            {/* Holdings Popup */}
            {showHoldings && activeLive.holdings.length > 0 && (
              <div className="absolute bg-bg-elevated border border-border rounded-xl shadow-lg" style={{ top: 42, right: 12, width: 220, padding: 10, zIndex: 10 }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                  <span className="text-text-primary font-bold" style={{ fontSize: 11 }}>Host Holdings</span>
                  <span className="text-buy font-bold" style={{ fontSize: 11 }}>
                    +${activeLive.holdings.reduce((sum, h) => sum + h.pnl, 0).toFixed(2)}
                  </span>
                </div>
                {activeLive.holdings.map((h, i) => (
                  <div key={i} className={`flex items-center justify-between ${i < activeLive.holdings.length - 1 ? 'border-b border-border/40' : ''}`} style={{ padding: '6px 0' }}>
                    <div>
                      <div className="flex items-center" style={{ gap: 4 }}>
                        <span className="text-text-primary font-semibold" style={{ fontSize: 10 }}>{h.pair}</span>
                        <span className={`font-bold ${h.direction === 'BUY' ? 'text-buy' : 'text-sell'}`} style={{ fontSize: 8 }}>{h.direction}</span>
                      </div>
                      <span className="text-text-muted" style={{ fontSize: 9 }}>{h.lots} lots @ {h.entry}</span>
                    </div>
                    <span className={`font-bold tabular-nums ${h.pnl >= 0 ? 'text-buy' : 'text-sell'}`} style={{ fontSize: 11 }}>
                      {h.pnl >= 0 ? '+' : ''}{h.pnl.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Viewer Avatars Row */}
          <div className="border-b border-border flex items-center" style={{ padding: '8px 16px', gap: 6 }}>
            <div className="rounded-full overflow-hidden border-2 border-accent/30 shrink-0" style={{ width: 32, height: 32 }}>
              <img src={activeLive.photo} alt={activeLive.host} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center" style={{ marginLeft: -4 }}>
              {activeLive.chat.slice(0, 5).map((msg, i) => (
                <div key={i} className="rounded-full overflow-hidden border-2 border-bg-primary shrink-0" style={{ width: 26, height: 26, marginLeft: i > 0 ? -6 : 0 }}>
                  <img src={msg.photo} alt={msg.user} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
              {activeLive.chat.length > 5 && (
                <div className="rounded-full bg-bg-elevated border-2 border-bg-primary flex items-center justify-center shrink-0" style={{ width: 26, height: 26, marginLeft: -6 }}>
                  <span className="text-text-muted font-bold" style={{ fontSize: 8 }}>+{activeLive.chat.length - 5}</span>
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col" style={{ minHeight: 0 }}>
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto custom-scroll" style={{ padding: '8px 16px' }}>
              {activeLive.chat.map((msg, i) => (
                <div key={i} className="flex items-start" style={{ marginBottom: 8, gap: 8 }}>
                  <div className="rounded-full overflow-hidden shrink-0" style={{ width: 22, height: 22 }}>
                    <img src={msg.photo} alt={msg.user} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1" style={{ minWidth: 0 }}>
                    <div className="flex items-baseline" style={{ gap: 6 }}>
                      <span className="text-accent font-semibold shrink-0" style={{ fontSize: 10 }}>{msg.user}</span>
                      <span className="text-text-muted shrink-0" style={{ fontSize: 8 }}>{msg.time}</span>
                    </div>
                    <span className="text-text-secondary" style={{ fontSize: 10 }}>{msg.msg}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="border-t border-border flex items-center" style={{ padding: '8px 12px', gap: 8 }}>
              <input
                type="text"
                placeholder="Follow host to chat..."
                value={chatMsg}
                onChange={(e) => setChatMsg(e.target.value)}
                className="flex-1 bg-bg-input border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40 transition-all"
                style={{ padding: '8px 12px', fontSize: 11 }}
              />
              <button className="rounded-lg bg-accent flex items-center justify-center shrink-0" style={{ width: 34, height: 34 }}>
                <Send className="text-bg-primary" style={{ width: 14, height: 14 }} />
              </button>
            </div>

            {/* Reactions Bar */}
            <div className="border-t border-border flex items-center justify-between" style={{ padding: '6px 16px' }}>
              <div className="flex items-center" style={{ gap: 6 }}>
                {['🔥', '👍', '🚀', '💰', '📈'].map((emoji) => (
                  <button key={emoji} className="bg-bg-elevated border border-border rounded-full hover:bg-bg-card transition-colors flex items-center justify-center" style={{ width: 30, height: 30 }}>
                    <span style={{ fontSize: 13 }}>{emoji}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center text-text-muted" style={{ gap: 4 }}>
                <Users style={{ width: 12, height: 12 }} />
                <span style={{ fontSize: 10 }}>{activeLive.followers > 1000 ? `${(activeLive.followers / 1000).toFixed(1)}K` : activeLive.followers} followers</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Shared Section Header ── */

function SectionHeader({ icon: Icon, title, subtitle, onMore }) {
  return (
    <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
      <div className="flex items-center" style={{ gap: 8 }}>
        <Icon className="text-accent" style={{ width: 15, height: 15 }} />
        <h3 className="text-text-primary font-bold" style={{ fontSize: 13 }}>{title}</h3>
        {subtitle && <span className="text-text-muted" style={{ fontSize: 10 }}>{subtitle}</span>}
      </div>
      <button onClick={onMore} className="flex items-center text-accent font-semibold hover:text-accent-dark transition-colors" style={{ fontSize: 11, gap: 2 }}>
        All <ChevronRight style={{ width: 13, height: 13 }} />
      </button>
    </div>
  );
}

/* ── Sub-components ── */

function SignalCardCompact({ signal, fluid }) {
  const isBuy = signal.direction === 'BUY';
  const statusLabel = signal.status === 'active' ? 'Active' : signal.status === 'tp_hit' ? 'TP Hit' : 'SL Hit';
  const statusColor = signal.status === 'active' ? 'text-accent' : signal.status === 'tp_hit' ? 'text-buy' : 'text-sell';

  return (
    <div className={`gradient-card rounded-xl border border-border flex items-center ${fluid ? '' : 'shrink-0'}`} style={{ width: fluid ? 'auto' : 220, padding: '8px 10px', gap: 10 }}>
      {/* Left: Pair + Direction + Status */}
      <div className="shrink-0" style={{ minWidth: 52 }}>
        <div className="flex items-center" style={{ gap: 4, marginBottom: 3 }}>
          <span className="text-text-primary font-bold" style={{ fontSize: 11 }}>{signal.pair}</span>
        </div>
        <div className={`flex items-center rounded ${isBuy ? 'bg-buy/[0.12]' : 'bg-sell/[0.12]'}`} style={{ padding: '1px 5px', gap: 2, width: 'fit-content' }}>
          {isBuy ? <ArrowUpRight className="text-buy" style={{ width: 9, height: 9 }} /> : <ArrowDownRight className="text-sell" style={{ width: 9, height: 9 }} />}
          <span className={`font-bold ${isBuy ? 'text-buy' : 'text-sell'}`} style={{ fontSize: 8 }}>{signal.direction}</span>
        </div>
        <span className={`font-semibold ${statusColor}`} style={{ fontSize: 8, marginTop: 2, display: 'block' }}>{statusLabel}</span>
      </div>
      {/* Center: Entry / TP / SL inline */}
      <div className="flex-1" style={{ minWidth: 0 }}>
        <div className="flex items-center" style={{ gap: 8 }}>
          <div>
            <span className="text-text-muted block" style={{ fontSize: 7 }}>Entry</span>
            <span className="text-text-primary tabular-nums font-medium" style={{ fontSize: 9 }}>{signal.entry}</span>
          </div>
          <div>
            <span className="text-text-muted block" style={{ fontSize: 7 }}>TP</span>
            <span className="text-buy tabular-nums font-medium" style={{ fontSize: 9 }}>{signal.tp}</span>
          </div>
          <div>
            <span className="text-text-muted block" style={{ fontSize: 7 }}>SL</span>
            <span className="text-sell tabular-nums font-medium" style={{ fontSize: 9 }}>{signal.sl}</span>
          </div>
        </div>
      </div>
      {/* Right: Mini chart */}
      <div className="shrink-0">
        <MiniChart positive={isBuy} width={44} height={24} />
      </div>
    </div>
  );
}

function NewsCard({ news }) {
  return (
    <div className="gradient-card rounded-2xl border border-border" style={{ padding: 16 }}>
      <div className="flex items-center" style={{ gap: 10, marginBottom: 10 }}>
        <div className="rounded-full gradient-gold-subtle flex items-center justify-center border border-accent/10" style={{ width: 32, height: 32 }}>
          <span className="text-accent font-bold" style={{ fontSize: 10 }}>{news.sourceAvatar}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center" style={{ gap: 6 }}>
            <span className="text-text-primary text-xs font-bold">{news.source}</span>
            {news.impact === 'high' && (
              <span className="text-sell bg-sell-glow font-semibold rounded" style={{ fontSize: 8, padding: '1px 5px' }}>HOT</span>
            )}
          </div>
          <span className="text-text-muted" style={{ fontSize: 10 }}>{news.timeAgo}</span>
        </div>
      </div>
      <p className="text-text-primary font-semibold" style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 8 }}>{news.headline}</p>
      <p className="text-text-secondary" style={{ fontSize: 11, lineHeight: 1.5, marginBottom: 10 }}>{news.summary}</p>
      <div className="flex flex-wrap" style={{ gap: 6, marginBottom: 12 }}>
        {news.pairs.map(p => (
          <span key={p} className="text-accent bg-accent/[0.08] rounded-md font-semibold" style={{ fontSize: 10, padding: '3px 8px' }}>{p}</span>
        ))}
      </div>
      <div className="flex items-center border-t border-border/40" style={{ paddingTop: 10 }}>
        {[
          { icon: MessageCircle, val: news.comments },
          { icon: ThumbsUp, val: news.likes },
          { icon: BarChart3, val: news.views },
          { icon: Share2 },
        ].map((btn, i) => (
          <button key={i} className="flex-1 flex items-center justify-center text-text-muted hover:text-text-secondary transition-colors" style={{ gap: 5 }}>
            <btn.icon style={{ width: 13, height: 13 }} />
            {btn.val && <span style={{ fontSize: 11 }}>{btn.val}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function CommunityCardCompact({ post }) {
  return (
    <div className="gradient-card rounded-xl border border-border shrink-0" style={{ width: 200, padding: 0, overflow: 'hidden' }}>
      <div className="relative" style={{ height: 100 }}>
        <img src={post.image} alt="" className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div style={{ padding: '8px 10px 10px' }}>
        <div className="flex items-center" style={{ gap: 6, marginBottom: 4 }}>
          <div className="rounded-full overflow-hidden shrink-0" style={{ width: 20, height: 20 }}>
            <img src={post.photo} alt={post.user} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <span className="text-text-primary font-semibold" style={{ fontSize: 10 }}>{post.user}</span>
          <span className="text-text-muted ml-auto" style={{ fontSize: 9 }}>{post.timeAgo}</span>
        </div>
        <p className="text-text-secondary" style={{ fontSize: 10, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {post.text}
        </p>
        <div className="flex items-center" style={{ gap: 10, marginTop: 6 }}>
          <div className="flex items-center text-text-muted" style={{ gap: 3 }}>
            <Heart style={{ width: 10, height: 10 }} />
            <span style={{ fontSize: 9 }}>{post.likes}</span>
          </div>
          <div className="flex items-center text-text-muted" style={{ gap: 3 }}>
            <MessageCircle style={{ width: 10, height: 10 }} />
            <span style={{ fontSize: 9 }}>{post.comments}</span>
          </div>
          {post.pairs.map(p => (
            <span key={p} className="text-accent font-medium" style={{ fontSize: 8 }}>{p}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommunityCardFull({ post }) {
  return (
    <div className="gradient-card rounded-2xl border border-border overflow-hidden">
      <div className="relative" style={{ height: 180 }}>
        <img src={post.image} alt="" className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div style={{ padding: '12px 14px 14px' }}>
        <div className="flex items-center" style={{ gap: 8, marginBottom: 8 }}>
          <div className="rounded-full overflow-hidden shrink-0" style={{ width: 28, height: 28 }}>
            <img src={post.photo} alt={post.user} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="flex-1">
            <span className="text-text-primary font-bold" style={{ fontSize: 12 }}>{post.user}</span>
            <span className="text-text-muted block" style={{ fontSize: 10 }}>{post.timeAgo}</span>
          </div>
        </div>
        <p className="text-text-secondary" style={{ fontSize: 12, lineHeight: 1.5, marginBottom: 10 }}>{post.text}</p>
        <div className="flex flex-wrap" style={{ gap: 5, marginBottom: 10 }}>
          {post.pairs.map(p => (
            <span key={p} className="text-accent bg-accent/[0.08] rounded font-medium" style={{ fontSize: 10, padding: '2px 7px' }}>{p}</span>
          ))}
        </div>
        <div className="flex items-center border-t border-border/40" style={{ paddingTop: 10 }}>
          <button className="flex-1 flex items-center justify-center text-text-muted hover:text-sell transition-colors" style={{ gap: 5 }}>
            <Heart style={{ width: 14, height: 14 }} />
            <span style={{ fontSize: 11 }}>{post.likes}</span>
          </button>
          <button className="flex-1 flex items-center justify-center text-text-muted hover:text-text-secondary transition-colors" style={{ gap: 5 }}>
            <MessageCircle style={{ width: 14, height: 14 }} />
            <span style={{ fontSize: 11 }}>{post.comments}</span>
          </button>
          <button className="flex-1 flex items-center justify-center text-text-muted hover:text-text-secondary transition-colors" style={{ gap: 5 }}>
            <Share2 style={{ width: 14, height: 14 }} />
          </button>
        </div>
      </div>
    </div>
  );
}

function CalendarRow({ event, impactDot, isLast }) {
  return (
    <div className={`flex items-center ${!isLast ? 'border-b border-border/40' : ''}`} style={{ padding: '8px 12px', gap: 8 }}>
      <div className="flex items-center" style={{ gap: 6, minWidth: 64 }}>
        {impactDot(event.impact)}
        <span style={{ fontSize: 14 }}>{event.flag}</span>
        <span className="text-text-muted" style={{ fontSize: 9 }}>{event.time.replace(' GMT', '')}</span>
      </div>
      <div className="flex-1" style={{ minWidth: 0 }}>
        <p className="text-text-primary font-semibold truncate" style={{ fontSize: 10 }}>{event.event}</p>
      </div>
      <div className="flex items-center shrink-0" style={{ gap: 10 }}>
        <p className="text-text-secondary font-medium tabular-nums" style={{ fontSize: 10 }}>{event.previous}</p>
        <p className="text-text-secondary font-medium tabular-nums" style={{ fontSize: 10 }}>{event.forecast}</p>
        <p className={`font-bold tabular-nums ${event.actual ? 'text-text-primary' : 'text-text-muted'}`} style={{ fontSize: 10, minWidth: 28, textAlign: 'right' }}>
          {event.actual || '—'}
        </p>
      </div>
    </div>
  );
}
