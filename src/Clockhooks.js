import { React, useState, useEffect, useRef } from "react";
import "./Clock.css";

function Clock() {
  const [sessionTime, setSessionTime] = useState(10);
  const [breakTime, setBreakTime] = useState(5);
  const [minutes, setMinutes] = useState("10");
  const [seconds, setSeconds] = useState("00");
  const [inProgress, setInProgress] = useState("session");
  const [totalTime, setTotalTime] = useState(5);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef();

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        decrementTotalTime();
      }, 1000);

      intervalRef.current = id;
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  function decrementTotalTime() {
    if (totalTime > 0) {
      setTotalTime((totalTime) => totalTime - 1);
    } else {
      console.log("finished");
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  }

  // let timer = () => {
  //   setInterval(() => {
  //     decrementTotalTime();
  //   }, 1000);
  // };

  function handleStart() {
    if (!isRunning) {
      setIsRunning(true);
      console.log("start");
    }
  }

  function handleStop() {
    setIsRunning(false);
    console.log("stop");
    clearInterval(intervalRef.current);
  }

  return (
    <div id="container">
      <div id="central-block">
        <div id="adjustments">
          <div id="session-adjustments">
            <div id="session-label">Session length</div>
            <div id="session-length">{sessionTime}</div>
            <button
              id="session-decrement"
              onClick={() => console.log("decrement")}
            >
              Down
            </button>
            <button
              id="session-increment"
              onClick={() => console.log("increment")}
            >
              Up
            </button>
          </div>
          <div id="break-adjustments">
            <div id="break-label">Break length</div>
            <div id="break-length">{breakTime}</div>
            <button
              id="break-decrement"
              onClick={() => console.log("decrementBreak")}
            >
              Down
            </button>
            <button
              id="break-increment"
              onClick={() => console.log("incrementBreak")}
            >
              Up
            </button>
          </div>
        </div>
        {/* <CountdownTimer time={this.state.displayText}/> */}
        <div id="countdown-timer">
          <div id="time-left">{totalTime}</div>
          <button
            id="start_stop"
            // onClick={() => (isRunning ? handleStop() : handleStart())}
            onClick={() => handleStart()}
          >
            Start/Pause
          </button>
          <button onClick={() => handleStop()}>stop</button>
          <div id="timer-label">{inProgress}</div>

          <audio
            className="alarm"
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            type="audio/wav"
            id="beep"
          >
            {" "}
          </audio>
        </div>
        <button id="reset" onClick={() => console.log("reset")}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Clock;
