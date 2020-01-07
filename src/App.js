import React, { useState, useEffect } from "react";
import "./App.css";
import SingleTask from "./components/SingleTask";

function App() {
  //const [current, setCurrent] = useState({});
  let initTaks = 0;
  if (localStorage.hasOwnProperty("tasks")) {
    initTaks = Number(localStorage.getItem("tasks"));
  }
  console.log(initTaks);
  /*
  archove = {
    id: 1,
    endAt: Date,
    duration: Number | Date.getTime(),
  }
  */
  const [tasks, setTasks] = useState(initTaks);

  //const [timeIn, setTimeIn] = useState(0);
  //const [timeInCurrent, setTimeInCurrent] = useState(0);
  // const [lastClick, setLastClick] = useState(new Date().getTime());
  const [archive, setArchive] = useState([]);
  const [pause, setPause] = useState(true);
  const [timer, setTimer] = useState(0);
  // init ClickTime
  useEffect(() => {
    const interval = setInterval(() => {
      if (!pause) {
        //setTimeInCurrent(new Date().getTime() - lastClick);
        setTimer(timer + 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [tasks, pause, timer]);

  const modtask = function(type) {
    let currentTask = tasks;

    switch (type) {
      case "plus":
        setPause(false);
        let entryArchive = {
          id: currentTask,
          duration: timer,
          endAt: new Date()
        };
        setArchive(oldArchive => [...oldArchive, entryArchive]);
        setTimer(0);
        // Tasks
        currentTask++;
        break;
      case "minus":
        setTimer(0);
        currentTask--;
        break;
      case "reset":
        currentTask = 0;
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
  const formatHours = function(time) {
    let measuredTime = new Date(null);
    measuredTime.setSeconds(time);
    let MHSTime = measuredTime.toISOString().substr(11, 8);
    return MHSTime;
  };
  return (
    <div className="App">
      <div className="timer">
        <input type="text" value={tasks} onChange={handleChange} />
        <h2>Time in current Task {formatHours(timer)}</h2>
        {pause ? (
          <button onClick={() => setPause(false)}>Start</button>
        ) : (
          <button onClick={() => setPause(true)}>Pause</button>
        )}

        <button onClick={() => modtask("plus")}>Finish current task</button>
        <button
          onClick={() => modtask("minus")}
          disabled={isDisabled(tasks <= 0)}
        >
          Undo
        </button>
      </div>

      <div className="taskArchive">
        <div className="singleTask">
          <div>#</div>
          <div>Duration</div>
          <div>Ended at</div>
        </div>
        {archive
          .slice(0)
          .reverse()
          .map((singleTask, index) => (
            <SingleTask task={singleTask} key={index}></SingleTask>
          ))}
      </div>
    </div>
  );
}

export default App;
