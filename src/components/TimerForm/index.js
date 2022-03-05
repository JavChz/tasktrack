import React, {useContext} from "react";
import { AppContext } from "../AppContext";
import formatHours from "../../libs/formatHours";
function TimerForm() {
  const {
    nameTask,
    handleName,
    handleNumber,
    timer,
    pause,
    isDisabled,
    tasks,
    startTask,
  } = useContext(AppContext);
  return (
    <>
      <input
        type="text"
        value={nameTask}
        onChange={handleName}
        placeholder="Name of the Task"
      />
      <input type="number" value={tasks} onChange={handleNumber} />
      <h3>Time in current task</h3>
      <h2>{formatHours(timer)}</h2>
      <button
        className="finishTask"
        onClick={() => startTask()}
        disabled={isDisabled(pause)}
      >
        Finish current task
      </button>
    </>
  );
}

export { TimerForm };
