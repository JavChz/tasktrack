import React from "react";

import "./GoalsBar.css";

function GoalsBar({ goal, tasks }) {
  let progress = goal / tasks;
  let overdone = false;
  progress = (100 / goal) * tasks;
  if (progress >= 100) {
    progress = 100;
    overdone = true;
  }
  return (
    <div>
      <div className="GoalsBar">
        <div
          className={`GoalsBar__bar ${overdone ? "GoalsBar__bar--completed" : ""}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export { GoalsBar};
