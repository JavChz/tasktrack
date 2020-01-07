import React from "react";
import "./SingleTask.css";
function SingleTask(props) {
  const formatHours = function(time) {
    let measuredTime = new Date(null);
    measuredTime.setSeconds(time); // specify value of SECONDS
    let MHSTime = measuredTime.toISOString().substr(11, 8);
    return MHSTime;
    //return tempTime.toISOString().substr(11, 8)
  };
  return (
    <div className="singleTask">
      <div>{props.task.id}</div>
      <div>{formatHours(props.task.duration)}</div>
      <div>
        {new Date(props.task.endAt).toISOString().substr(11, 8)}hrs
      </div>
    </div>
  );
}
export default SingleTask;
