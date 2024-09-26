import React, { useEffect } from "react";

export default function Timer({ timeRemain, dispatch }) {
  const min = Math.floor(timeRemain / 60);
  const sec = timeRemain % 60;

  //we want to run in parent mount
  useEffect(
    function () {
      //each interval have unique id , so we use it for clear up
      const id = setInterval(function () {
        //each sec run dispatch with tick type , so will decrease the on sec
        dispatch({ type: "tick" });
      }, 1000);

      //cm(very Important clear up func)
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{sec < 10 && "0"}
      {sec}
    </div>
  );
}
