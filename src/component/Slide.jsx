import React, { useState, useEffect } from 'react';
import './SliderAndCards.css'; // Create a new CSS file for combined styling

const Slider = ({ slides, staticImage, onImageClick, onRemoveImage }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides]);

  return (
    <div className="slider">
      <div className="static-image">
        <img src={staticImage.url} alt="Static Image" />
      </div>
      <div className="slides">
        {slides.map((slide, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <img
              src={slide.url}
              alt={`Image ${index + 1}`}
              style={{ display: index === slideIndex ? 'block' : 'none' }}
              onClick={() => onImageClick()}
            />
            <button
              onClick={() => onRemoveImage(index)}
              className="remove-button"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${slideIndex === index ? 'active' : ''}`}
            onClick={() => setSlideIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
