import React from "react";

function MapDirectionsModal({ service, onClose }) {
  // For demo, open Google Maps directions in a new tab
  const openDirections = () => {
    const query = encodeURIComponent(service.address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal map-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <h2>Directions to {service.name}</h2>
        
        <p>{service.address}</p>
        
        <button className="directions-btn" onClick={openDirections}>
          🗺️ Open in Google Maps
        </button>
      </div>
    </div>
  );
}

export default MapDirectionsModal;