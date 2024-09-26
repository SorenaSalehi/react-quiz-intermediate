import { type } from "@testing-library/user-event/dist/type";
import React from "react";

export default function NextQuestion({
  dispatch,
  answer,
  index,
  numQuestions,
}) {
  //quick return
  if (answer === null) return null;

  //index are zero base , but numQuestion start from 1
  if (index < numQuestions - 1) {
    //if still have question
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }
  if (index === numQuestions - 1) {
    //if questions finished
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish
      </button>
    );
  }
}
