import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowLeft, ArrowRight, Mail, Lock, Eye, EyeOff, User, Calendar,
  Globe, Phone, Upload, Camera, CheckCircle, Shield, FileText,
  CreditCard, Car, Loader2,
} from 'lucide-react';
import StepProgressBar from '../components/StepProgressBar';
import { kycCountries, kycDocumentTypes, kycMockOtp } from '../data/mockData';

export default function SignUpScreen({ onLogin, onBack }) {
  const [step, setStep] = useState(1);
  const [animDir, setAnimDir] = useState('right');
  const [animKey, setAnimKey] = useState(0);

  // Step 1
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Step 2
  const [fullName, setFullName] = useState('');
  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');
  const [country, setCountry] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Step 3
  const [phoneCountry, setPhoneCountry] = useState(kycCountries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpPhase, setOtpPhase] = useState('phone'); // phone | otp | verified
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const otpRefs = useRef([]);

  // Step 4
  const [docType, setDocType] = useState('passport');
  const [frontUploaded, setFrontUploaded] = useState(false);
  const [backUploaded, setBackUploaded] = useState(false);
  const [uploadingFront, setUploadingFront] = useState(false);
  const [uploadingBack, setUploadingBack] = useState(false);

  // Step 5
  const [selfiePhase, setSelfiePhase] = useState('idle'); // idle | scanning | done

  const goNext = useCallback(() => {
    setAnimDir('right');
    setAnimKey((k) => k + 1);
    setStep((s) => s + 1);
  }, []);

  const goBack = () => {
    if (step === 1) {
      onBack();
      return;
    }
    setAnimDir('left');
    setAnimKey((k) => k + 1);
    setStep((s) => s - 1);
  };

  // OTP resend countdown
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setInterval(() => setResendTimer((v) => v - 1), 1000);
    return () => clearInterval(t);
  }, [resendTimer]);

  // Password strength
  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };
  const strengthColors = ['#F6465D', '#F6465D', '#FFD866', '#0ECB81', '#0ECB81'];

  const selectedDoc = kycDocumentTypes.find((d) => d.id === docType);

  // ─── Header ───
  const renderHeader = () => (
    <div className="flex items-center" style={{ padding: '16px 20px 12px' }}>
      {step < 6 && (
        <button onClick={goBack} className="text-text-secondary hover:text-text-primary transition-colors" style={{ marginRight: 12 }}>
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}
      <div className="flex-1">
        {step < 6 && (
          <p className="text-text-muted text-xs">
            Step {step} of 5
          </p>
        )}
        <h2 className="text-text-primary font-semibold text-lg">
          {step === 1 && 'Create Account'}
          {step === 2 && 'Personal Information'}
          {step === 3 && 'Phone Verification'}
          {step === 4 && 'Identity Document'}
          {step === 5 && 'Selfie Verification'}
          {step === 6 && ''}
        </h2>
      </div>
    </div>
  );

  // ─── Step 1: Email & Password ───
  const renderStep1 = () => {
    const strength = getPasswordStrength();
    const canProceed = email.includes('@') && password.length >= 8 && password === confirmPassword;

    return (
      <div style={{ padding: '0 24px' }}>
        {/* Email */}
        <div className="relative" style={{ marginBottom: 16 }}>
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

        {/* Password */}
        <div className="relative" style={{ marginBottom: 8 }}>
          <Lock className="absolute text-text-muted w-[18px] h-[18px]" style={{ left: 16, top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password (min 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-bg-input border border-border rounded-xl text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-accent/50 transition-all"
            style={{ padding: '16px 48px 16px 48px' }}
          />
          <button onClick={() => setShowPassword(!showPassword)} className="absolute text-text-muted hover:text-text-secondary transition-colors" style={{ right: 16, top: '50%', transform: 'translateY(-50%)' }}>
            {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
          </button>
        </div>

        {/* Password strength */}
        {password.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div className="flex gap-1.5" style={{ marginBottom: 4 }}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex-1 rounded-full"
                  style={{
                    height: 3,
                    background: i < strength ? strengthColors[strength] : 'rgba(255,255,255,0.06)',
                    transition: 'background 0.3s',
                  }}
                />
              ))}
            </div>
            <p className="text-xs" style={{ color: strengthColors[strength] }}>
              {strength <= 1 ? 'Weak' : strength === 2 ? 'Fair' : strength === 3 ? 'Good' : 'Strong'}
            </p>
          </div>
        )}

        {/* Confirm Password */}
        <div className="relative" style={{ marginBottom: 32 }}>
          <Lock className="absolute text-text-muted w-[18px] h-[18px]" style={{ left: 16, top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-bg-input border border-border rounded-xl text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-accent/50 transition-all"
            style={{ padding: '16px 48px 16px 48px' }}
          />
          <button onClick={() => setShowConfirm(!showConfirm)} className="absolute text-text-muted hover:text-text-secondary transition-colors" style={{ right: 16, top: '50%', transform: 'translateY(-50%)' }}>
            {showConfirm ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
          </button>
          {confirmPassword && password !== confirmPassword && (
            <p className="text-sell text-xs" style={{ marginTop: 6 }}>Passwords do not match</p>
          )}
        </div>

        {/* Next */}
        <button
          onClick={goNext}
          disabled={!canProceed}
          className="w-full btn-primary rounded-xl flex items-center justify-center gap-2 text-sm shadow-[0_4px_24px_rgba(255,216,102,0.2)] disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ padding: '16px 0', marginBottom: 20 }}
        >
          Continue <ArrowRight className="w-4 h-4" />
        </button>

        {/* Link back to login */}
        <p className="text-center text-text-muted text-sm">
          Already have an account?{' '}
          <button onClick={onBack} className="text-accent font-medium hover:text-accent-dark transition-colors">
            Log In
          </button>
        </p>
      </div>
    );
  };

  // ─── Step 2: Personal Info ───
  const renderStep2 = () => {
    const canProceed = fullName.trim() && dobDay && dobMonth && dobYear && country && agreeTerms;

    return (
      <div style={{ padding: '0 24px' }}>
        {/* Full Name */}
        <div className="relative" style={{ marginBottom: 16 }}>
          <User className="absolute text-text-muted w-[18px] h-[18px]" style={{ left: 16, top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Full name (as on ID)"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-bg-input border border-border rounded-xl text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-accent/50 transition-all"
            style={{ padding: '16px 16px 16px 48px' }}
          />
        </div>

        {/* Date of Birth */}
        <p className="text-text-muted text-xs font-medium" style={{ marginBottom: 8 }}>Date of Birth</p>
        <div className="flex gap-3" style={{ marginBottom: 16 }}>
          <select
            value={dobDay}
            onChange={(e) => setDobDay(e.target.value)}
            className="flex-1 bg-bg-input border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-all appearance-none"
            style={{ padding: '14px 12px' }}
          >
            <option value="" className="text-text-muted">Day</option>
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <select
            value={dobMonth}
            onChange={(e) => setDobMonth(e.target.value)}
            className="flex-[1.3] bg-bg-input border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-all appearance-none"
            style={{ padding: '14px 12px' }}
          >
            <option value="">Month</option>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
              <option key={i} value={i + 1}>{m}</option>
            ))}
          </select>
          <select
            value={dobYear}
            onChange={(e) => setDobYear(e.target.value)}
            className="flex-1 bg-bg-input border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-all appearance-none"
            style={{ padding: '14px 12px' }}
          >
            <option value="">Year</option>
            {Array.from({ length: 60 }, (_, i) => {
              const y = 2006 - i;
              return <option key={y} value={y}>{y}</option>;
            })}
          </select>
        </div>

        {/* Country */}
        <div className="relative" style={{ marginBottom: 20 }}>
          <Globe className="absolute text-text-muted w-[18px] h-[18px]" style={{ left: 16, top: '50%', transform: 'translateY(-50%)' }} />
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full bg-bg-input border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-all appearance-none"
            style={{ padding: '16px 16px 16px 48px' }}
          >
            <option value="">Select country</option>
            {kycCountries.map((c) => (
              <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
            ))}
          </select>
        </div>

        {/* Terms */}
        <label className="flex items-start gap-3 cursor-pointer" style={{ marginBottom: 32 }}>
          <div
            onClick={() => setAgreeTerms(!agreeTerms)}
            className="rounded-md border flex items-center justify-center flex-shrink-0 transition-all"
            style={{
              width: 20, height: 20, marginTop: 1,
              borderColor: agreeTerms ? '#FFD866' : 'rgba(255,255,255,0.12)',
              background: agreeTerms ? 'linear-gradient(135deg, #FFD866, #F0B90B)' : 'transparent',
            }}
          >
            {agreeTerms && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="#0B0E11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span className="text-text-secondary text-xs leading-relaxed">
            I agree to the <span className="text-accent">Terms of Service</span> and <span className="text-accent">Privacy Policy</span>
          </span>
        </label>

        <button
          onClick={goNext}
          disabled={!canProceed}
          className="w-full btn-primary rounded-xl flex items-center justify-center gap-2 text-sm shadow-[0_4px_24px_rgba(255,216,102,0.2)] disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ padding: '16px 0' }}
        >
          Continue <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  // ─── Step 3: Phone + OTP ───
  const handleSendOtp = () => {
    setOtpPhase('otp');
    setResendTimer(30);
    setOtpDigits(['', '', '', '', '', '']);
    setOtpError(false);
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);
    setOtpError(false);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    // Check if all filled
    if (value && index === 5) {
      const fullOtp = newDigits.join('');
      if (fullOtp === kycMockOtp) {
        setOtpPhase('verified');
        setTimeout(goNext, 1000);
      } else {
        setOtpError(true);
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const renderStep3 = () => (
    <div style={{ padding: '0 24px' }}>
      {otpPhase === 'phone' && (
        <>
          <p className="text-text-secondary text-sm" style={{ marginBottom: 20 }}>
            We'll send a verification code to your phone number.
          </p>

          {/* Phone input */}
          <div className="flex gap-3" style={{ marginBottom: 24 }}>
            <select
              value={phoneCountry.code}
              onChange={(e) => setPhoneCountry(kycCountries.find((c) => c.code === e.target.value) || kycCountries[0])}
              className="bg-bg-input border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-accent/50 appearance-none"
              style={{ padding: '14px 12px', width: 110 }}
            >
              {kycCountries.map((c) => (
                <option key={c.code} value={c.code}>{c.flag} {c.dialCode}</option>
              ))}
            </select>
            <div className="relative flex-1">
              <Phone className="absolute text-text-muted w-[18px] h-[18px]" style={{ left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="tel"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-bg-input border border-border rounded-xl text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-accent/50 transition-all"
                style={{ padding: '16px 16px 16px 44px' }}
              />
            </div>
          </div>

          <button
            onClick={handleSendOtp}
            disabled={!phoneNumber.trim()}
            className="w-full btn-primary rounded-xl flex items-center justify-center gap-2 text-sm shadow-[0_4px_24px_rgba(255,216,102,0.2)] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ padding: '16px 0' }}
          >
            Send Verification Code <ArrowRight className="w-4 h-4" />
          </button>
        </>
      )}

      {otpPhase === 'otp' && (
        <>
          <p className="text-text-secondary text-sm" style={{ marginBottom: 6 }}>
            Enter the 6-digit code sent to
          </p>
          <p className="text-text-primary text-sm font-medium" style={{ marginBottom: 24 }}>
            {phoneCountry.dialCode} {phoneNumber}
          </p>

          {/* OTP boxes */}
          <div className="flex gap-3 justify-center" style={{ marginBottom: 8 }}>
            {otpDigits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (otpRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                className="text-center text-xl font-bold bg-bg-input border rounded-xl text-text-primary focus:outline-none transition-all"
                style={{
                  width: 48, height: 56,
                  borderColor: otpError ? '#F6465D' : digit ? 'rgba(255,216,102,0.5)' : 'rgba(255,255,255,0.06)',
                }}
              />
            ))}
          </div>

          {otpError && (
            <p className="text-sell text-xs text-center" style={{ marginBottom: 8 }}>Invalid code. Please try again.</p>
          )}

          {/* Hint */}
          <p className="text-text-muted text-xs text-center" style={{ marginBottom: 20 }}>
            Hint: Use code <span className="text-accent font-mono font-semibold">123456</span>
          </p>

          {/* Resend */}
          <div className="text-center" style={{ marginBottom: 24 }}>
            {resendTimer > 0 ? (
              <p className="text-text-muted text-sm">Resend code in <span className="text-accent font-medium">{resendTimer}s</span></p>
            ) : (
              <button onClick={() => { setResendTimer(30); setOtpDigits(['', '', '', '', '', '']); setOtpError(false); }} className="text-accent text-sm font-medium hover:text-accent-dark transition-colors">
                Resend Code
              </button>
            )}
          </div>
        </>
      )}

      {otpPhase === 'verified' && (
        <div className="flex flex-col items-center" style={{ paddingTop: 40 }}>
          <div style={{ animation: 'checkScale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}>
            <CheckCircle className="text-buy" style={{ width: 64, height: 64 }} />
          </div>
          <p className="text-text-primary font-semibold text-lg" style={{ marginTop: 16 }}>Phone Verified!</p>
        </div>
      )}
    </div>
  );

  // ─── Step 4: Document Upload ───
  const handleUpload = (side) => {
    if (side === 'front') {
      setUploadingFront(true);
      setTimeout(() => { setUploadingFront(false); setFrontUploaded(true); }, 1500);
    } else {
      setUploadingBack(true);
      setTimeout(() => { setUploadingBack(false); setBackUploaded(true); }, 1500);
    }
  };

  // Reset uploads when doc type changes
  useEffect(() => {
    setFrontUploaded(false);
    setBackUploaded(false);
    setUploadingFront(false);
    setUploadingBack(false);
  }, [docType]);

  const renderUploadZone = (side, uploaded, uploading) => {
    const label = side === 'front' ? 'Front Side' : 'Back Side';

    if (uploading) {
      return (
        <div className="shimmer-upload rounded-2xl flex items-center justify-center" style={{ height: 140, marginBottom: 12 }}>
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      );
    }

    if (uploaded) {
      return (
        <div className="upload-zone uploaded flex items-center justify-center gap-3" style={{ height: 140, marginBottom: 12 }}>
          {/* Mock card SVG */}
          <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
            <rect x="1" y="1" width="78" height="50" rx="6" stroke="rgba(14,203,129,0.4)" strokeWidth="1.5" fill="rgba(14,203,129,0.05)" />
            <rect x="8" y="10" width="24" height="16" rx="2" fill="rgba(14,203,129,0.15)" />
            <line x1="8" y1="34" x2="52" y2="34" stroke="rgba(14,203,129,0.2)" strokeWidth="2" strokeLinecap="round" />
            <line x1="8" y1="40" x2="36" y2="40" stroke="rgba(14,203,129,0.15)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-buy" />
            <span className="text-buy text-sm font-medium">{label} uploaded</span>
          </div>
        </div>
      );
    }

    return (
      <div
        className="upload-zone flex flex-col items-center justify-center gap-2"
        style={{ height: 140, marginBottom: 12 }}
        onClick={() => handleUpload(side)}
      >
        <Upload className="w-8 h-8 text-text-muted" />
        <p className="text-text-secondary text-sm font-medium">Upload {label}</p>
        <p className="text-text-muted text-xs">Tap to upload</p>
      </div>
    );
  };

  const renderStep4 = () => {
    const needsBack = selectedDoc?.sides === 2;
    const canProceed = frontUploaded && (!needsBack || backUploaded);

    return (
      <div style={{ padding: '0 24px' }}>
        {/* Document type tabs */}
        <div className="flex gap-2" style={{ marginBottom: 20 }}>
          {kycDocumentTypes.map((dt) => {
            const isActive = docType === dt.id;
            const Icon = dt.id === 'passport' ? FileText : dt.id === 'national_id' ? CreditCard : Car;
            return (
              <button
                key={dt.id}
                onClick={() => setDocType(dt.id)}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl text-xs font-medium transition-all"
                style={{
                  padding: '10px 8px',
                  background: isActive ? 'linear-gradient(135deg, rgba(255,216,102,0.15), rgba(240,185,11,0.08))' : 'rgba(28,32,41,0.5)',
                  border: isActive ? '1px solid rgba(255,216,102,0.3)' : '1px solid rgba(255,255,255,0.06)',
                  color: isActive ? '#FFD866' : '#848E9C',
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {dt.label}
              </button>
            );
          })}
        </div>

        {/* Upload zones */}
        {renderUploadZone('front', frontUploaded, uploadingFront)}
        {needsBack && renderUploadZone('back', backUploaded, uploadingBack)}

        {/* Tips */}
        <div className="bg-bg-card rounded-xl border border-border" style={{ padding: 16, marginBottom: 24 }}>
          <p className="text-text-secondary text-xs font-medium" style={{ marginBottom: 8 }}>Tips for a successful upload:</p>
          <ul className="text-text-muted text-xs space-y-1" style={{ paddingLeft: 16, listStyleType: 'disc' }}>
            <li>Ensure the entire document is visible</li>
            <li>Avoid glare, shadows, or blurry images</li>
            <li>Use a dark, flat background</li>
          </ul>
        </div>

        <button
          onClick={goNext}
          disabled={!canProceed}
          className="w-full btn-primary rounded-xl flex items-center justify-center gap-2 text-sm shadow-[0_4px_24px_rgba(255,216,102,0.2)] disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ padding: '16px 0' }}
        >
          Continue <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  // ─── Step 5: Selfie Verification ───
  const handleTakeSelfie = () => {
    setSelfiePhase('scanning');
    setTimeout(() => {
      setSelfiePhase('done');
      setTimeout(goNext, 1000);
    }, 2000);
  };

  const renderStep5 = () => (
    <div className="flex flex-col items-center" style={{ padding: '20px 24px 0' }}>
      <p className="text-text-secondary text-sm text-center" style={{ marginBottom: 32 }}>
        Position your face within the frame and take a clear selfie.
      </p>

      {/* Selfie circle */}
      <div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: 200, height: 200, marginBottom: 32,
          background: 'rgba(28,32,41,0.5)',
          border: selfiePhase === 'done' ? '3px solid #0ECB81' : '3px solid rgba(255,255,255,0.08)',
          transition: 'border-color 0.3s',
        }}
      >
        {/* Corner brackets */}
        {selfiePhase !== 'done' && (
          <>
            <svg className="absolute" style={{ top: -2, left: -2 }} width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M4 20V10a6 6 0 016-6h10" stroke="#FFD866" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <svg className="absolute" style={{ top: -2, right: -2 }} width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 4h10a6 6 0 016 6v10" stroke="#FFD866" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <svg className="absolute" style={{ bottom: -2, left: -2 }} width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M4 20v10a6 6 0 006 6h10" stroke="#FFD866" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <svg className="absolute" style={{ bottom: -2, right: -2 }} width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M36 20v10a6 6 0 01-6 6H20" stroke="#FFD866" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </>
        )}

        {/* Scanline */}
        {selfiePhase === 'scanning' && (
          <div
            className="absolute rounded-full"
            style={{
              left: 16, right: 16, height: 3,
              background: 'linear-gradient(90deg, transparent, #FFD866, transparent)',
              animation: 'scanline 2s linear infinite',
            }}
          />
        )}

        {/* User icon or checkmark */}
        {selfiePhase === 'done' ? (
          <div style={{ animation: 'checkScale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}>
            <CheckCircle className="text-buy" style={{ width: 64, height: 64 }} />
          </div>
        ) : (
          <User
            className="text-text-muted"
            style={{
              width: 64, height: 64,
              opacity: selfiePhase === 'scanning' ? 0.3 : 0.5,
              transition: 'opacity 0.3s',
            }}
          />
        )}
      </div>

      {selfiePhase === 'idle' && (
        <button
          onClick={handleTakeSelfie}
          className="w-full btn-primary rounded-xl flex items-center justify-center gap-2 text-sm shadow-[0_4px_24px_rgba(255,216,102,0.2)]"
          style={{ padding: '16px 0' }}
        >
          <Camera className="w-4 h-4" /> Take Selfie
        </button>
      )}

      {selfiePhase === 'scanning' && (
        <p className="text-accent text-sm font-medium animate-pulse">Scanning face...</p>
      )}

      {selfiePhase === 'done' && (
        <p className="text-buy text-sm font-medium">Selfie captured!</p>
      )}
    </div>
  );

  // ─── Step 6: Success ───
  const renderStep6 = () => {
    const statusItems = [
      { label: 'Account Created', done: true },
      { label: 'ID Verified', done: true },
      { label: 'Under Review', done: false },
    ];

    return (
      <div className="flex flex-col items-center" style={{ padding: '40px 24px 0' }}>
        {/* Green glow circle */}
        <div
          className="rounded-full flex items-center justify-center"
          style={{
            width: 96, height: 96, marginBottom: 24,
            background: 'rgba(14, 203, 129, 0.1)',
            animation: 'successGlow 2s ease-in-out infinite',
          }}
        >
          <div style={{ animation: 'checkScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}>
            <CheckCircle className="text-buy" style={{ width: 56, height: 56 }} />
          </div>
        </div>

        <h2 className="text-text-primary text-2xl font-bold" style={{ marginBottom: 8 }}>Verification Submitted!</h2>
        <p className="text-text-muted text-sm text-center" style={{ marginBottom: 32, maxWidth: 280 }}>
          Your documents are being reviewed. This usually takes 1-2 business days.
        </p>

        {/* Status list */}
        <div className="w-full bg-bg-card rounded-2xl border border-border" style={{ padding: 20, marginBottom: 32 }}>
          {statusItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3"
              style={{ padding: '12px 0', borderBottom: i < statusItems.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
            >
              {item.done ? (
                <CheckCircle className="w-5 h-5 text-buy flex-shrink-0" />
              ) : (
                <Loader2 className="w-5 h-5 text-accent animate-spin flex-shrink-0" />
              )}
              <span className={`text-sm ${item.done ? 'text-text-primary' : 'text-text-secondary'}`}>
                {item.label}
              </span>
              {item.done && (
                <span className="text-buy text-xs font-medium ml-auto">Done</span>
              )}
            </div>
          ))}
        </div>

        {/* Start Trading */}
        <button
          onClick={onLogin}
          className="w-full btn-primary rounded-xl flex items-center justify-center gap-2 text-sm shadow-[0_4px_24px_rgba(255,216,102,0.2)]"
          style={{ padding: '16px 0' }}
        >
          <Shield className="w-4 h-4" /> Start Trading
        </button>
      </div>
    );
  };

  // ─── Render ───
  const renderStep = () => {
    switch (step) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      case 6: return renderStep6();
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Background blurs */}
      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-accent/[0.03] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-accent/[0.02] blur-3xl pointer-events-none" />

      {renderHeader()}
      {step < 6 && <StepProgressBar currentStep={step} totalSteps={5} />}

      <div
        key={animKey}
        className={animDir === 'right' ? 'animate-slideInRight' : 'animate-slideInLeft'}
        style={{ flex: 1 }}
      >
        {renderStep()}
      </div>
    </div>
  );
}
