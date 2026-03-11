export const forexPairs = [
  { pair: 'EUR/USD', price: 1.0847, change: +0.23, spread: 0.8, volume: '2.1B', sentiment: { buy: 62, sell: 38 } },
  { pair: 'GBP/USD', price: 1.2634, change: -0.15, spread: 1.2, volume: '1.8B', sentiment: { buy: 45, sell: 55 } },
  { pair: 'USD/JPY', price: 149.82, change: +0.41, spread: 0.9, volume: '1.5B', sentiment: { buy: 58, sell: 42 } },
  { pair: 'AUD/USD', price: 0.6543, change: -0.32, spread: 1.1, volume: '890M', sentiment: { buy: 40, sell: 60 } },
  { pair: 'USD/CHF', price: 0.8821, change: +0.08, spread: 1.3, volume: '720M', sentiment: { buy: 51, sell: 49 } },
  { pair: 'NZD/USD', price: 0.6102, change: -0.19, spread: 1.5, volume: '450M', sentiment: { buy: 44, sell: 56 } },
  { pair: 'USD/CAD', price: 1.3567, change: +0.12, spread: 1.4, volume: '680M', sentiment: { buy: 55, sell: 45 } },
  { pair: 'EUR/GBP', price: 0.8587, change: +0.05, spread: 1.0, volume: '520M', sentiment: { buy: 48, sell: 52 } },
];

export const topTraders = [
  { name: 'Alex M.', profit: '+12.4%', trades: 142, avatar: 'AM', winRate: 78 },
  { name: 'Sarah K.', profit: '+9.8%', trades: 98, avatar: 'SK', winRate: 72 },
  { name: 'Mike R.', profit: '+8.2%', trades: 215, avatar: 'MR', winRate: 69 },
  { name: 'Elena V.', profit: '+7.5%', trades: 67, avatar: 'EV', winRate: 81 },
  { name: 'James L.', profit: '+6.9%', trades: 183, avatar: 'JL', winRate: 65 },
];

export const topMovers = [
  { pair: 'GBP/JPY', price: 189.42, change: +1.12, direction: 'up' },
  { pair: 'EUR/JPY', price: 162.35, change: +0.87, direction: 'up' },
  { pair: 'USD/JPY', price: 149.82, change: +0.41, direction: 'up' },
  { pair: 'XAU/USD', price: 2638.50, change: +0.38, direction: 'up' },
  { pair: 'AUD/USD', price: 0.6543, change: -0.32, direction: 'down' },
  { pair: 'NZD/JPY', price: 91.35, change: -0.45, direction: 'down' },
  { pair: 'EUR/CHF', price: 0.9570, change: -0.52, direction: 'down' },
  { pair: 'GBP/CHF', price: 1.1145, change: -0.68, direction: 'down' },
];

export const marketSessions = [
  { name: 'Sydney', open: '22:00', close: '07:00', flag: '🇦🇺', active: false },
  { name: 'Tokyo', open: '00:00', close: '09:00', flag: '🇯🇵', active: true },
  { name: 'London', open: '08:00', close: '17:00', flag: '🇬🇧', active: true },
  { name: 'New York', open: '13:00', close: '22:00', flag: '🇺🇸', active: true },
];

export const generateCandlestickData = () => {
  const data = [];
  let basePrice = 1.0820;
  for (let i = 0; i < 40; i++) {
    const open = basePrice + (Math.random() - 0.5) * 0.003;
    const close = open + (Math.random() - 0.5) * 0.004;
    const high = Math.max(open, close) + Math.random() * 0.002;
    const low = Math.min(open, close) - Math.random() * 0.002;
    data.push({ open, close, high, low, time: i });
    basePrice = close;
  }
  return data;
};

export const generateMiniChartData = () => {
  const points = [];
  let value = 1.0820;
  for (let i = 0; i < 30; i++) {
    value += (Math.random() - 0.48) * 0.002;
    points.push(value);
  }
  return points;
};

export const leverageOptions = ['1:10', '1:50', '1:100', '1:200', '1:500'];

export const walletData = {
  balance: 12847.53,
  equity: 13102.18,
  freeMargin: 9845.32,
  marginLevel: 342.5,
  openPositions: 3,
  todayPL: +234.67,
};

export const openPositions = [
  { pair: 'EUR/USD', type: 'BUY', lots: 0.5, openPrice: 1.0823, currentPrice: 1.0847, pl: +120.00 },
  { pair: 'GBP/USD', type: 'SELL', lots: 0.3, openPrice: 1.2650, currentPrice: 1.2634, pl: +48.00 },
  { pair: 'USD/JPY', type: 'BUY', lots: 0.2, openPrice: 149.50, currentPrice: 149.82, pl: +66.67 },
];

