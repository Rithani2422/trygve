import React, { useState } from 'react';
import './SignUpDetails.css';

interface SignUpDetailsProps {
  onBackClick: () => void;
  onCreateAccount: (userInfo: {
    fullName: string;
    email: string;
    location: string;
    secondaryPhone: string;
    phoneNumber?: string; // Add phoneNumber as optional for type safety
  }) => void;
}

const SignUpDetails: React.FC<SignUpDetailsProps> = ({ onBackClick, onCreateAccount }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [secondaryPhone, setSecondaryPhone] = useState('');

  const handleSecondaryPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and max 10 digits
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setSecondaryPhone(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !location || !secondaryPhone) {
      alert('Please fill in all required fields.');
      return;
    }
    if (secondaryPhone.length !== 10) {
      alert('Secondary phone number must be exactly 10 digits.');
      return;
    }

    // Get phone number from localStorage (set during OTP verification)
    const phoneNumber = localStorage.getItem('phoneNumber') || '';

    // Store all data in localStorage
    const userInfo = { fullName, email, location, secondaryPhone, phoneNumber };
    localStorage.setItem('signupDetails', JSON.stringify(userInfo));

    // Log data to console
    console.log(userInfo);

    onCreateAccount(userInfo);
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-details-container">
        <button className="back-button" onClick={onBackClick}>←</button>
        {/* Logo behind the form */}
        <img
          src="/images/logo.png"
          alt="Logo"
          className="signup-bg-logo"
          aria-hidden="true"
        />

        <h2 className="signup-title">Almost Done!</h2>
        <p className="signup-subtitle">Please enter your details in the following section.</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="location-input">
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <span className="location-icon">📍</span>
          </div>

          <input
            type="tel"
            placeholder="Enter Secondary Phone Number"
            value={secondaryPhone}
            onChange={handleSecondaryPhoneChange}
            maxLength={10}
            pattern="\d{10}"
            inputMode="numeric"
            required
          />

        <button type="submit" className="create-account-btn">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpDetails;