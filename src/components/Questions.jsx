import React from "react";

export default function Questions({ questions, dispatch, answer, index }) {
  console.log(questions);
  return (
    <div>
      <h4>{questions.question}</h4>
      <Options
        options={questions.options}
        correctOption={questions.correctOption}
        dispatch={dispatch}
        index={index}
        answer={answer}
      />
    </div>
  );
}

function Options({ options, correctOption, dispatch, answer, index }) {
  const hasAnswered = answer !== null;
  return (
    <div>
      {options.map((option, index) => (
        <button
          className={`btn btn-option ${
            //if answered , check it is correct or not for css
            hasAnswered ? (index === correctOption ? "correct" : "wrong") : ""
          } ${answer === index ? "answer" : ""}`}
          disabled={hasAnswered}
          key={option}
          //payload is index ,than will compare whit correct answer from question
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
