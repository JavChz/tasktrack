import React, { useState } from "react";
import "./App.css";
import Counter from "./components/Counter";

function App() {
  //const [current, setCurrent] = useState({});
  let initTaks = 0;
  if (localStorage.hasOwnProperty("tasks")) {
    initTaks = Number(localStorage.getItem("tasks"));
    console.log(initTaks);
  }

  const [tasks, setTasks] = useState(localStorage.getItem("tasks"));
  const modtask = function(type) {
    let currentTask = tasks;
    switch (type) {
      case "plus":
        currentTask++;
        break;
      case "minus":
        currentTask--;
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
  return (
    <div className="App">
      <h1>{tasks}</h1>
      <button onClick={() => modtask("plus")}>+1</button>
      <button
        onClick={() => modtask("minus")}
        disabled={isDisabled(tasks <= 0)}
      >
        -1
      </button>
      <Counter></Counter>
    </div>
  );
}

export default App;
