import { useState, useEffect, useCallback } from 'react';
import { Eye, EyeOff, ScanFace, Mail, Lock, ArrowRight, TrendingUp } from 'lucide-react';

/* Apple Face ID icon — 4 corner brackets + face features */
function FaceIdIcon({ color = '#EAECEF', size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      {/* Corner brackets */}
      <path d="M4 17V9a5 5 0 015-5h8" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M39 4h8a5 5 0 015 5v8" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M4 39v8a5 5 0 005 5h8" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M52 39v8a5 5 0 01-5 5h-8" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Left eye */}
      <path d="M20 19v7" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Right eye */}
      <path d="M36 19v7" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Nose */}
      <path d="M28 22v9h-3.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Mouth */}
      <path d="M20 39a8 8 0 0016 0" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function FaceIdOverlay({ phase, onCancel, onDone }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (phase === 'exit') {
      setExiting(true);
      const t = setTimeout(onDone, 250);
      return () => clearTimeout(t);
    }
  }, [phase, onDone]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: 'rgba(0, 0, 0, 0.5)',
        animation: exiting ? 'faceid-backdrop-out 0.25s ease forwards' : 'faceid-backdrop-in 0.2s ease forwards',
      }}
    >
      {/* iOS-style dialog card */}
      <div
        className="flex flex-col items-center rounded-2xl"
        style={{
          width: 270,
          background: 'rgba(30, 30, 30, 0.95)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          animation: exiting ? 'faceid-dialog-out 0.25s ease forwards' : 'faceid-dialog-in 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        }}
      >
        {/* Content area */}
        <div className="flex flex-col items-center" style={{ padding: '28px 20px 20px' }}>
          {/* Icon area */}
          <div style={{ width: 56, height: 56, marginBottom: 16, position: 'relative' }}>
            {/* Face ID icon — fades out on success */}
            <div style={{
              position: 'absolute', inset: 0,
              transition: 'opacity 0.25s ease',
              opacity: phase === 'success' || phase === 'exit' ? 0 : 1,
              animation: phase === 'scanning' ? 'faceid-icon-pulse 1.8s ease-in-out infinite' : 'none',
            }}>
              <FaceIdIcon />
            </div>

            {/* Green checkmark — fades in on success */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: phase === 'success' || phase === 'exit' ? 1 : 0,
              animation: phase === 'success' ? 'faceid-check-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : 'none',
            }}>
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="20" stroke="#0ECB81" strokeWidth="2.5" opacity="0.3" />
                <path
                  d="M13 22l6 6 12-12"
                  stroke="#0ECB81"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="30"
                  strokeDashoffset={phase === 'success' || phase === 'exit' ? undefined : '30'}
                  style={phase === 'success' || phase === 'exit' ? { animation: 'faceid-check-draw 0.3s ease 0.15s forwards', strokeDashoffset: 30 } : {}}
                />
              </svg>
            </div>
          </div>

          {/* Text */}
          <p style={{ color: '#EAECEF', fontSize: 13, fontWeight: 600, textAlign: 'center', lineHeight: 1.3 }}>
            Face ID for PulseTrade
          </p>
        </div>

        {/* Divider + Cancel button */}
        {phase !== 'success' && phase !== 'exit' && (
          <>
            <div style={{ width: '100%', height: 0.5, background: 'rgba(255,255,255,0.12)' }} />
            <button
              onClick={onCancel}
              style={{
                width: '100%', padding: '12px 0',
                color: '#4A9EFF', fontSize: 17, fontWeight: 400,
                background: 'none', border: 'none', cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function LoginScreen({ onLogin, onCreateAccount }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [faceIdPhase, setFaceIdPhase] = useState(null);

  const handleOverlayDone = useCallback(() => {
    setFaceIdPhase(null);
    onLogin();
  }, [onLogin]);

  const handleBiometric = () => {
    if (faceIdPhase) return;
    setFaceIdPhase('scanning');

    // Simulate Face ID verification
    setTimeout(() => {
      setFaceIdPhase('success');
      setTimeout(() => {
        setFaceIdPhase('exit');
      }, 800);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center relative" style={{ padding: '0 40px' }}>
      {/* Background blurs */}
      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-accent/[0.03] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-accent/[0.02] blur-3xl pointer-events-none" />

      {/* Logo */}
      <div className="w-[68px] h-[68px] rounded-2xl gradient-gold-subtle flex items-center justify-center border border-accent/20 glow-gold" style={{ marginBottom: 20 }}>
        <TrendingUp className="w-9 h-9 text-accent" strokeWidth={2} />
      </div>

      <h1 className="text-[30px] font-bold text-text-primary tracking-tight" style={{ marginBottom: 6 }}>PulseTrade</h1>
      <p className="text-text-muted text-sm tracking-wide" style={{ marginBottom: 32 }}>Trade smarter. Trade faster.</p>

      {/* Toggle */}
      <div className="flex bg-bg-secondary rounded-xl border border-border w-full max-w-[260px]" style={{ padding: 5, marginBottom: 32 }}>
        <button
          onClick={() => setIsLogin(true)}
          className={`flex-1 rounded-xl text-sm font-semibold transition-all duration-300 ${
            isLogin ? 'btn-primary' : 'text-text-muted hover:text-text-secondary'
          }`}
          style={{ padding: '10px 0' }}
        >
          Log In
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`flex-1 rounded-xl text-sm font-semibold transition-all duration-300 ${
            !isLogin ? 'btn-primary' : 'text-text-muted hover:text-text-secondary'
          }`}
          style={{ padding: '10px 0' }}
        >
          Sign Up
        </button>
      </div>

      {/* Email input */}
      <div className="relative w-full" style={{ marginBottom: 16 }}>
        <Mail className="absolute text-text-muted w-[18px] h-[18px]" style={{ left: 16, top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-bg-input border border-border rounded-xl text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-accent/50 transition-all"
          style={{ padding: '16px 16px 16px 48px' }}
        />
      </div>

      {/* Password input */}
      <div className="relative w-full" style={{ marginBottom: 12 }}>
        <Lock className="absolute text-text-muted w-[18px] h-[18px]" style={{ left: 16, top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-bg-input border border-border rounded-xl text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-accent/50 transition-all"
          style={{ padding: '16px 48px 16px 48px' }}
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="absolute text-text-muted hover:text-text-secondary transition-colors"
          style={{ right: 16, top: '50%', transform: 'translateY(-50%)' }}
        >
          {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
        </button>
      </div>

      {/* Forgot Password */}
      {isLogin && (
        <div className="w-full text-right" style={{ marginBottom: 24 }}>
          <button className="text-accent text-xs font-medium hover:text-accent-dark transition-colors">
            Forgot Password?
          </button>
        </div>
      )}

      {/* Login / Create Account Button */}
      <button
        onClick={isLogin ? onLogin : onCreateAccount}
        className="w-full btn-primary rounded-xl flex items-center justify-center gap-2 text-sm shadow-[0_4px_24px_rgba(255,216,102,0.2)]"
        style={{ padding: '16px 0', marginBottom: 40 }}
      >
        {isLogin ? 'Log In' : 'Create Account'}
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4" style={{ marginBottom: 24 }}>
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
        <span className="text-text-muted text-xs tracking-wide">or continue with</span>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
      </div>

      {/* Biometric */}
      <button
        onClick={handleBiometric}
        className={`rounded-full flex items-center justify-center transition-all duration-300 ${
          faceIdPhase
            ? 'bg-accent/15 border-2 border-accent animate-pulse-glow'
            : 'bg-bg-card border border-border-hover hover:border-accent/30 hover:bg-bg-elevated'
        }`}
        style={{ width: 64, height: 64, marginBottom: 10 }}
      >
        <ScanFace className={`transition-all duration-300 ${faceIdPhase ? 'text-accent scale-110' : 'text-text-secondary'}`} style={{ width: 28, height: 28 }} />
      </button>
      <p className="text-text-muted tracking-wide" style={{ fontSize: 11 }}>Face ID</p>

      {/* Face ID Overlay — iOS style */}
      {faceIdPhase && (
        <FaceIdOverlay
          phase={faceIdPhase}
          onCancel={() => setFaceIdPhase(null)}
          onDone={handleOverlayDone}
        />
      )}
    </div>
  );
}
