import React, { useState, useEffect } from "react";
import "./App.css";

import formatHours from "./libs/formatHours";
import TaskArchive from "./components/TaskArchive";
import Goals from "./components/Goals/Goals";
import GoalsBar from "./components/GoalsBar/GoalsBar";

function App() {
  const initTaskDefault = 1;
  let initTasks = initTaskDefault;
  let initTimerGlobal = 0;
  let initArchive = [];
  let initGoal = 250;
  if (
    localStorage.hasOwnProperty("tasks") ||
    localStorage.hasOwnProperty("timerGlobal") ||
    localStorage.hasOwnProperty("archive") ||
    localStorage.hasOwnProperty("goal")
  ) {
    initTasks = Number(localStorage.getItem("tasks"));
    initTimerGlobal = Number(localStorage.getItem("timerGlobal"));
    initArchive = JSON.parse(localStorage.getItem("archive")) || [];
    initGoal = Number(localStorage.getItem("goal")) || initGoal;
  }
  const [archive, setArchive] = useState(initArchive);
  const [nameTask, setNameTask] = useState("");
  const [last, setLast] = useState(Date.now());
  const [pause, setPause] = useState(true);
  const [tasks, setTasks] = useState(initTasks);
  const [timer, setTimer] = useState(0);
  const [timerGlobal, setTimerGlobal] = useState(initTimerGlobal);
  const [goal, setGoal] = useState(initGoal);
  const [goalKind, setGoalKind] = useState("tasks");

  // init ClickTime
  useEffect(() => {
    const interval = setInterval(() => {
      if (!pause) {
        setTimer(Date.now() - last);
      }
    }, 1000);
    document.title = `${formatHours(timer)} | ${tasks}`;
    setTimerGlobal(() => {
      return archive.reduce((a, b) => {
        return a + b["duration"];
      }, 0);
    });
    saveToLocal();
    return () => {
      clearInterval(interval);
    };
  }, [last, tasks, timer, pause, archive, goal]);

  const startTask = function () {
    let entryArchive = {
      id: tasks,
      name: nameTask,
      duration: timer,
      endAt: Date.now(),
    };
    setArchive((oldArchive) => [...oldArchive, entryArchive]);
    setTimer(0);
    setLast(Date.now());
    setTasks(tasks + 1);
  };
  const saveToLocal = function(){
    localStorage.setItem("archive", JSON.stringify(archive));
    localStorage.setItem("timerGlobal", timerGlobal);
    localStorage.setItem("tasks", tasks);
    localStorage.setItem("goal", goal);
  }
  const deleteLastTask = function () {
    setTimer(0);
    if(archive.length > 1){
      let tempArchive = archive;
      tempArchive.pop();
      setArchive(tempArchive);
    }
    setTasks(tasks-1);
    saveToLocal();
  };
  const isDisabled = function (condition) {
    if (condition) {
      return true;
    }
    return false;
  };
  const reset = function () {
    localStorage.clear();
    localStorage.setItem("tasks", initTaskDefault);
    localStorage.setItem("goal", initGoal);
    setArchive([]);
    setTasks(initTaskDefault);
    setTimer(0);
    setPause(true);
    setTimerGlobal(0);
    setGoal(initGoal)
  };
  const pauseTask = function (status) {
    setLast(Date.now());
    if (status) {
      setTimer(0);
    }
    setPause(status);
  };
  const resetCurrent = function () {
    localStorage.clear();
    setLast(Date.now());
    setTimer(0);
  };
  const handleNumber = function (event) {
    setTasks(Number(event.target.value));
  };
  const handleName = function (event) {
    setNameTask(String(event.target.value));
  };
  const handleGoals = function (event) {   
    setGoal(Number(event.target.value));
  };
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

export default App;
