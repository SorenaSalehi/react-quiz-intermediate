import React from "react";

export default function Progress({
  answer,
  index,
  numQuestions,
  points,
  maxPossiblePoints,
}) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        //for starting progress from 1 , we do this : if true return 1 + index = 1
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}