export const tradingSignals = [
  { id: 1, pair: 'EUR/USD', direction: 'BUY', entry: 1.0835, tp: 1.0890, sl: 1.0800, analyst: 'Alex M.', avatar: 'AM', winRate: 78, status: 'active', timeAgo: '2h ago' },
  { id: 2, pair: 'GBP/USD', direction: 'SELL', entry: 1.2660, tp: 1.2590, sl: 1.2710, analyst: 'Sarah K.', avatar: 'SK', winRate: 72, status: 'active', timeAgo: '4h ago' },
  { id: 3, pair: 'USD/JPY', direction: 'BUY', entry: 149.50, tp: 150.20, sl: 149.00, analyst: 'Elena V.', avatar: 'EV', winRate: 81, status: 'tp_hit', timeAgo: '6h ago' },
  { id: 4, pair: 'AUD/USD', direction: 'SELL', entry: 0.6560, tp: 0.6500, sl: 0.6600, analyst: 'Mike R.', avatar: 'MR', winRate: 69, status: 'active', timeAgo: '8h ago' },
  { id: 5, pair: 'EUR/GBP', direction: 'BUY', entry: 0.8575, tp: 0.8620, sl: 0.8545, analyst: 'James L.', avatar: 'JL', winRate: 65, status: 'sl_hit', timeAgo: '12h ago' },
  { id: 6, pair: 'USD/CHF', direction: 'SELL', entry: 0.8840, tp: 0.8780, sl: 0.8890, analyst: 'Alex M.', avatar: 'AM', winRate: 78, status: 'active', timeAgo: '1h ago' },
  { id: 7, pair: 'NZD/USD', direction: 'BUY', entry: 0.6090, tp: 0.6150, sl: 0.6050, analyst: 'Sarah K.', avatar: 'SK', winRate: 72, status: 'active', timeAgo: '3h ago' },
  { id: 8, pair: 'USD/CAD', direction: 'SELL', entry: 1.3580, tp: 1.3510, sl: 1.3640, analyst: 'Elena V.', avatar: 'EV', winRate: 81, status: 'active', timeAgo: '5h ago' },
  { id: 9, pair: 'EUR/JPY', direction: 'BUY', entry: 162.30, tp: 163.10, sl: 161.70, analyst: 'Mike R.', avatar: 'MR', winRate: 69, status: 'tp_hit', timeAgo: '7h ago' },
  { id: 10, pair: 'GBP/JPY', direction: 'SELL', entry: 189.40, tp: 188.50, sl: 190.10, analyst: 'James L.', avatar: 'JL', winRate: 65, status: 'active', timeAgo: '9h ago' },
  { id: 11, pair: 'AUD/JPY', direction: 'BUY', entry: 97.80, tp: 98.50, sl: 97.20, analyst: 'Alex M.', avatar: 'AM', winRate: 78, status: 'active', timeAgo: '10h ago' },
  { id: 12, pair: 'CHF/JPY', direction: 'SELL', entry: 169.90, tp: 169.10, sl: 170.60, analyst: 'Elena V.', avatar: 'EV', winRate: 81, status: 'sl_hit', timeAgo: '11h ago' },
  { id: 13, pair: 'EUR/AUD', direction: 'BUY', entry: 1.6580, tp: 1.6670, sl: 1.6510, analyst: 'Sarah K.', avatar: 'SK', winRate: 72, status: 'active', timeAgo: '13h ago' },
  { id: 14, pair: 'GBP/AUD', direction: 'SELL', entry: 1.9310, tp: 1.9200, sl: 1.9400, analyst: 'Mike R.', avatar: 'MR', winRate: 69, status: 'active', timeAgo: '14h ago' },
  { id: 15, pair: 'EUR/NZD', direction: 'BUY', entry: 1.7780, tp: 1.7880, sl: 1.7700, analyst: 'James L.', avatar: 'JL', winRate: 65, status: 'tp_hit', timeAgo: '16h ago' },
  { id: 16, pair: 'XAU/USD', direction: 'BUY', entry: 2635.50, tp: 2665.00, sl: 2610.00, analyst: 'Elena V.', avatar: 'EV', winRate: 81, status: 'active', timeAgo: '30m ago' },
];

