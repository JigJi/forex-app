import { Home, BarChart3, LineChart, User, Compass } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'markets', label: 'Markets', icon: BarChart3 },
  { id: 'discover', label: 'Discover', icon: Compass },
  { id: 'trade', label: 'Trade', icon: LineChart },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function BottomNav({ active, onNavigate }) {
  return (
    <nav className="glass-strong flex items-center justify-around" style={{ padding: '12px 12px 8px' }}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="flex flex-col items-center rounded-xl transition-all duration-200 relative group"
            style={{ gap: 6, padding: '8px 14px' }}
          >
            {isActive && (
              <div className="absolute inset-0 rounded-xl bg-accent/[0.06]" />
            )}
            <Icon
              className={`transition-all duration-200 relative z-10 ${
                isActive
                  ? 'text-accent drop-shadow-[0_0_8px_rgba(255,216,102,0.4)]'
                  : 'text-text-muted group-hover:text-text-secondary'
              }`}
              style={{ width: 22, height: 22 }}
              strokeWidth={isActive ? 2.2 : 1.8}
            />
            <span
              className={`font-medium relative z-10 transition-colors duration-200 ${
                isActive ? 'text-accent' : 'text-text-muted group-hover:text-text-secondary'
              }`}
              style={{ fontSize: 10 }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
