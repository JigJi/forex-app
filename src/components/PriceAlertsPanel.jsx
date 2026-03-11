import { useState } from 'react';
import { X, Bell, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { forexPairs } from '../data/mockData';

export default function PriceAlertsPanel({ alerts, setAlerts, onClose }) {
  const [showAdd, setShowAdd] = useState(false);
  const [newPair, setNewPair] = useState('EUR/USD');
  const [newCondition, setNewCondition] = useState('above');
  const [newPrice, setNewPrice] = useState('');

  const toggleAlert = (id) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const removeAlert = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const addAlert = () => {
    if (!newPrice) return;
    const alert = {
      id: Date.now(),
      pair: newPair,
      condition: newCondition,
      targetPrice: parseFloat(newPrice),
      active: true,
    };
    setAlerts([...alerts, alert]);
    setNewPrice('');
    setShowAdd(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative glass-strong rounded-t-3xl border-t border-border animate-fadeIn" style={{ maxHeight: '75vh', padding: '20px 24px 32px' }}>
        {/* Handle */}
        <div className="flex justify-center" style={{ marginBottom: 16 }}>
          <div className="rounded-full bg-border" style={{ width: 36, height: 4 }} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: 24 }}>
          <div className="flex items-center" style={{ gap: 10 }}>
            <div className="rounded-lg gradient-gold-subtle flex items-center justify-center border border-accent/10" style={{ width: 36, height: 36 }}>
              <Bell className="text-accent" style={{ width: 18, height: 18 }} />
            </div>
            <h3 className="text-text-primary text-base font-bold">Price Alerts</h3>
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-text-secondary transition-colors" style={{ padding: 6 }}>
            <X style={{ width: 20, height: 20 }} />
          </button>
        </div>

        {/* Alert List */}
        <div className="overflow-y-auto custom-scroll" style={{ maxHeight: '40vh' }}>
          {alerts.length === 0 && (
            <div className="text-center" style={{ padding: '32px 0' }}>
              <p className="text-text-muted text-sm">No alerts set</p>
            </div>
          )}
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="gradient-card rounded-2xl border border-border flex items-center"
              style={{ padding: '14px 16px', marginBottom: 10, gap: 12 }}
            >
              <div className="flex-1">
                <p className="text-text-primary text-sm font-semibold">{alert.pair}</p>
                <p className="text-text-muted" style={{ fontSize: 11, marginTop: 4 }}>
                  {alert.condition === 'above' ? (
                    <span className="flex items-center" style={{ gap: 4 }}><ChevronUp style={{ width: 12, height: 12 }} /> Above {alert.targetPrice}</span>
                  ) : (
                    <span className="flex items-center" style={{ gap: 4 }}><ChevronDown style={{ width: 12, height: 12 }} /> Below {alert.targetPrice}</span>
                  )}
                </p>
              </div>
              {/* Toggle */}
              <button onClick={() => toggleAlert(alert.id)}>
                <div
                  className={`rounded-full transition-all duration-300 ${
                    alert.active ? 'bg-accent shadow-[0_0_8px_rgba(255,216,102,0.3)]' : 'bg-bg-input border border-border'
                  }`}
                  style={{ width: 44, height: 26, padding: 2 }}
                >
                  <div
                    className="rounded-full shadow-sm transition-all duration-300"
                    style={{
                      width: 22, height: 22,
                      backgroundColor: alert.active ? '#0B0E11' : '#5E6673',
                      transform: alert.active ? 'translateX(18px)' : 'translateX(0)',
                    }}
                  />
                </div>
              </button>
              <button onClick={() => removeAlert(alert.id)} className="text-text-muted hover:text-sell transition-colors" style={{ padding: 4 }}>
                <Trash2 style={{ width: 16, height: 16 }} />
              </button>
            </div>
          ))}
        </div>

        {/* Add Alert Form */}
        {showAdd ? (
          <div className="gradient-card rounded-2xl border border-accent/20" style={{ padding: 16, marginTop: 16 }}>
            <div className="flex" style={{ gap: 10, marginBottom: 12 }}>
              <select
                value={newPair}
                onChange={(e) => setNewPair(e.target.value)}
                className="flex-1 bg-bg-input border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-accent/40"
                style={{ padding: '10px 12px' }}
              >
                {forexPairs.map(p => <option key={p.pair} value={p.pair}>{p.pair}</option>)}
              </select>
              <select
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                className="bg-bg-input border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-accent/40"
                style={{ padding: '10px 12px', width: 100 }}
              >
                <option value="above">Above</option>
                <option value="below">Below</option>
              </select>
            </div>
            <div className="flex" style={{ gap: 10 }}>
              <input
                type="number"
                step="0.0001"
                placeholder="Target price"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="flex-1 bg-bg-input border border-border rounded-xl text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent/40"
                style={{ padding: '10px 12px' }}
              />
              <button onClick={addAlert} className="btn-primary rounded-xl text-sm font-semibold" style={{ padding: '10px 20px' }}>
                Add
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAdd(true)}
            className="w-full flex items-center justify-center rounded-2xl border border-border border-dashed text-text-muted hover:text-accent hover:border-accent/30 transition-all"
            style={{ padding: '14px 0', gap: 8, marginTop: 16 }}
          >
            <Plus style={{ width: 18, height: 18 }} />
            <span className="text-sm font-medium">Add New Alert</span>
          </button>
        )}
      </div>
    </div>
  );
}
