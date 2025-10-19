import React, { useState, useEffect } from 'react';
import './HeroSlider.css';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    '/slide1.webp',
    '/slide2.webp',
    '/slide3.webp',
    '/slide4.webp'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="hero-slider">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide})` }}
          >
          </div>
        ))}
      </div>
      
      <button className="slider-arrow prev" onClick={prevSlide}>
        <i className="fas fa-chevron-left"></i>
      </button>
      
      <button className="slider-arrow next" onClick={nextSlide}>
       <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default HeroSlider;