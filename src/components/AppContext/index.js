import React from "react";
import { useState, useEffect } from "react";
import formatHours from "../../libs/formatHours";

const AppContext = React.createContext();

function AppProvider(props) {
  const initTaskDefault = 1;
  let initTasks = initTaskDefault;
  let initTimerGlobal = 0;
  let initArchive = [];
  let initGoal = 10;
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
    const saveToLocal = function () {
      localStorage.setItem("archive", JSON.stringify(archive));
      localStorage.setItem("timerGlobal", timerGlobal);
      localStorage.setItem("tasks", tasks);
      localStorage.setItem("goal", goal);
    };
    saveToLocal();
    const interval = setInterval(() => {
      if (!pause) {
        setTimer(Date.now() - last);
      }
      document.title = `TaskTraker`;
    }, 1000);
    document.title = `${formatHours(timer)} | ${tasks}`;
    setTimerGlobal(() => {
      return archive.reduce((a, b) => {
        return a + b["duration"];
      }, 0);
    });
    return () => {
      clearInterval(interval);
    };
  }, [last, tasks, timer, pause, archive, goal, timerGlobal]);

  const startTask = () => {
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

  const deleteLastTask = function () {
    setTimer(0);
    if (archive.length > 1) {
      let tempArchive = archive;
      tempArchive.pop();
      setArchive(tempArchive);
    }
    setTasks(tasks - 1);
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
    setGoal(initGoal);
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
    <AppContext.Provider
      value={{
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
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
