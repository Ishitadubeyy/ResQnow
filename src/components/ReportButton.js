import React from "react";

function ReportButton({ text, color }) {
  return <button className={`btn ${color}`}>{text}</button>;
}

export default ReportButton;
 