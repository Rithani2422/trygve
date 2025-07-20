import React from 'react';
import './SignUpSuccess.css';

interface SignUpSuccessProps {
  onBackToLogin: () => void;
  onBackClick?: () => void;
}

const SignUpSuccess: React.FC<SignUpSuccessProps> = ({ onBackToLogin, onBackClick }) => (
  <div className="signup-success-wrapper">
    <div className="signup-success-container">
      <button className="back-button" onClick={onBackClick}>
        &lt;
      </button>
      <div className="success-logo">
        {/* Replace with your SVG/logo if needed */}
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="40" fill="#2f5fff" />
          <path d="M25 42l12 12 18-22" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2 className="signup-success-title">
        You're Now with Your<br />
        Trusted Guardian of Life!
      </h2>
      <p className="signup-success-subtitle">
        Welcome to the TRYGVE Family!.<br />
        Your journey to better health starts here.”
      </p>
      <button className="signup-success-btn" onClick={onBackToLogin}>
        Back to Login
      </button>
    </div>
  </div>
);

export default SignUpSuccess;