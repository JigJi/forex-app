import { useState } from 'react';
import BottomNav from './components/BottomNav';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import TradeScreen from './screens/TradeScreen';
import MarketsScreen from './screens/MarketsScreen';
import ProfileScreen from './screens/ProfileScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import AcademyScreen from './screens/AcademyScreen';
import PriceAlertsPanel from './components/PriceAlertsPanel';
import { priceAlerts as initialAlerts } from './data/mockData';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [activeScreen, setActiveScreen] = useState('home');
  const [showAlerts, setShowAlerts] = useState(false);
  const [alerts, setAlerts] = useState(initialAlerts);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowSignUp(false);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveScreen('home');
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen onNavigate={setActiveScreen} onOpenAlerts={() => setShowAlerts(true)} />;
      case 'trade':
        return <TradeScreen />;
      case 'discover':
        return <DiscoverScreen />;
      case 'markets':
        return <MarketsScreen onNavigate={setActiveScreen} />;
      case 'profile':
        return <ProfileScreen onLogout={handleLogout} onNavigate={setActiveScreen} />;
      case 'academy':
        return <AcademyScreen onBack={() => setActiveScreen('profile')} />;
      default:
        return <HomeScreen onNavigate={setActiveScreen} onOpenAlerts={() => setShowAlerts(true)} />;
    }
  };

  return (
    <div className="h-screen bg-bg-primary flex flex-col overflow-hidden">
      {/* Screen Content */}
      <div className="flex-1 overflow-auto">
        {!isLoggedIn ? (
          showSignUp ? (
            <SignUpScreen onLogin={handleLogin} onBack={() => setShowSignUp(false)} />
          ) : (
            <LoginScreen onLogin={handleLogin} onCreateAccount={() => setShowSignUp(true)} />
          )
        ) : (
          <div className="h-full animate-fadeIn">
            {renderScreen()}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      {isLoggedIn && (
        <BottomNav active={activeScreen === 'academy' ? 'profile' : activeScreen} onNavigate={setActiveScreen} />
      )}

      {/* Price Alerts Panel */}
      {showAlerts && (
        <PriceAlertsPanel alerts={alerts} setAlerts={setAlerts} onClose={() => setShowAlerts(false)} />
      )}
    </div>
  );
}

export default App;
