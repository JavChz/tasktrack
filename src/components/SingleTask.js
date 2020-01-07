import React from "react";

function SingleTask(props) {
  const formatHours = function(time){
    let measuredTime = new Date(null);
    measuredTime.setSeconds(time); // specify value of SECONDS
    let MHSTime = measuredTime.toISOString().substr(11, 8);
    return MHSTime;
    //return tempTime.toISOString().substr(11, 8)
  }
  return (
    <div>
      {props.task.id} - {formatHours(props.task.duration)} - Ended At {new Date(props.task.endAt).toISOString().substr(11, 8)}hrs 
    </div>
  );
}
export default SingleTask;
