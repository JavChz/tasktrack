import React from "react";

import "./Goals.css";

function Goals({ goal, handleGoals, tasks }) {
  let progress = goal / tasks;
  progress = (100 / goal) * tasks;

  return (
    <div className="Goals">
      <h6>
        {progress.toFixed(2)}% of 100% | {tasks} of{" "}
        <input
          type="number"
          value={goal}
          onChange={handleGoals}
          onBlur={handleGoals}
          placeholder="No. of Goals"
        />
      </h6>
    </div>
  );
}

export default Goals;
