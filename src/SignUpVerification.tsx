import React, { useState, useRef } from 'react';
import './SignUpVerification.css';

interface SignUpVerificationProps {
  phoneNumber: string;
  onBackClick: () => void;
  onVerified: () => void;
}

const SignUpVerification: React.FC<SignUpVerificationProps> = ({
  phoneNumber,
  onBackClick,
  onVerified,
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
 const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevIndex = index - 1;
      inputsRef.current[prevIndex]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((d) => d === '')) {
      alert('Please enter the full OTP code.');
      return;
    }

    alert('OTP Verified!');
    onVerified();
  };

  const handleResend = () => {
    alert(`Resend code to +91 ${phoneNumber}`);
  };

  return (
    <div className="otp-container">
      <button className="back-button" onClick={onBackClick}>
        ←
      </button>

      <h2 className="otp-title">OTP Verification</h2>

      <p className="otp-info">
        Enter the verification code we just sent to your number +91{' '}
        {phoneNumber.slice(0, 1)}*******{phoneNumber.slice(-2)}
      </p>

      <form className="otp-form" onSubmit={handleSubmit}>
        <div className="otp-inputs">
          {otp.map((digit, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              className="otp-input"
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              ref={(el) => {
  inputsRef.current[i] = el;
}}
              inputMode="numeric"
              autoComplete="one-time-code"
            />
          ))}
        </div>

        <p className="resend-text">
          Didn’t receive code?{' '}
          <button type="button" className="resend-link" onClick={handleResend}>
            Resend
          </button>
        </p>

        {/* NEW: Logo added here */}
        <img
          src="/images/logo.png"
          alt="Medical symbol"
          className="verification-logo"
        />

        <button type="submit" className="verify-btn">
          Verify
        </button>
      </form>
    </div>
  );
};

export default SignUpVerification;

