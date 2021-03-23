import React from "react";
import "./SingleTask.css";
import formatHours from "../libs/formatHours";

const SingleTask = ({ task }) => {
  return (
    <div className="singleTask">
      <div>{task.id}</div>
      <div>{task.name}</div>
      <div>{formatHours(task.duration)}</div>
      <div>{new Date(task.endAt).toLocaleTimeString("en-US")}</div>
    </div>
  );
};
export default SingleTask;
