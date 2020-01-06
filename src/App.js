import React, { useState, useEffect } from "react";
import "./App.css";
import Counter from "./components/Counter";



function App() {
  //const [current, setCurrent] = useState({});
  let initTaks = 0;
  if (localStorage.hasOwnProperty("tasks")) {
    initTaks = Number(localStorage.getItem("tasks"));
  }
  console.log(initTaks);
  
  const [tasks, setTasks] = useState(initTaks);
  const [timeIn, setTimeIn] = useState(0);
  const [timeInCurrent, setTimeInCurrent] = useState(0);
  const [lastClick, setLastClick] = useState(new Date().getTime());
  const [archive, setArchive] = useState([]);
  // init ClickTime
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeInCurrent(new Date().getTime() - lastClick);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [lastClick]);

  const modtask = function(type) {
    let currentTask = tasks;  

    switch (type) {
      case "plus":
        setTimeIn(new Date().getTime() - lastClick);
        console.log({timeIn,lastClick});
        setLastClick(new Date);
        // Tasks
        currentTask++;
        break;
      case "minus":
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
      setTasks(event.target.value);
  }
  return (
    <div className="App">
      <h1 >{tasks}</h1>
      <h1>Tiempo tare actual {new Date(timeInCurrent).toISOString().substr(11, 8)}</h1>
      <h2>last click at: {new Date(lastClick).toLocaleTimeString()}</h2>
      <h2>Time in last task: {new Date(timeIn).toISOString().substr(11, 8) }</h2>
      <input type="text" value={tasks} onChange={handleChange} />
      <button onClick={() => modtask("plus")}>+1</button>
      <button
        onClick={() => modtask("minus")}
        disabled={isDisabled(tasks <= 0)}
      >
        -1
      </button>
      {archive.map(t =><SingleTask task={t}></SingleTask>)}
      
    </div>
  );
}
function SingleTask(props){
  return(
    <div>
      {props.task.id}
      {props.task.timeIn}
    </div>
  )
}
export default App;
