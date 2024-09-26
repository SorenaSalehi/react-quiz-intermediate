import React from "react";

export default function FinishedScreen({
  points,
  numQuestions,
  highscore,
  maxPossiblePoints,
  dispatch,
}) {
  //points percentage
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (points === 100) emoji = "🥇";
  if (points > 80 && points < 100) emoji = "🥳";
  if (points > 50 && points < 80) emoji = "💓";
  if (points > 10 && points < 50) emoji = "🙂";
  if (points === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You Scored <strong>{points}</strong> out of {numQuestions} Questions (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(highscore: {highscore} Points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Restart Quiz 🙂
      </button>
    </>
  );
}
