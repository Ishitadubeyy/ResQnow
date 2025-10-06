import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaAmbulance, FaCar, FaShieldAlt, FaFireExtinguisher } from 'react-icons/fa';
import './EmergencyCarousel.css';

function EmergencyCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Emergency response illustrations with vector-style descriptions
  const slides = [
    {
      id: 1,
      title: "Medical Emergency",
      subtitle: "Ambulance & Paramedics",
      description: "Professional paramedics providing immediate medical assistance",
      icon: FaAmbulance,
      color: "#dc2626",
      bgColor: "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)"
    },
    {
      id: 2,
      title: "Roadside Assistance",
      subtitle: "Vehicle Breakdown Help",
      description: "Quick response team helping with car breakdowns and roadside emergencies",
      icon: FaCar,
      color: "#1e40af",
      bgColor: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)"
    },
    {
      id: 3,
      title: "Police Support",
      subtitle: "Emergency Law Enforcement",
      description: "Police officers providing immediate assistance and security",
      icon: FaShieldAlt,
      color: "#059669",
      bgColor: "linear-gradient(135deg, #059669 0%, #10b981 100%)"
    },
    {
      id: 4,
      title: "Rescue Operations",
      subtitle: "Disaster Response Team",
      description: "Specialized rescue teams for floods, fires, and natural disasters",
      icon: FaFireExtinguisher,
      color: "#7c2d12",
      bgColor: "linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="emergency-carousel">
      <div className="carousel-container">
        <div className="carousel-wrapper">
          <div 
            className="carousel-slides"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="carousel-slide"
                style={{ background: slide.bgColor }}
              >
                <div className="slide-content">
                  <div className="vector-illustration">
                    <div className="illustration-icon" style={{ color: slide.color }}>
                      <slide.icon />
                    </div>
                    <div className="illustration-elements">
                      <div className="element element-1"></div>
                      <div className="element element-2"></div>
                      <div className="element element-3"></div>
                    </div>
                  </div>
                  <div className="slide-text">
                    <h3 className="slide-title">{slide.title}</h3>
                    <p className="slide-subtitle">{slide.subtitle}</p>
                    <p className="slide-description">{slide.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button className="carousel-nav carousel-prev" onClick={prevSlide}>
            <FaChevronLeft />
          </button>
          <button className="carousel-nav carousel-next" onClick={nextSlide}>
            <FaChevronRight />
          </button>
          
          {/* Dots indicator */}
          <div className="carousel-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmergencyCarousel;
