import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

//new(so reducer func receive to argument (cur state , action))
function reducer(state, action) {
  console.log({ ...state }); //(e.g:in the dec function = state:0,action:1)

  // return state + action; //cm(the reducer will be the value that we return here)

  // if (action.type === "dec") return state - 1;
  // if (action.type === "inc") return state + 1;
  // if (action.type === "setCount") return action.payLoad;

  //new(using switch in this situation)
  switch (action.type) {
    case "inc":
      //  return{state.count : state.count + 1}
      return { ...state, count: state.count + state.step };
    case "dec":
      return { ...state, count: state.count - state.step };
    case "setCount":
      return { ...state, count: action.payLoad };
    case "setStep":
      return { ...state, step: action.payLoad };
    case "reset":
      // return {count:0,step:1}
      return initialState;
    default:
      throw new Error("Unknown action ...");
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  //new(setReducer):
  //cm(it is not like the use State ,initial whit reducer func and initial value )
  // const [count, dispatch] = useReducer(reducer, 0);
  // const [step, setStep] = useState(1);
  //new(doing these more realWorld:)
  // const initialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // dispatch(-1);
    dispatch({ type: "dec" }); //cm(the payLoad is optional)
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    // dispatch(1);
    dispatch({ type: "inc" });
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    //cm(but in this case , it will not work,we should do this :)
    // setCount(Number(e.target.value));
    dispatch({ type: "setCount", payLoad: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({ type: "setStep", payLoad: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