export const marketNews = [
  { id: 1, headline: 'Fed Signals Potential Rate Cut in June Meeting', source: 'Reuters', sourceAvatar: 'R', timeAgo: '30m ago', impact: 'high', pairs: ['EUR/USD', 'GBP/USD'], summary: 'Federal Reserve officials hinted at a possible interest rate reduction during the upcoming June FOMC meeting, citing cooling inflation data and labor market softening.', views: '32.5K', comments: 48, likes: 215 },
  { id: 2, headline: 'UK GDP Growth Beats Expectations at 0.4%', source: 'Bloomberg', sourceAvatar: 'B', timeAgo: '1h ago', impact: 'high', pairs: ['GBP/USD', 'EUR/GBP'], summary: 'The UK economy grew by 0.4% in the latest quarter, surpassing market expectations of 0.2%, driven by strong services sector performance.', views: '18.2K', comments: 23, likes: 142 },
  { id: 3, headline: 'BOJ Governor Hints at Policy Normalization', source: 'Nikkei', sourceAvatar: 'N', timeAgo: '3h ago', impact: 'medium', pairs: ['USD/JPY'], summary: 'Bank of Japan Governor suggested that further monetary policy adjustments could come if inflation remains above the 2% target sustainably.', views: '12.8K', comments: 15, likes: 89 },
  { id: 4, headline: 'Australian Employment Data Shows Mixed Signals', source: 'AFR', sourceAvatar: 'A', timeAgo: '5h ago', impact: 'medium', pairs: ['AUD/USD'], summary: 'Australia added 25,000 jobs last month but the unemployment rate ticked up to 4.1%, creating uncertainty about the RBA\'s next move.', views: '8.4K', comments: 11, likes: 56 },
  { id: 5, headline: 'ECB Officials Maintain Hawkish Stance on Inflation', source: 'ECB Press', sourceAvatar: 'E', timeAgo: '8h ago', impact: 'low', pairs: ['EUR/USD', 'EUR/GBP'], summary: 'Several ECB governing council members emphasized the need to keep rates elevated until inflation is firmly anchored at the 2% target.', views: '4.4K', comments: 7, likes: 34 },
];

export const economicEvents = [
  { id: 1, event: 'US Non-Farm Payrolls', country: 'US', flag: '🇺🇸', date: 'Today', time: '13:30 GMT', impact: 'high', previous: '256K', forecast: '160K', actual: null },
  { id: 2, event: 'US Unemployment Rate', country: 'US', flag: '🇺🇸', date: 'Today', time: '13:30 GMT', impact: 'high', previous: '4.0%', forecast: '4.0%', actual: null },
  { id: 3, event: 'UK Interest Rate Decision', country: 'UK', flag: '🇬🇧', date: 'Today', time: '12:00 GMT', impact: 'high', previous: '4.50%', forecast: '4.50%', actual: '4.50%' },
  { id: 4, event: 'EU Retail Sales m/m', country: 'EU', flag: '🇪🇺', date: 'Tomorrow', time: '10:00 GMT', impact: 'medium', previous: '0.3%', forecast: '0.1%', actual: null },
  { id: 5, event: 'JP GDP q/q', country: 'JP', flag: '🇯🇵', date: 'Tomorrow', time: '00:50 GMT', impact: 'medium', previous: '0.3%', forecast: '0.4%', actual: null },
  { id: 6, event: 'AU Consumer Confidence', country: 'AU', flag: '🇦🇺', date: 'Wed, Mar 11', time: '00:30 GMT', impact: 'low', previous: '92.2', forecast: '93.0', actual: null },
];

export const priceAlerts = [
  { id: 1, pair: 'EUR/USD', condition: 'above', targetPrice: 1.0900, currentPrice: 1.0847, active: true },
  { id: 2, pair: 'GBP/USD', condition: 'below', targetPrice: 1.2500, currentPrice: 1.2634, active: true },
  { id: 3, pair: 'USD/JPY', condition: 'above', targetPrice: 150.00, currentPrice: 149.82, active: false },
  { id: 4, pair: 'XAU/USD', condition: 'above', targetPrice: 2660.00, currentPrice: 2638.50, active: true },
  { id: 5, pair: 'AUD/USD', condition: 'below', targetPrice: 0.6500, currentPrice: 0.6543, active: true },
];

