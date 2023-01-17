import { React, useState, useEffect, useRef } from "react";
import "./Clock.css";

function Clock() {
  const [sessionTime, setSessionTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [sessionType, setSessionType] = useState("session");
  const [totalTime, setTotalTime] = useState();
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

  useEffect(() => {
    isRunning
      ? console.log("start " + sessionType)
      : console.log("stop " + sessionType);
  }, [sessionType, isRunning]);

  function decrementTotalTime() {
    if (totalTime > 0) {
      setTotalTime((totalTime) => totalTime - 1);
      if (totalTime <= 60) {
        document.getElementById("time-left").style.color = "Red";
      }
    } else {
      console.log("finished");
      clearInterval(intervalRef.current);
      document.getElementById("beep").play();
      sessionType === "session"
        ? setSessionType("break")
        : setSessionType("session");
      document.getElementById("time-left").style.color = "";

      handleStart();
    }
  }

  function handleStart() {
    if (!isRunning) {
      setIsRunning(true);
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
    setSessionTime(25);
    setBreakTime(5);
    setTotalTime(25 * 60);
    setSessionType("session");
    document.getElementById("time-left").style.color = "";
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
  }

  function decrementSession() {
    sessionTime > 1 && setSessionTime((sessionTime) => sessionTime - 1);
  }

  function incrementSession() {
    sessionTime < 60 && setSessionTime((sessionTime) => sessionTime + 1);
  }
  function decrementBreak() {
    breakTime > 1 && setBreakTime((breakTime) => breakTime - 1);
  }

  function incrementBreak() {
    breakTime < 60 && setBreakTime((breakTime) => breakTime + 1);
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

        <div id="countdown-timer">
          <div id="time-left">
            {((totalTime - (totalTime % 60)) / 60).toString().padStart(2, 0)}:
            {(totalTime % 60).toString().padStart(2, 0)}
          </div>
          <div>{totalTime}</div>
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
