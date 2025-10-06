import React, { useState, useEffect } from 'react';
import { useLocation } from '../contexts/LocationContext';
import { MdLocationOn, MdError, MdRefresh, MdMyLocation } from 'react-icons/md';
import { FiLoader } from 'react-icons/fi';

function LocationDisplay({ showPermissionButton = true, className = "" }) {
  const { location, loading, error, permissionStatus, requestLocationPermission } = useLocation();
  const [address, setAddress] = useState('');

  // Reverse geocoding to get address from coordinates
  useEffect(() => {
    if (location) {
      const reverseGeocode = async () => {
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.latitude}&longitude=${location.longitude}&localityLanguage=en`
          );
          const data = await response.json();
          
          if (data.city && data.principalSubdivision) {
            setAddress(`${data.city}, ${data.principalSubdivision}`);
          } else if (data.locality) {
            setAddress(data.locality);
          } else {
            setAddress(`${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`);
          }
        } catch (err) {
          setAddress(`${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`);
        }
      };
      
      reverseGeocode();
    }
  }, [location]);

  const handleRequestLocation = async () => {
    await requestLocationPermission();
  };

  if (loading) {
    return (
      <div className={`location-display ${className}`}>
        <div className="location-loading">
          <FiLoader className="loading-icon" />
          <span>Getting your location...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`location-display ${className}`}>
        <div className="location-error">
          <MdError className="location-icon error-icon" />
          <div className="location-info">
            <span className="location-text">Location unavailable</span>
            <span className="location-subtext">{error}</span>
            {showPermissionButton && (
              <button 
                className="location-request-btn" 
                onClick={handleRequestLocation}
              >
                <MdMyLocation className="btn-icon" />
                Enable Location
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className={`location-display ${className}`}>
        <div className="location-prompt">
          <MdLocationOn className="location-icon prompt-icon" />
          <div className="location-info">
            <span className="location-text">Location not available</span>
            <span className="location-subtext">Click to get your current location</span>
            {showPermissionButton && (
              <button 
                className="location-request-btn" 
                onClick={handleRequestLocation}
              >
                <MdMyLocation className="btn-icon" />
                Get My Location
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`location-display ${className}`}>
      <div className="location-success">
        <MdLocationOn className="location-icon success-icon" />
        <div className="location-info">
          <span className="location-text">{address || 'Current Location'}</span>
          <span className="location-accuracy">
            ±{Math.round(location.accuracy)}m accuracy
          </span>
        </div>
        <button 
          className="location-refresh-btn" 
          onClick={handleRequestLocation}
          title="Refresh location"
        >
          <MdRefresh className="refresh-icon" />
        </button>
      </div>
    </div>
  );
}

export default LocationDisplay;
