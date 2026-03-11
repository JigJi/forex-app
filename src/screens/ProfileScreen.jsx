import { useState } from 'react';
import {
  User, Shield, CheckCircle, AlertCircle, ChevronRight, LogOut,
  Download, Upload, Lock, Smartphone, Bell, Globe, HelpCircle,
  FileText, Settings, CreditCard, TrendingUp, GraduationCap
} from 'lucide-react';

export default function ProfileScreen({ onLogout, onNavigate }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const verificationStatus = 'verified';

  const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: CreditCard, label: 'Deposit', accent: true },
        { icon: Download, label: 'Withdraw' },
        { icon: TrendingUp, label: 'Trading History' },
        { icon: FileText, label: 'Statements' },
      ],
    },
    {
      title: 'Security',
      items: [
        { icon: Lock, label: 'Change Password' },
        { icon: Smartphone, label: 'Two-Factor Auth', badge: 'ON', badgeColor: 'text-buy' },
        { icon: Shield, label: 'Biometric Login', badge: 'Enabled', badgeColor: 'text-buy' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: Bell,
          label: 'Notifications',
          toggle: true,
          toggled: notificationsEnabled,
          onToggle: () => setNotificationsEnabled(!notificationsEnabled),
        },
        { icon: Globe, label: 'Language', badge: 'English' },
        { icon: Settings, label: 'App Settings' },
      ],
    },
    {
      title: 'Education',
      items: [
        { icon: GraduationCap, label: 'Learn Forex', accent: true, action: () => onNavigate('academy') },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center' },
        { icon: FileText, label: 'Legal & Policies' },
      ],
    },
  ];

  return (
    <div className="h-full bg-bg-primary flex flex-col">
      {/* Header */}
      <div className="glass-strong shrink-0" style={{ padding: '12px 16px' }}>
        <div className="flex items-center" style={{ gap: 8 }}>
          <User className="text-accent" style={{ width: 18, height: 18 }} />
          <h2 className="text-text-primary font-bold" style={{ fontSize: 16 }}>Profile</h2>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scroll" style={{ padding: '12px 16px 32px' }}>
      {/* Profile Card */}
      <div className="gradient-hero rounded-2xl border border-border relative overflow-hidden" style={{ padding: '14px 16px', marginBottom: 14 }}>
        <div className="absolute bg-accent/[0.03] rounded-full blur-2xl pointer-events-none" style={{ top: -48, right: -48, width: 96, height: 96 }} />

        <div className="flex items-center relative" style={{ gap: 12 }}>
          <div className="rounded-full gradient-gold-subtle flex items-center justify-center border border-accent/15" style={{ width: 46, height: 46 }}>
            <User className="text-accent" style={{ width: 22, height: 22 }} />
          </div>
          <div className="flex-1">
            <h3 className="text-text-primary font-bold" style={{ fontSize: 14 }}>John Trader</h3>
            <p className="text-text-secondary" style={{ fontSize: 11, marginTop: 3 }}>john.trader@email.com</p>
            <p className="text-text-muted" style={{ fontSize: 11, marginTop: 2 }}>Account ID: PT-283746</p>
          </div>
        </div>

        {/* Verification */}
        <div className={`flex items-center rounded-xl ${
          verificationStatus === 'verified' ? 'bg-buy-glow border border-buy/10' : 'bg-accent-muted border border-accent/10'
        }`} style={{ marginTop: 14, gap: 8, padding: '8px 12px' }}>
          {verificationStatus === 'verified' ? (
            <>
              <CheckCircle className="text-buy" style={{ width: 16, height: 16 }} />
              <span className="text-buy text-xs font-semibold">Fully Verified</span>
            </>
          ) : (
            <>
              <AlertCircle className="text-accent" style={{ width: 16, height: 16 }} />
              <span className="text-accent text-xs font-semibold">Verification Pending</span>
              <ChevronRight className="text-accent ml-auto" style={{ width: 16, height: 16 }} />
            </>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 border-t border-border/40" style={{ gap: 12, marginTop: 14, paddingTop: 14 }}>
          {[
            { value: '142', label: 'Total Trades', color: 'text-text-primary' },
            { value: '68%', label: 'Win Rate', color: 'text-buy' },
            { value: '$2,847', label: 'Total P/L', color: 'text-text-primary' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className={`font-bold ${stat.color}`} style={{ fontSize: 13 }}>{stat.value}</p>
              <p className="text-text-muted" style={{ fontSize: 10, marginTop: 3 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Deposit/Withdraw */}
      <div className="flex" style={{ gap: 14, marginBottom: 14 }}>
        <button className="flex-1 btn-primary rounded-xl flex items-center justify-center shadow-[0_4px_20px_rgba(255,216,102,0.2)]" style={{ padding: '10px 0', gap: 8, fontSize: 12 }}>
          <Upload style={{ width: 14, height: 14 }} /> Deposit
        </button>
        <button className="flex-1 gradient-card rounded-xl border border-border flex items-center justify-center text-text-primary font-semibold hover:border-border-hover active:scale-[0.97] transition-all" style={{ padding: '10px 0', gap: 8, fontSize: 12 }}>
          <Download className="text-text-secondary" style={{ width: 14, height: 14 }} /> Withdraw
        </button>
      </div>

      {/* Menu Sections */}
      {menuSections.map((section, si) => (
        <div key={section.title} style={{ marginBottom: si < menuSections.length - 1 ? 14 : 20 }}>
          <h4 className="text-text-muted font-semibold uppercase tracking-widest" style={{ fontSize: 11, marginBottom: 12, paddingLeft: 4 }}>{section.title}</h4>
          <div className="gradient-card rounded-xl border border-border overflow-hidden">
            {section.items.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={item.action || item.onToggle || undefined}
                  className={`w-full flex items-center hover:bg-bg-elevated transition-colors ${
                    i < section.items.length - 1 ? 'border-b border-border/40' : ''
                  }`}
                  style={{ padding: '10px 12px', gap: 10 }}
                >
                  <div className={`rounded-lg flex items-center justify-center ${item.accent ? 'gradient-gold-subtle border border-accent/10' : 'bg-bg-input'}`} style={{ width: 32, height: 32 }}>
                    <Icon className={item.accent ? 'text-accent' : 'text-text-secondary'} style={{ width: 16, height: 16 }} />
                  </div>
                  <span className={`flex-1 text-left font-medium ${item.accent ? 'text-accent' : 'text-text-primary'}`} style={{ fontSize: 12 }}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className={`font-semibold ${item.badgeColor || 'text-text-muted'}`} style={{ fontSize: 11 }}>{item.badge}</span>
                  )}
                  {item.toggle ? (
                    <div
                      className={`rounded-full transition-all duration-300 ${
                        item.toggled ? 'bg-accent shadow-[0_0_8px_rgba(255,216,102,0.3)]' : 'bg-bg-input border border-border'
                      }`}
                      style={{ width: 44, height: 26, padding: 2 }}
                    >
                      <div
                        className="rounded-full shadow-sm transition-all duration-300"
                        style={{
                          width: 22,
                          height: 22,
                          backgroundColor: item.toggled ? '#0B0E11' : '#5E6673',
                          transform: item.toggled ? 'translateX(18px)' : 'translateX(0)',
                        }}
                      />
                    </div>
                  ) : (
                    <ChevronRight className="text-text-muted" style={{ width: 16, height: 16 }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Logout */}
      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center rounded-xl border border-sell/20 text-sell bg-sell-glow hover:bg-sell/10 active:scale-[0.97] transition-all"
        style={{ padding: '12px 0', gap: 8, marginBottom: 16 }}
      >
        <LogOut style={{ width: 16, height: 16 }} />
        <span className="font-semibold" style={{ fontSize: 12 }}>Log Out</span>
      </button>
      <p className="text-text-muted text-center tracking-wide" style={{ fontSize: 11 }}>PulseTrade v1.0.0</p>
      </div>
    </div>
  );
}
