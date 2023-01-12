import { React, useState, useEffect } from "react";
import "./Clock.css";

function Clock() {
  const [sessionTime, setSessionTime] = useState(10);
  const [breakTime, setBreakTime] = useState(5);
  const [minutes, setMinutes] = useState("10");
  const [seconds, setSeconds] = useState("00");
  const [inProgress, setInProgress] = useState("session");
  const [totalTime, setTotalTime] = useState(600);
  const [isRunning, setIsRunning] = useState(false);

  // useEffect(() => {
  //   console.log("started: ", totalTime);
  //   if (isRunning) {
  //     const countdown = setInterval(() => decrementTotalTime, 1000);

  //     return () => clearInterval(countdown);
  //   }
  // }, [isRunning, totalTime, decrementTotalTime]);

  function decrementTotalTime() {
    setTotalTime((totalTime) => totalTime - 1);
    console.log(totalTime);
  }

  function handleStart() {
    setIsRunning(true);
    setInterval(() => decrementTotalTime, 1000);
    console.log("start");
  }

  function handleStop() {
    setIsRunning(false);
    clearInterval(setTotalTime(0));
    console.log("stop");
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
            onClick={() => (isRunning ? handleStop() : handleStart())}
          >
            Start/Pause
          </button>
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
