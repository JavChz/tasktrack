import React from "react";
import "./SingleTask.css";

const formatHours = function(time) {
  let measuredTime = new Date(null);
  measuredTime.setSeconds(time); // specify value of SECONDS
  let MHSTime = measuredTime.toISOString().substr(11, 8);
  return MHSTime;
};

const SingleTask = ({task}) => {
  return (
    <div className="singleTask">
      <div>{task.id}</div>
      <div>{formatHours(task.duration)}</div>
      <div>
        {new Date(task.endAt).toLocaleTimeString('en-US') }
      </div>
    </div>
  );
}
export default SingleTask;
