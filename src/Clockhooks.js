import { React, useState } from "react";
import "./Clock.css";

function Clock() {
  let [sessionTime, setSessionTime] = useState(10);
  let [breakTime, setBreakTime] = useState(5);
  let [minutes, setMinutes] = useState("10");
  let [seconds, setSeconds] = useState("00");
  let [inProgress, setInProgress] = useState("session");

  return <div>Clock</div>;
}

export default Clock;
