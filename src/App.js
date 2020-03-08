import React, { useState, useEffect } from "react";
import "./App.css";

import formatHours from "./libs/formatHours";
import TaskArchive from './components/TaskArchive';
function App() {
  //const [current, setCurrent] = useState({});
  let initTaks = 0;
  if (localStorage.hasOwnProperty("tasks")) {
    initTaks = Number(localStorage.getItem("tasks"));
  }
  console.log(initTaks);

  const [tasks, setTasks] = useState(initTaks);
  const [archive, setArchive] = useState([]);
  const [pause, setPause] = useState(true);
  const [timer, setTimer] = useState(0);
  const [timerGlobal, setTimerGlobal] = useState(0);

  // init ClickTime
  useEffect(() => {
    const interval = setInterval(() => {
      if (!pause) {
        setTimer(timer + 1);
        setTimerGlobal(timerGlobal + 1);
        document.title = `${formatHours(timer)} | ${tasks}`;
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [pause, timer, timerGlobal, tasks]);

  const modtask = function(type) {
    let currentTask = tasks;

    switch (type) {
      case "plus":
        let entryArchive = {
          id: currentTask,
          duration: timer,
          endAt: Date.now()
        };
        setArchive(oldArchive => [...oldArchive, entryArchive]);
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
        currentTask = 1;
        break;
      default:
        break;
    }

    localStorage.setItem("tasks", currentTask);
    setTasks(currentTask);
  };
  const isDisabled = function(condition) {
    if (condition) {
      return true;
    }
    return false;
  };

  const handleChange = function(event) {
    setTasks(Number(event.target.value));
  };

  return (
    <div className="App">
      <div className="timer">
        <input
          type="text"
          value={tasks}
          onChange={handleChange}
          style={{ textAlign: "center" }}
        />
        <h3>Time in current Task {formatHours(timer)}</h3>
        <h3>Total Time: {formatHours(timerGlobal)}</h3>
        <div>
          <button
            className="finishTask"
            onClick={() => modtask("plus")}
            disabled={isDisabled(pause)}
          >
            Finish current task
          </button>
        </div>
        <div className="toolButtons">
          {pause ? (
            <button onClick={() => setPause(false)}>Start</button>
          ) : (
            <button onClick={() => setPause(true)}>Pause</button>
          )}
        </div>

        <button
          onClick={() => modtask("minus")}
          disabled={isDisabled(tasks <= 1)}
        >
          Undo
        </button>
      </div>
      <TaskArchive archive={archive}></TaskArchive>
    </div>
  );
}

export default App;
