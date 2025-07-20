import React, { useState, useRef, useEffect } from 'react';
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
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Send OTP only once on first mount
  useEffect(() => {
    if (!otpSent) {
      const newOtp = Array.from({ length: 6 }, () =>
        Math.floor(Math.random() * 10)
      ).join('');
      setGeneratedOtp(newOtp);
      console.log(`OTP sent to +91 ${phoneNumber}: ${newOtp}`);
      localStorage.setItem('otp', newOtp);
      localStorage.setItem('phoneNumber', phoneNumber);
      setOtpSent(true);
    }
  }, [otpSent, phoneNumber]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1);
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((digit) => digit === '')) {
      alert('Please enter the full OTP.');
      return;
    }

    const enteredOtp = otp.join('');
    const savedOtp = localStorage.getItem('otp');

    if (enteredOtp === savedOtp) {
      alert('OTP Verified!');
      onVerified();
    } else {
      alert('Incorrect OTP. Please try again.');
    }
  };

  const handleResend = () => {
    const newOtp = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join('');
    setGeneratedOtp(newOtp);
    localStorage.setItem('otp', newOtp);
    setOtp(['', '', '', '', '', '']);
    inputsRef.current[0]?.focus();
    alert(`Code resent to +91 ${phoneNumber}`);
    console.log(`Resent OTP: ${newOtp}`);
  };

  return (
    <div className="otp-container">
      <button className="back-button" onClick={onBackClick}>←</button>

      <h2 className="otp-title">OTP Verification</h2>
      <p className="otp-info">Enter the code sent to <strong>+91 {phoneNumber}</strong></p>

      <form onSubmit={handleSubmit} className="otp-form">
        <div className="otp-inputs">
          {otp.map((digit, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              value={digit}
              className="otp-input"
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
          <button type="button" onClick={handleResend} className="resend-link">Resend</button>
        </p>

        <img src="/images/logo.png" alt="Medical Logo" className="verification-logo" />

        <button type="submit" className="verify-btn">Verify</button>
      </form>
    </div>
  );
};

export default SignUpVerification;



