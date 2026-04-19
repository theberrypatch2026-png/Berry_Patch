import React, { useRef, useEffect, useState } from 'react';

const SnapSection = ({ children, className = '', id = '', hideArrow = false, showText = false }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: observer.unobserve(entry.target) if you only want it to animate once
        }
      });
    }, { threshold: 0.15 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id={id} 
      ref={sectionRef} 
      className={`section reveal ${className} ${isVisible ? 'active' : ''}`}
    >
      <div className="container">
        {children}
      </div>
      {!hideArrow && (
        <div className="scroll-indicator" style={{ color: 'var(--amber-accent)' }}>
          {showText && "SCROLL DOWN"}
          <span className="arrow">⌄</span>
        </div>
      )}
    </section>
  );
};

export default SnapSection;
