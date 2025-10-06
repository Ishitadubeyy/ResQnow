import React from "react";

function SeveritySelector() {
  return (
    <div className="severity-section">
      <h3 className="severity-title">Severity</h3>
      <div className="severity-options">
        <button className="severity-option">Minor</button>
        <button className="severity-option">Moderate</button>
        <button className="severity-option">Severe</button>
      </div>
    </div>
  );
}

export default SeveritySelector;
 