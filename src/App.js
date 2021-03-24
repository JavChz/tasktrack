import React, { useState, useEffect } from "react";
import "./App.css";

import formatHours from "./libs/formatHours";
import TaskArchive from "./components/TaskArchive";
function App() {
  const initTaskDefault = 1;
  let initTasks = initTaskDefault;
  let initTimerGlobal = 0;
  let initArchive = [];
  if (
    localStorage.hasOwnProperty("tasks") ||
    localStorage.hasOwnProperty("timerGlobal") ||
    localStorage.hasOwnProperty("archive")
  ) {
    initTasks = Number(localStorage.getItem("tasks"));
    initTimerGlobal = Number(localStorage.getItem("timerGlobal"));
    initArchive = JSON.parse(localStorage.getItem("archive")) || [];
  }
  const [archive, setArchive] = useState(initArchive);
  const [nameTask, setNameTask] = useState("");
  const [last, setLast] = useState(Date.now());
  const [pause, setPause] = useState(true);
  const [tasks, setTasks] = useState(initTasks);
  const [timer, setTimer] = useState(0);
  const [timerGlobal, setTimerGlobal] = useState(initTimerGlobal);

  // init ClickTime
  useEffect(() => {
    const interval = setInterval(() => {
      if (!pause) {
        setTimer(Date.now() - last);

      }
    }, 1000);
    document.title = `${formatHours(timer)} | ${tasks}`;
    setTimerGlobal(()=>{
      return archive.reduce( (a, b) => {
        return a + b["duration"];
      }, 0)
    });
    return () => {
      clearInterval(interval);
    };
  }, [last, tasks, timer, pause, archive]);

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
    console.log(archive);
    localStorage.setItem("archive", JSON.stringify(archive));
    localStorage.setItem("timerGlobal", timerGlobal);
    localStorage.setItem("tasks", tasks + 1);
  };
 
  const deleteLastTask = function () {
    setTimer(0);
    let tempArchive = archive;
    console.log(tempArchive.pop());
    setArchive(tempArchive);
    localStorage.setItem("tasks", tasks - 1);
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
    localStorage.setItem("tasks", initTaskDefault);
    setTasks(initTaskDefault);
    setTimer(0);
    setPause(true);
    setTimerGlobal(0);
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
  return (
    <div className="App">
      <div className="timer">
        <input
          type="text"
          value={nameTask}
          onChange={handleName}
          placeholder="Name of the Task"
        />
        <input type="number" value={tasks} onChange={handleNumber} />
        <h3>Time in current Task {formatHours(timer)}</h3>

        <div>
          <button
            className="finishTask"
            onClick={() => startTask()}
            disabled={isDisabled(pause)}
          >
            Finish current task
          </button>
        </div>
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
          <button onClick={() => resetCurrent()}>Reset CurrentTask</button>
          <button onClick={() => reset()}>Reset</button>
        </div>
      </div>
      <h5>Total Time: {formatHours(timerGlobal)} | Average {formatHours(timerGlobal/(tasks-1))}</h5>
      <TaskArchive archive={archive}></TaskArchive>
    </div>
  );
}

export default App;
