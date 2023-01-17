import { React, useState, useEffect, useRef } from "react";
import "./Clock.css";

function Clock() {
  const [sessionTime, setSessionTime] = useState(10);
  const [breakTime, setBreakTime] = useState(5);
  // const [minutes, setMinutes] = useState("10");
  // const [seconds, setSeconds] = useState("00");
  const [sessionType, setSessionType] = useState("session");
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

  useEffect(() => {
    sessionType === "session"
      ? setTotalTime(sessionTime * 60)
      : setTotalTime(breakTime * 60);
  }, [sessionTime, breakTime, sessionType]);

  function decrementTotalTime() {
    if (totalTime > 0) {
      setTotalTime((totalTime) => totalTime - 1);
    } else {
      console.log("finished");
      // setIsRunning(false);
      clearInterval(intervalRef.current);
      //sound alarm
      sessionType === "session"
        ? setSessionType("break")
        : setSessionType("session");
      handleStart();
    }
  }

  function handleStart() {
    if (!isRunning) {
      setIsRunning(true);
      console.log("start " + sessionType);
    }
  }

  function handleStop() {
    setIsRunning(false);
    console.log("stop");
    clearInterval(intervalRef.current);
  }

  function handleReset() {
    setIsRunning(false);
    console.log("reset");
    clearInterval(intervalRef.current);
    setTotalTime(sessionTime * 60);
    setSessionType("session");
  }

  function decrementSession() {
    setSessionTime((sessionTime) => sessionTime - 1);
    console.log("decrement session");
  }

  function incrementSession() {
    setSessionTime((sessionTime) => sessionTime + 1);
    console.log("increment session");
  }
  function decrementBreak() {
    setBreakTime((breakTime) => breakTime - 1);
    console.log("decrement break");
  }

  function incrementBreak() {
    setBreakTime((breakTime) => breakTime + 1);
    console.log("increment break");
  }

  return (
    <div id="container">
      <div id="central-block">
        <div id="adjustments">
          <div id="session-adjustments">
            <div id="session-label">Session length</div>
            <div id="session-length">{sessionTime}</div>
            <button id="session-decrement" onClick={() => decrementSession()}>
              Down
            </button>
            <button id="session-increment" onClick={() => incrementSession()}>
              Up
            </button>
          </div>
          <div id="break-adjustments">
            <div id="break-label">Break length</div>
            <div id="break-length">{breakTime}</div>
            <button id="break-decrement" onClick={() => decrementBreak()}>
              Down
            </button>
            <button id="break-increment" onClick={() => incrementBreak()}>
              Up
            </button>
          </div>
        </div>
        {/* <CountdownTimer time={this.state.displayText}/> */}
        <div id="countdown-timer">
          <div id="time-left">
            {((totalTime - (totalTime % 60)) / 60).toString().padStart(2, 0)}:
            {(totalTime % 60).toString().padStart(2, 0)}
          </div>
          <button
            id="start_stop"
            onClick={() => (isRunning ? handleStop() : handleStart())}
          >
            Start/Pause
          </button>

          <div id="timer-label">{sessionType}</div>

          <audio
            className="alarm"
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            type="audio/wav"
            id="beep"
          >
            {" "}
          </audio>
        </div>
        <button id="reset" onClick={() => handleReset()}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Clock;
