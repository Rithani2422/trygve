import React, { useState } from 'react';
import './SignUp.css';

interface SignUpProps {
  onBackClick: () => void;
  onLoginClick?: () => void;
  onPhoneSubmit?: (phone: string) => void;  // new optional prop for phone submission
}

const SignUp: React.FC<SignUpProps> = ({ onBackClick, onLoginClick, onPhoneSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();

    if (phoneNumber.length !== 10) {
      alert('Phone number must be exactly 10 digits.');
      return;
    }

    if (onPhoneSubmit) {
      onPhoneSubmit(phoneNumber); // send phone number to parent for OTP screen
    } else {
      alert(`Send code to +91 ${phoneNumber}`);
    }
  };

  return (
    <div className="signup-container">
      <button className="back-button" onClick={onBackClick}>
        ←
      </button>

      <h1 className="signup-title">Can you input your number?</h1>

      <p className="signup-info">
        You will be sent a code on this number to verify if you are the owner of the number.
      </p>

      <form className="phone-form" onSubmit={handleSendCode}>
        <div className="phone-input-row">
          <div className="country-code-box">
            <img
              src="https://flagcdn.com/w40/in.png"
              alt="India flag"
              className="flag-icon"
            />
            <span className="country-code-text">+91</span>
          </div>
          <input
            type="tel"
            maxLength={10}
            placeholder="12345 67890"
            value={phoneNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 10) setPhoneNumber(value);
            }}
            required
            className="phone-number-box"
          />
        </div>

        <img
          src="/images/logo.png"
          alt="Medical symbol"
          className="logo-below-input"
        />

        <button type="submit" className="send-code-btn">
          Send Code
        </button>
      </form>

      <p className="login-link">
        Already have an account?{' '}
        <span className="login-text" onClick={onLoginClick}>
          Log in
        </span>
      </p>
    </div>
  );
};

export default SignUp;

