import { React, useState, useEffect, useRef } from "react";
import "./Clock.css";

function Clock() {
  //DEFAULT VALUES
  const DEFAULT_SESSION_TIME = 25;
  const DEFAULT_BREAK_TIME = 5;
  const ALARM_SOUND_URL =
    "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav";

  //STATE & REFS
  const [sessionTime, setSessionTime] = useState(DEFAULT_SESSION_TIME);
  const [breakTime, setBreakTime] = useState(DEFAULT_BREAK_TIME);
  const [sessionType, setSessionType] = useState("session");
  const [totalTime, setTotalTime] = useState();
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef();

  //USE EFFECTS

  //MAIN TIMER
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

  //SET TIMERS IN RESPONSE TO USER ADJUSTMENTS AND SESSION SWAPS
  useEffect(() => {
    sessionType === "session"
      ? setTotalTime(sessionTime * 60)
      : setTotalTime(breakTime * 60);
  }, [sessionTime, breakTime, sessionType]);

  //USED ONLY FOR LOGGING IN DEV
  useEffect(() => {
    isRunning
      ? console.log("start " + sessionType)
      : console.log("stop " + sessionType);
  }, [sessionType, isRunning]);

  //ALARM
  function playAlarmSound() {
    console.log("play alarm sound");
    document.getElementById("beep").play();
  }

  //SWAP SESSION
  function swapSession() {
    console.log("swap session");
    clearInterval(intervalRef.current);
    sessionType === "session"
      ? setSessionType("break")
      : setSessionType("session");
    document.getElementById("time-left").style.color = "";
    handleStart();
  }

  //CALLED BY MAIN TIMER EVERY SECOND
  async function decrementTotalTime() {
    if (totalTime === 1) {
      setTotalTime(0);
      playAlarmSound();
      console.log("finished");
      swapSession();
    } else if (totalTime > 1) {
      setTotalTime((totalTime) => totalTime - 1);
      if (totalTime <= 60) {
        document.getElementById("time-left").style.color = "Red";
      }
    }
  }

  //START
  function handleStart() {
    if (!isRunning) {
      setIsRunning(true);
    }
  }

  //STOP
  function handleStop() {
    setIsRunning(false);
    console.log("stop");
    clearInterval(intervalRef.current);
  }

  //RESET
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

  //USER ADJUSTMENTS
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

  //RETURN
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
            src={ALARM_SOUND_URL}
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
