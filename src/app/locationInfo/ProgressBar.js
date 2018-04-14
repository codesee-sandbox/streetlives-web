import React from "react";

function ProgressBar({ progress }) {
  return (
    <div
      style={{ backgroundColor: "#c4c4c4", fontSize: "14px" }}
      className="text-left font-weight-light p-1"
    >
      <div className="container">
        <span>Progress {progress}/10 completed</span>
      </div>
    </div>
  );
}

export default ProgressBar;