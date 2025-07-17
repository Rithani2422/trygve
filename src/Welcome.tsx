import React from 'react';
import './App.css'; // or './Welcome.css' if you split styles

interface WelcomeProps {
  onSignUpClick: () => void;
  onLoginClick: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onSignUpClick, onLoginClick }) => {
  return (
    <div className="welcome-container">
      <h2 className="welcome-title">Welcome to</h2>

      <div className="logo-text-wrapper">
        <img src="/images/logo.png" alt="Medical symbol" className="logo-behind" />
        <h1 className="welcome-logo-text">trygve</h1>
      </div>

      <p className="welcome-tagline">
        Your trusted partner for personalized healthcare,<br />
        right at your doorstep.
      </p>

      <button className="welcome-btn primary" onClick={onSignUpClick}>
        Sign up
      </button>
      <button className="welcome-btn secondary" onClick={onLoginClick}>
        Log in
      </button>
    </div>
  );
};

export default Welcome;
