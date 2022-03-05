import React, { useContext } from "react";
import { AppContext } from "../AppContext";

function ToolButtons() {
  const {
    pauseTask,
    reset,
    resetCurrent,
    pause,
    isDisabled,
    tasks,
    deleteLastTask,
  } = useContext(AppContext);
  return (
    <div className="toolButtons">
      <button
        onClick={() => deleteLastTask()}
        disabled={isDisabled(tasks <= 1)}
      >
        Undo
      </button>
      {pause ? (
        <button onClick={() => pauseTask(false)}>Start</button>
      ) : (
        <button onClick={() => pauseTask(true)}>Stop</button>
      )}
      <button onClick={() => resetCurrent()}>Reset Current</button>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
}

export { ToolButtons };