export const currencyStrength = [
  { currency: 'JPY', flag: '🇯🇵', flagImg: 'https://flagcdn.com/w40/jp.png', strength: 82, change: +3.2 },
  { currency: 'USD', flag: '🇺🇸', flagImg: 'https://flagcdn.com/w40/us.png', strength: 71, change: +1.5 },
  { currency: 'GBP', flag: '🇬🇧', flagImg: 'https://flagcdn.com/w40/gb.png', strength: 63, change: +0.8 },
  { currency: 'EUR', flag: '🇪🇺', flagImg: 'https://flagcdn.com/w40/eu.png', strength: 55, change: -0.4 },
  { currency: 'CAD', flag: '🇨🇦', flagImg: 'https://flagcdn.com/w40/ca.png', strength: 48, change: -0.2 },
  { currency: 'CHF', flag: '🇨🇭', flagImg: 'https://flagcdn.com/w40/ch.png', strength: 42, change: -1.1 },
  { currency: 'AUD', flag: '🇦🇺', flagImg: 'https://flagcdn.com/w40/au.png', strength: 35, change: -2.0 },
  { currency: 'NZD', flag: '🇳🇿', flagImg: 'https://flagcdn.com/w40/nz.png', strength: 28, change: -2.8 },
];

export const marketOverview = [
  { label: 'Most Volatile', value: 'GBP/JPY', sub: '+1.12%', type: 'volatile' },
  { label: 'Top Volume', value: 'EUR/USD', sub: '2.1B', type: 'volume' },
  { label: 'Avg Spread', value: '1.15', sub: 'pips', type: 'spread' },
  { label: 'Market Mood', value: 'Bullish', sub: '58%', type: 'mood' },
];

export const dailyRange = [
  { pair: 'EUR/USD', low: 1.0812, high: 1.0868, current: 1.0847, adr: 72, todayPips: 56 },
  { pair: 'GBP/USD', low: 1.2598, high: 1.2672, current: 1.2634, adr: 95, todayPips: 74 },
  { pair: 'USD/JPY', low: 149.22, high: 149.98, current: 149.82, adr: 88, todayPips: 76 },
  { pair: 'AUD/USD', low: 0.6510, high: 0.6578, current: 0.6543, adr: 65, todayPips: 68 },
  { pair: 'USD/CHF', low: 0.8790, high: 0.8852, current: 0.8821, adr: 58, todayPips: 62 },
  { pair: 'NZD/USD', low: 0.6072, high: 0.6132, current: 0.6102, adr: 62, todayPips: 60 },
  { pair: 'USD/CAD', low: 1.3530, high: 1.3605, current: 1.3567, adr: 70, todayPips: 75 },
  { pair: 'XAU/USD', low: 2618.00, high: 2655.00, current: 2638.50, adr: 3200, todayPips: 3700 },
];

export const sessionPerformance = [
  { pair: 'EUR/USD', asian: +5, london: +12, ny: -8 },
  { pair: 'GBP/USD', asian: -3, london: +18, ny: -12 },
  { pair: 'USD/JPY', asian: +15, london: +8, ny: +6 },
  { pair: 'AUD/USD', asian: -10, london: +5, ny: -3 },
  { pair: 'XAU/USD', asian: +8, london: -5, ny: +12 },
  { pair: 'NZD/USD', asian: -6, london: +3, ny: -4 },
];

export const correlationPairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CHF', 'NZD/USD'];
export const correlationMatrix = [
  [ 1.00,  0.87, -0.72,  0.65, -0.91,  0.58],
  [ 0.87,  1.00, -0.64,  0.55, -0.82,  0.48],
  [-0.72, -0.64,  1.00, -0.52,  0.68, -0.44],
  [ 0.65,  0.55, -0.52,  1.00, -0.58,  0.82],
  [-0.91, -0.82,  0.68, -0.58,  1.00, -0.51],
  [ 0.58,  0.48, -0.44,  0.82, -0.51,  1.00],
];

