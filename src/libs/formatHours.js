 const formatHours = function(time) {
    let measuredTime = new Date(time);
    let MHSTime = measuredTime.toISOString().substr(11, 8);
    return MHSTime;
  };

  export default formatHours;