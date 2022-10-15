import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const useInterval = (callback: () => unknown, delay: number | null) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay == null) {
      return;
    }

    const timeId = setInterval(() => savedCallback.current(), delay);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(timeId);
  }, [delay]);
};

function App() {
  const [isFirstStart, setIsFirstState] = useState(true);
  const [runState, setRunState] = useState(false);
  const [restTime, setRestTime] = useState(45);

  useInterval(
    () => {
      setRestTime(restTime - 1);
    },
    runState ? 1000 : null
  );

  return (
    <div className="App">
      <form
        style={{ display: "flex", justifyContent: "center" }}
        onChange={(e) => setRestTime(e.currentTarget.mingroup.value)}
      >
        <input
          type="radio"
          value="45"
          id="45Min"
          name="mingroup"
          defaultChecked
        ></input>
        <label htmlFor="45Min">45Min</label>
        <input type="radio" value="30" id="30Min" name="mingroup"></input>
        <label htmlFor="30Min">35Min</label>
        <input type="radio" value="15" id="15Min" name="mingroup"></input>
        <label htmlFor="15Min">15Min</label>
      </form>

      <div>{restTime}</div>
      <button
        onClick={() => {
          setRestTime(100);
          setIsFirstState(true);
          setRunState(false);
        }}
      >
        clear
      </button>
      <button
        onClick={() => {
          setIsFirstState(false);
          setRunState((prev) => !prev);
        }}
      >
        {isFirstStart ? "start" : runState ? "stop" : "restart"}
      </button>
    </div>
  );
}

export default App;