export const copyTraders = [
  { name: 'Alex M.', avatar: 'AM', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', profit: '+12.4%', monthlyReturn: '+4.2%', trades: 142, winRate: 78, followers: 1283, riskLevel: 'Medium', bio: 'Specializes in EUR/USD and GBP/USD with a focus on technical analysis and swing trading strategies.', copiers: 281, maxCopiers: 300, pnl30d: 2847.53, roi: 71.11, aum: 43072.18, mdd30d: 11.09, daysLeading: 237 },
  { name: 'Sarah K.', avatar: 'SK', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', profit: '+9.8%', monthlyReturn: '+3.1%', trades: 98, winRate: 72, followers: 956, riskLevel: 'Low', bio: 'Conservative trader focusing on major pairs with strict risk management. Avg holding time 2-5 days.', copiers: 87, maxCopiers: 300, pnl30d: 1258.12, roi: 63.35, aum: 15932.82, mdd30d: 21.51, daysLeading: 346 },
  { name: 'Mike R.', avatar: 'MR', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', profit: '+8.2%', monthlyReturn: '+2.8%', trades: 215, winRate: 69, followers: 734, riskLevel: 'High', bio: 'Active scalper and day trader across all major and cross pairs. High frequency, tight stops.', copiers: 6, maxCopiers: 300, pnl30d: 475.20, roi: 41.86, aum: 1272.53, mdd30d: 12.30, daysLeading: 642 },
  { name: 'Elena V.', avatar: 'EV', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', profit: '+7.5%', monthlyReturn: '+3.5%', trades: 67, winRate: 81, followers: 1105, riskLevel: 'Low', bio: 'Fundamental analysis expert with focus on central bank policy and macro events. Quality over quantity.', copiers: 195, maxCopiers: 300, pnl30d: 1892.40, roi: 58.72, aum: 28450.00, mdd30d: 8.45, daysLeading: 412 },
  { name: 'James L.', avatar: 'JL', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face', profit: '+6.9%', monthlyReturn: '+2.3%', trades: 183, winRate: 65, followers: 512, riskLevel: 'Medium', bio: 'Trend following strategy on H4 and Daily timeframes. Focuses on USD pairs.', copiers: 42, maxCopiers: 300, pnl30d: 634.80, roi: 35.20, aum: 5840.00, mdd30d: 15.67, daysLeading: 128 },
];

export const generateOrderBook = (basePrice = 1.0847, decimals = 4) => {
  const bids = [];
  const asks = [];
  for (let i = 0; i < 8; i++) {
    const bidPrice = basePrice - (i + 1) * (decimals === 2 ? 0.01 : 0.0001);
    const askPrice = basePrice + (i + 1) * (decimals === 2 ? 0.01 : 0.0001);
    const bidSize = +(Math.random() * 4 + 0.5).toFixed(2);
    const askSize = +(Math.random() * 4 + 0.5).toFixed(2);
    bids.push({ price: +bidPrice.toFixed(decimals), size: bidSize });
    asks.push({ price: +askPrice.toFixed(decimals), size: askSize });
  }
  return { bids, asks: asks.reverse() };
};

export const generateRecentTrades = (basePrice = 1.0847, decimals = 4) => {
  const trades = [];
  const now = Date.now();
  for (let i = 0; i < 15; i++) {
    const isBuy = Math.random() > 0.5;
    const price = basePrice + (Math.random() - 0.5) * (decimals === 2 ? 0.1 : 0.001);
    trades.push({
      price: +price.toFixed(decimals),
      size: +(Math.random() * 2 + 0.1).toFixed(2),
      side: isBuy ? 'buy' : 'sell',
      time: new Date(now - i * (Math.random() * 30000 + 5000)).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    });
  }
  return trades;
};

export const communityPosts = [
  {
    id: 1,
    user: 'Daniel P.',
    avatar: 'DP',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    timeAgo: '25m ago',
    text: 'EUR/USD just broke above the 1.0850 resistance. Looking at a potential run to 1.0900 if momentum holds. Here\'s my analysis with key S/R levels marked.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop',
    likes: 47,
    comments: 12,
    pairs: ['EUR/USD'],
  },
  {
    id: 2,
    user: 'Olivia T.',
    avatar: 'OT',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    timeAgo: '1h ago',
    text: 'My GBP/USD short from 1.2660 hit TP at 1.2590! +70 pips. Risk management is everything — never risk more than 2% per trade.',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=200&fit=crop',
    likes: 89,
    comments: 23,
    pairs: ['GBP/USD'],
  },
  {
    id: 3,
    user: 'Ryan W.',
    avatar: 'RW',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face',
    timeAgo: '2h ago',
    text: 'NFP data dropping today at 13:30 GMT. Expecting high volatility on USD pairs. Here\'s how I\'m positioning ahead of the release.',
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=200&fit=crop',
    likes: 156,
    comments: 41,
    pairs: ['USD/JPY', 'EUR/USD'],
  },
  {
    id: 4,
    user: 'Mia C.',
    avatar: 'MC',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
    timeAgo: '3h ago',
    text: 'Weekly watchlist: AUD/USD at key support 0.6500, NZD/USD double bottom forming. Both look like solid long setups if US data disappoints.',
    image: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=400&h=200&fit=crop',
    likes: 72,
    comments: 18,
    pairs: ['AUD/USD', 'NZD/USD'],
  },
  {
    id: 5,
    user: 'Liam H.',
    avatar: 'LH',
    photo: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face',
    timeAgo: '5h ago',
    text: 'USD/CAD trend line break on the daily chart. Price retesting the broken support as resistance. Classic textbook setup for a short entry.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
    likes: 34,
    comments: 8,
    pairs: ['USD/CAD'],
  },
];

export const liveStreams = [
  {
    id: 1,
    host: 'Alex M.',
    avatar: 'AM',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    title: 'Live Trading Make Profit Together 😊',
    pair: 'EUR/USD',
    viewers: 6842,
    followers: 12800,
    isLive: true,
    startedAgo: '1h 23m',
    tags: ['Scalping', 'NFP'],
    chat: [
      { user: 'TraderJoe', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face', msg: 'What\'s your SL on this one?', time: '1s' },
      { user: 'FXQueen92', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face', msg: 'Nice entry! Following 🔥', time: '5s' },
      { user: 'PipHunter', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=50&h=50&fit=crop&crop=face', msg: '🔥🔥 great call on that support', time: '12s' },
      { user: 'NewbieTrader', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop&crop=face', msg: 'Can you explain the setup?', time: '18s' },
      { user: 'GoldBull', photo: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop&crop=face', msg: 'Watching from Tokyo 🇯🇵', time: '25s' },
      { user: 'SwingKing', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face', msg: 'EUR looking bullish on H4', time: '32s' },
      { user: 'RiskManager', photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=50&h=50&fit=crop&crop=face', msg: 'Remember position sizing guys', time: '40s' },
      { user: 'ChartNerd', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop&crop=face', msg: 'RSI divergence forming? 📈', time: '48s' },
    ],
    holdings: [
      { pair: 'EUR/USD', direction: 'BUY', entry: 1.0835, current: 1.0852, pnl: +170.00, lots: 1.0 },
      { pair: 'GBP/USD', direction: 'BUY', entry: 1.2620, current: 1.2634, pnl: +42.00, lots: 0.3 },
    ],
  },
  {
    id: 2,
    host: 'Sarah K.',
    avatar: 'SK',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    title: 'Asian Session Analysis — JPY Pairs 🇯🇵',
    pair: 'USD/JPY',
    viewers: 3215,
    followers: 9560,
    isLive: true,
    startedAgo: '45m',
    tags: ['Swing', 'JPY'],
    chat: [
      { user: 'YenMaster', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face', msg: 'BOJ meeting soon, careful! 😱', time: '3s' },
      { user: 'FXDaily', photo: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop&crop=face', msg: 'Agree with the short thesis', time: '8s' },
      { user: 'PipSqueak', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop&crop=face', msg: 'What TF are you trading?', time: '15s' },
      { user: 'LondonTrader', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=50&h=50&fit=crop&crop=face', msg: 'Just woke up, what did I miss? 😴', time: '22s' },
    ],
    holdings: [
      { pair: 'USD/JPY', direction: 'SELL', entry: 150.10, current: 149.82, pnl: +560.00, lots: 2.0 },
    ],
  },
  {
    id: 3,
    host: 'Elena V.',
    avatar: 'EV',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    title: 'Gold Technical Analysis — Key Levels 🥇',
    pair: 'XAU/USD',
    viewers: 8910,
    followers: 11050,
    isLive: true,
    startedAgo: '2h 10m',
    tags: ['Gold', 'Technical'],
    chat: [
      { user: 'GoldFinger', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face', msg: 'Gold to 2700 this week? 🚀', time: '2s' },
      { user: 'SafeHaven', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face', msg: 'Fed dovish = gold bullish 💰', time: '7s' },
      { user: 'MetalHead', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop&crop=face', msg: 'Great stream as always Elena! 👏', time: '14s' },
    ],
    holdings: [
      { pair: 'XAU/USD', direction: 'BUY', entry: 2625.00, current: 2638.50, pnl: +1350.00, lots: 1.0 },
      { pair: 'XAG/USD', direction: 'BUY', entry: 30.80, current: 31.15, pnl: +175.00, lots: 0.5 },
    ],
  },
  {
    id: 4,
    host: 'Mike R.',
    avatar: 'MR',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    title: 'Scalping GBP/USD — London Open 🇬🇧',
    pair: 'GBP/USD',
    viewers: 1876,
    followers: 7340,
    isLive: true,
    startedAgo: '32m',
    tags: ['Scalping', 'London'],
    chat: [
      { user: 'CableTrader', photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=50&h=50&fit=crop&crop=face', msg: 'GBP data was solid today 📊', time: '4s' },
      { user: 'SpreadKiller', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=50&h=50&fit=crop&crop=face', msg: 'Spread tight on this pair rn', time: '10s' },
    ],
    holdings: [
      { pair: 'GBP/USD', direction: 'SELL', entry: 1.2655, current: 1.2634, pnl: +63.00, lots: 0.3 },
    ],
  },
  {
    id: 5,
    host: 'James L.',
    avatar: 'JL',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    title: 'Weekly Forex Outlook — Major Pairs 📈',
    pair: 'EUR/USD',
    viewers: 2340,
    followers: 5120,
    isLive: true,
    startedAgo: '15m',
    tags: ['Education', 'Weekly'],
    chat: [
      { user: 'WeeklyWatcher', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face', msg: 'Bullish on EUR this week 💪', time: '6s' },
      { user: 'FundFX', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop&crop=face', msg: 'DXY looks weak, agree', time: '11s' },
    ],
    holdings: [],
  },
];

export const closedTrades = [
  { pair: 'EUR/USD', type: 'BUY', lots: 0.3, openPrice: 1.0812, closePrice: 1.0847, pl: +105.00, duration: '4h 12m', closedAt: '2h ago' },
  { pair: 'GBP/USD', type: 'SELL', lots: 0.5, openPrice: 1.2680, closePrice: 1.2634, pl: +230.00, duration: '1d 6h', closedAt: '5h ago' },
  { pair: 'USD/JPY', type: 'BUY', lots: 0.2, openPrice: 149.20, closePrice: 149.05, pl: -20.13, duration: '2h 30m', closedAt: '8h ago' },
  { pair: 'AUD/USD', type: 'SELL', lots: 0.4, openPrice: 0.6580, closePrice: 0.6543, pl: +148.00, duration: '6h 45m', closedAt: '1d ago' },
  { pair: 'EUR/GBP', type: 'BUY', lots: 0.2, openPrice: 0.8565, closePrice: 0.8587, pl: +44.00, duration: '3h 20m', closedAt: '1d ago' },
  { pair: 'USD/CHF', type: 'SELL', lots: 0.3, openPrice: 0.8850, closePrice: 0.8821, pl: +87.00, duration: '12h 10m', closedAt: '2d ago' },
];

export const weeklyPerformance = {
  plData: [0, 120, 85, 310, 195, 480, 234.67],
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  totalTrades: 18,
  winRate: 72,
  bestPair: 'GBP/USD',
  weeklyPL: +594.87,
};

export const lessonContent = {
  1: { sections: ['The foreign exchange market (Forex) is the largest financial market in the world, with over $6 trillion traded daily.', 'Unlike stocks, forex trading involves buying one currency while simultaneously selling another — this is why currencies are quoted in pairs like EUR/USD.', 'The forex market operates 24 hours a day, 5 days a week across major financial centers: London, New York, Tokyo, and Sydney.'], keyTakeaways: ['Forex is the largest and most liquid financial market', 'Currencies are always traded in pairs', 'The market is open 24/5 across global sessions'] },
  2: { sections: ['A pip (percentage in point) is the smallest price move in forex — typically the 4th decimal place (0.0001) for most pairs.', 'For JPY pairs, a pip is the 2nd decimal place (0.01). So if USD/JPY moves from 149.80 to 149.81, that is a 1-pip move.', 'A standard lot is 100,000 units of the base currency. Mini lots are 10,000 and micro lots are 1,000 units.'], keyTakeaways: ['1 pip = 0.0001 for most pairs, 0.01 for JPY pairs', 'Standard lot = 100K units, Mini = 10K, Micro = 1K', 'Pip value depends on lot size and currency pair'] },
  3: { sections: ['Japanese candlestick charts are the most popular chart type used by forex traders. Each candle shows the open, high, low, and close prices for a specific time period.', 'A bullish (green) candle means the close price is higher than the open. A bearish (red) candle means the close is lower than the open.', 'Common patterns include Doji (indecision), Hammer (reversal), and Engulfing patterns (strong momentum shift).'], keyTakeaways: ['Each candle shows OHLC data for one time period', 'Green = bullish (close > open), Red = bearish (close < open)', 'Patterns like Doji and Hammer signal potential reversals'] },
  4: { sections: ['Support is a price level where buying pressure tends to prevent further decline. Resistance is where selling pressure prevents further advance.', 'These levels form because of market memory — traders remember previous highs and lows and make decisions based on them.', 'When support breaks, it often becomes resistance (and vice versa). This is called a role reversal and is a powerful trading concept.'], keyTakeaways: ['Support = floor where price bounces up', 'Resistance = ceiling where price bounces down', 'Broken support becomes resistance and vice versa'] },
  5: { sections: ['Moving averages smooth out price data to identify trend direction. The two most common types are Simple Moving Average (SMA) and Exponential Moving Average (EMA).', 'A golden cross occurs when a short-term MA (e.g., 50-period) crosses above a long-term MA (e.g., 200-period) — this is a bullish signal.', 'A death cross is the opposite — when the short-term MA crosses below the long-term MA, signaling a potential downtrend.'], keyTakeaways: ['SMA weighs all periods equally, EMA weighs recent data more', 'Golden Cross (bullish) = short MA crosses above long MA', 'Death Cross (bearish) = short MA crosses below long MA'] },
  6: { sections: ['Central bank interest rates are the single most important fundamental factor in forex markets. Higher rates attract foreign capital, strengthening the currency.', 'The carry trade strategy involves borrowing in a low-interest currency and investing in a high-interest one to capture the rate differential.', 'Traders closely watch central bank meetings (Fed, ECB, BOJ, BOE) and forward guidance statements for clues about future rate changes.'], keyTakeaways: ['Higher interest rates generally strengthen a currency', 'Carry trade profits from interest rate differentials', 'Central bank forward guidance moves markets significantly'] },
  7: { sections: ['Position sizing determines how much of your capital you risk on each trade. The widely recommended maximum is 1-2% of your account per trade.', 'To calculate: Risk Amount = Account Balance × Risk %. Then, Position Size = Risk Amount ÷ (Stop Loss in Pips × Pip Value).', 'Example: $10,000 account, 2% risk = $200. With a 50-pip SL on EUR/USD, position size = $200 ÷ (50 × $0.10) = 0.4 lots.'], keyTakeaways: ['Never risk more than 1-2% of your account per trade', 'Position Size = Risk Amount ÷ (SL Pips × Pip Value)', 'Consistent sizing is key to long-term survival'] },
  8: { sections: ['A stop loss is an order to close a position at a predetermined price to limit losses. It is the most important risk management tool.', 'Common methods: Fixed pips (e.g., 50 pips), ATR-based (1.5× Average True Range), or structure-based (below support/above resistance).', 'Never move your stop loss further away from your entry — this is a common mistake that leads to larger losses. Only trail stops in the direction of profit.'], keyTakeaways: ['Always use stop losses — no exceptions', 'Structure-based stops are generally more effective than fixed pips', 'Never widen a stop loss, only trail it in profit'] },
};

export const kycCountries = [
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', dialCode: '+66' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', dialCode: '+81' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', dialCode: '+61' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '+49' },
  { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', dialCode: '+65' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', dialCode: '+82' },
  { code: 'IN', name: 'India', flag: '🇮🇳', dialCode: '+91' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', dialCode: '+41' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰', dialCode: '+852' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', dialCode: '+64' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', dialCode: '+971' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', dialCode: '+55' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', dialCode: '+60' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', dialCode: '+62' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', dialCode: '+63' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', dialCode: '+84' },
];

export const kycDocumentTypes = [
  { id: 'passport', label: 'Passport', sides: 1 },
  { id: 'national_id', label: 'National ID', sides: 2 },
  { id: 'drivers_license', label: "Driver's License", sides: 2 },
];

export const kycMockOtp = '123456';

export const academyCategories = ['All', 'Beginner', 'Technical', 'Fundamental', 'Risk Mgmt'];

export const lessons = [
  { id: 1, title: 'What is Forex Trading?', category: 'Beginner', duration: '8 min', completed: true, description: 'Learn the basics of the foreign exchange market and how currency pairs work.' },
  { id: 2, title: 'Understanding Pips & Lots', category: 'Beginner', duration: '12 min', completed: true, description: 'Master the fundamental units of measurement in forex trading.' },
  { id: 3, title: 'Reading Candlestick Charts', category: 'Technical', duration: '15 min', completed: false, description: 'Learn how to read and interpret Japanese candlestick patterns for trading decisions.' },
  { id: 4, title: 'Support & Resistance Levels', category: 'Technical', duration: '18 min', completed: false, description: 'Identify key price levels where the market tends to reverse or consolidate.' },
  { id: 5, title: 'Moving Averages Strategy', category: 'Technical', duration: '20 min', completed: false, description: 'Use SMA and EMA crossovers to identify trend direction and entry points.' },
  { id: 6, title: 'Interest Rates & Forex', category: 'Fundamental', duration: '14 min', completed: false, description: 'Understand how central bank interest rate decisions impact currency valuations.' },
  { id: 7, title: 'Position Sizing Calculator', category: 'Risk Mgmt', duration: '10 min', completed: false, description: 'Calculate the optimal position size based on account balance and risk tolerance.' },
  { id: 8, title: 'Stop Loss Strategies', category: 'Risk Mgmt', duration: '16 min', completed: true, description: 'Explore different approaches to setting stop losses to protect your capital.' },
];
