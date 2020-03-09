import React from "react";
import SingleTask from "./SingleTask";

const TaskArchive = ({archive}) => {
  return (
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
  );
}
export default TaskArchive;
