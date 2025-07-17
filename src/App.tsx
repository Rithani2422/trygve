import React, { useState, useEffect } from 'react';
import './App.css';
import Welcome from './Welcome';
import SignUp from './SignUp';
import SignUpVerification from './SignUpVerification';

const slides = [
  {
    image: '/images/1.png',
    title: 'trygve',
    tagline: 'Trusted Guardian of Life',
  },
  {
    image: '/images/2.png',
    title: 'YOUR HEALTH, OUR \n PRIORITY',
    tagline: 'Trusted doctors and care at your doorstep.',
  },
  {
    image: '/images/3.png',
    title: 'SEAMLESS CARE, \n DELIVERED',
    tagline: 'Consult, treat, and heal—hassle-free.',
  },
  {
    image: '/images/4.png',
    title: 'AFFORDABLE \n HEALTHCARE FOR \n EVERYONE',
    tagline: 'Quality care for every budget.',
  },
];

// Helper to render multiline text with <br />
function renderWithLineBreaks(text: string) {
  return text.split('\n').map((line, idx) => (
    <React.Fragment key={idx}>
      {line.trim()}
      {idx < text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
}

// Convert multiline string to Title Case preserving line breaks
function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split('\n')
    .map(line =>
      line
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    )
    .join('\n');
}

function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [showWelcome, setShowWelcome] = useState<boolean>(false);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [showOTPVerification, setShowOTPVerification] = useState<boolean>(false);
  const [phoneForOTP, setPhoneForOTP] = useState<string | null>(null);

  // Auto advance from first slide after 2.5s
  useEffect(() => {
    if (currentSlide === 0) {
      const timer = setTimeout(() => setCurrentSlide(1), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentSlide]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePhoneSubmit = (phone: string) => {
    setPhoneForOTP(phone);
    setShowSignUp(false);
    setShowOTPVerification(true);
  };

  if (showOTPVerification && phoneForOTP) {
    return (
      <SignUpVerification
        phoneNumber={phoneForOTP}
        onBackClick={() => {
          setShowOTPVerification(false);
          setShowSignUp(true);
        }}
        onVerified={() => {
          setShowOTPVerification(false);
          setPhoneForOTP(null);
          setShowWelcome(true);
        }}
      />
    );
  }

  if (showSignUp) {
    return (
      <SignUp
        onBackClick={() => {
          setShowSignUp(false);
          setShowWelcome(true);
        }}
        onLoginClick={() => {
          console.log('Login clicked');
        }}
        onPhoneSubmit={handlePhoneSubmit}
      />
    );
  }

  if (showWelcome) {
    return (
      <Welcome
        onSignUpClick={() => {
          setShowWelcome(false);
          setShowSignUp(true);
        }}
        onLoginClick={() => {
          console.log('Log in clicked');
          // Add your login logic here
        }}
      />
    );
  }

  // Slide content
  const { image, title, tagline } = slides[currentSlide];
  const displayTitle = currentSlide === 0 ? title : toTitleCase(title);
  const titleClass = currentSlide === 0 ? 'slide-title first-slide-title' : 'slide-title';

  return (
    <div className="slide-container">
      <img src={image} alt="Slide Background" className="background-img" />
      <div className="overlay"></div>

      <div className="content">
        <div className="centered-text">
          <h1 className={titleClass}>{renderWithLineBreaks(displayTitle)}</h1>
          <p className="slide-tagline">{tagline}</p>
        </div>

        {/* Dots navigation */}
        {currentSlide >= 1 && currentSlide < slides.length && (
          <div className="dots">
            {slides.slice(1).map((_, idx) => {
              const slideIndex = idx + 1;
              return (
                <span
                  key={slideIndex}
                  className={`dot ${slideIndex === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(slideIndex)}
                />
              );
            })}
          </div>
        )}

        {/* Buttons based on slide */}
        {currentSlide === slides.length - 1 && (
          <div className="get-started-wrapper">
            <button
              className="next-button get-started"
              onClick={() => setShowWelcome(true)}
            >
              Get Started
            </button>
          </div>
        )}

        {currentSlide >= 1 && currentSlide < slides.length - 1 && (
          <div className="buttons">
            <button
              className="skip-button"
              onClick={() => setShowWelcome(true)}
            >
              Skip
            </button>
            <button className="next-button" onClick={handleNext}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;



















