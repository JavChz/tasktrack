import React from "react";

import "./GoalsBar.css";

function GoalsBar({ goal, tasks }) {
  let progress = goal / tasks;
  progress = (100 / goal) * tasks;
  return (
    <div>

      <div className="goalsBar">
        <div className="bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

export default GoalsBar;
