// import DateCounter from "./DateCounter";
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Footer from "./Footer";
import Timer from "./Timer";

//each question have 30 sec
const SECS_PER_QUESTIONS = 30;


const initialState = {
  //will come from fake api
  questions: [],

  //Loading,error,ready,active,answer,finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timeRemain: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return {
        ...state,
        status: "active",
        timeRemain: state.questions.length * SECS_PER_QUESTIONS,
      };

      //give answer
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        status: "active",
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "reset":
      return { ...initialState, status: "ready", questions: state.questions };

      //for timer
    case "tick":
      return {
        ...state,
        timeRemain: state.timeRemain - 1,
        status: state.timeRemain === 0 ? "finished" : "active",
      };

    default:
      throw new Error("action unknown");
  }
}

export default function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [
    { questions, status, index, answer, points, highscore, timeRemain },
    dispatch,
  ] = useReducer(reducer, initialState);

  //number of questions from api
  const numQuestions = questions?.length;
  //max points from answers
  const maxPossiblePoints = questions?.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  //fetch api
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {/* //new(now instance of passing event handlers, we pass the dispatch function) */}
        {/* //1.after fetching api */}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {/* //2.start quiz */}
        {status === "active" && (
          <>
            <Progress
              answer={answer}
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Questions
              questions={questions[index]}
              dispatch={dispatch}
              index={index}
              answer={answer}
            />
            <Footer>
              <Timer timeRemain={timeRemain} dispatch={dispatch} />
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {/* //3.finished */}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            numQuestions={numQuestions}
            highscore={highscore}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
