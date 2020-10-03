import React, { useState, useEffect } from "react";
import "./App.css";

import formatHours from "./libs/formatHours";
import TaskArchive from "./components/TaskArchive";
function App() {
  const initTaskDefault = 1;
  let initTasks = initTaskDefault;

  let initTimerGlobal = 0;
  if (
    localStorage.hasOwnProperty("tasks") ||
    localStorage.hasOwnProperty("timerGlobal")
  ) {
    initTasks = Number(localStorage.getItem("tasks"));
    initTimerGlobal = Number(localStorage.getItem("timerGlobal"));
  }

  const [tasks, setTasks] = useState(initTasks);
  const [archive, setArchive] = useState([]);
  const [pause, setPause] = useState(true);
  const [timer, setTimer] = useState(0);
  const [timerGlobal, setTimerGlobal] = useState(initTimerGlobal);

  // init ClickTime
  useEffect(() => {
    const interval = setInterval(() => {
      if (!pause) {
        setTimer(timer + 1);
        setTimerGlobal(timerGlobal + 1);
        localStorage.setItem("timerGlobal", timerGlobal);
      }
      document.title = `${formatHours(timer)} | ${tasks}`;
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [pause, timer, timerGlobal, tasks]);

  const modTask = function (type) {
    let currentTask = tasks;
    switch (type) {
      case "plus":
        let entryArchive = {
          id: currentTask,
          duration: timer,
          endAt: Date.now(),
        };
        setArchive((oldArchive) => [...oldArchive, entryArchive]);
        setPause(false);
        setTimer(0);
        // Tasks
        currentTask++;
        break;
      case "minus":
        setPause(false);
        setTimer(0);
        currentTask--;
        let tempArchive = archive;
        console.log(tempArchive.pop());
        setArchive(tempArchive);
        break;
      case "reset":
        currentTask = initTaskDefault;
        break;
      default:
        break;
    }

    localStorage.setItem("tasks", currentTask);
    setTasks(currentTask);
  };
  const isDisabled = function (condition) {
    if (condition) {
      return true;
    }
    return false;
  };
  const reset = function () {
    localStorage.clear();
    setArchive([]);
    modTask("reset");
    setTimer(0);
    setPause(true);
    setTimerGlobal(0);
  };
  const resetCurrent = function () {
    localStorage.clear();

    setTimer(0);
  };
  const handleChange = function (event) {
    setTasks(Number(event.target.value));
  };

  return (
    <div className="App">
      <div className="timer">
        <input
          type="number"
          value={tasks}
          onChange={handleChange}
          style={{ textAlign: "center" }}
        />
        <h3>Time in current Task {formatHours(timer)}</h3>
        <h5>Total Time: {formatHours(timerGlobal)}</h5>
        <div>
          <button
            className="finishTask"
            onClick={() => modTask("plus")}
            disabled={isDisabled(pause)}
          >
            Finish current task
          </button>
        </div>
        <div className="toolButtons">
          <button
            onClick={() => modTask("minus")}
            disabled={isDisabled(tasks <= 1)}
          >
            Undo
          </button>
          {pause ? (
            <button onClick={() => setPause(false)}>Start</button>
          ) : (
            <button onClick={() => setPause(true)}>Pause</button>
          )}
          <button onClick={() => resetCurrent()}>Reset CurrentTask</button>
          <button onClick={() => reset()}>Reset</button>
        </div>
      </div>
      <TaskArchive archive={archive}></TaskArchive>
    </div>
  );
}

export default App;
