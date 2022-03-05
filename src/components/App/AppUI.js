import React, { useContext } from "react";

import { AppContext } from "./AppContext";

import formatHours from "../../libs/formatHours";
import TaskArchive from "../TaskArchive";
import Goals from "../Goals";
import GoalsBar from "../GoalsBar";

function AppUI() {
  const {
		goalKind,
		reset,
		timer,
    archive,
    deleteLastTask,
    goal,
    handleGoals,
    handleName,
    handleNumber,
    isDisabled,
    nameTask,
    pause,
    pauseTask,
    resetCurrent,
    startTask,
    tasks,
    timerGlobal,
  } = useContext(AppContext);
  return (
    <div className="Main">
      <div className="timer">
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
      </div>
      <Goals
        goalKind={goalKind}
        goal={goal}
        tasks={tasks}
        handleGoals={handleGoals}
      ></Goals>
      <GoalsBar goal={goal} tasks={tasks}></GoalsBar>
      <h6>
        Total Time: {formatHours(timerGlobal)} | Average{" "}
        {timerGlobal && formatHours(timerGlobal / archive.length)}
      </h6>
      <TaskArchive archive={archive} timerGlobal={timerGlobal}></TaskArchive>
    </div>
  );
}

export { AppUI };
