import React from 'react';

function Logo({ className = "", size = 40 }) {
  return (
    <div className="logo-container">
      <img 
        src="/logo.svg" 
        alt="ResQNow Logo" 
        className={`logo-image ${className}`}
        style={{ width: size, height: size }}
        onError={(e) => {
          // Fallback to SVG if image fails to load
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'block';
        }}
      />
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 40 40" 
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        style={{display: 'none'}}
      >
        {/* Ambulance body */}
        <rect x="6" y="15" width="24" height="15" rx="2" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
        {/* Ambulance front */}
        <rect x="30" y="17" width="6" height="11" rx="1" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
        {/* Medical cross */}
        <rect x="14" y="20" width="8" height="2" fill="white"/>
        <rect x="17" y="17" width="2" height="8" fill="white"/>
        {/* Wheels */}
        <circle cx="12" cy="32" r="3" fill="white" stroke="currentColor" strokeWidth="1"/>
        <circle cx="24" cy="32" r="3" fill="white" stroke="currentColor" strokeWidth="1"/>
        {/* Emergency light */}
        <rect x="16" y="10" width="4" height="4" rx="1" fill="currentColor"/>
      </svg>
    </div>
  );
}

export default Logo;
