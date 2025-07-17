import React, { useState, useEffect } from 'react';
import './App.css';

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

// Helpers
function renderWithLineBreaks(text: string) {
  return text.split('\n').map((line, idx) => (
    <React.Fragment key={idx}>
      {line.trim()}
      {idx < text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
}

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
  const [currentSlide, setCurrentSlide] = useState(0);

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

        {currentSlide >= 1 && currentSlide < slides.length && (
          <div className="dots">
            {[1, 2, 3].map((idx) => (
              <span
                key={idx}
                className={`dot ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              ></span>
            ))}
          </div>
        )}

        {currentSlide === slides.length - 1 && (
          <div className="get-started-wrapper">
            <button className="next-button get-started" onClick={handleNext}>
              Get Started
            </button>
          </div>
        )}

        {currentSlide >= 1 && currentSlide < slides.length - 1 && (
          <div className="buttons">
            <button className="skip-button" onClick={() => setCurrentSlide(slides.length - 1)}>
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















