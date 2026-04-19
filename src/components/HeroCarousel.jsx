import React, { useState, useEffect } from 'react';

const HeroCarousel = () => {
  const images = [
    { src: '/assets/real-farm.jpg', alt: 'The Berry Patch Farm' },
    { src: '/assets/real-farm2.jpg', alt: 'Strawberry Farm Rows' },
    { src: '/assets/real-berries.jpg', alt: 'Freshly Picked Berries' },
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {images.map((img, index) => (
          <div 
            key={index} 
            className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
      </div>

      <div className="carousel-dots">
        {images.map((_, index) => (
          <div 
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
