import React from 'react';
import './Clock.css';

class Clock extends React.Component {
  constructor(props) {
    super(props);


    this.state = {

      sessionTime: 10,
      breakTime: 5,
      minutes: "10",
      seconds: "00",
      inProgress: "session"
    }

    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.reset = this.reset.bind(this);
    this.countdownTimer = React.createRef();
  }



  reset = () => {
    this.setState({

      minutes: "10",
      seconds: "00",
      sessionTime: 10,
      breakTime: 5,
      inProgress: "session"
    })
    this.countdownTimer.current.reset();
    console.log("reset")
  }

  incrementSession = () => {
    let minutes = parseInt(this.state.minutes);
    minutes++;
    this.setState({
      minutes: minutes.toString(),
      sessionTime: this.state.sessionTime + 1
    })
  }

  decrementSession = () => {
    let minutes = parseInt(this.state.minutes);
    minutes--;
    this.setState({
      minutes: minutes.toString(),
      sessionTime: this.state.sessionTime - 1
    })
  }

  incrementBreak = () => {
    this.setState({
      breakTime: this.state.breakTime + 1
    })
  }

  decrementBreak = () => {
    this.setState({
      breakTime: this.state.breakTime - 1
    })
  }


  render() {
    return (
      <div id="central-block">
        <div id="session-label">Session length</div>
        <div id="session-length">{this.state.sessionTime}</div>
        <button id="session-decrement" onClick={this.decrementSession}>Down</button>
        <button id="session-increment" onClick={this.incrementSession}>Up</button>
        <div id="break-label">Break length</div>
        <div id="break-length">{this.state.breakTime}</div>
        <button id="break-decrement" onClick={this.decrementBreak}>Down</button>
        <button id="break-increment" onClick={this.incrementBreak}>Up</button>
        {/* <CountdownTimer time={this.state.displayText}/> */}
        <CountdownTimer minutes={this.state.minutes} seconds={this.state.seconds} breakTime={this.state.breakTime} ref={this.countdownTimer} inProgress={this.state.inProgress} />
        <button id="reset" onClick={this.reset}>Reset</button>


      </div>

    )
  }
}

class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      minutes: this.props.minutes,
      seconds: this.props.seconds,
      inProgress: this.props.inProgress
    })
    this.myCountdown = 0;
    this.countdown = this.countdown.bind(this);
    this.decrement = this.decrement.bind(this);
    // this.pause = this.pause.bind(this);
    //ensure numbers are always 2 digits with a leading zero if necessary - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
    this.leftFillNum = (num, targetLength) => {
      return num.toString().padStart(targetLength, 0);
    }

    this.reset = () => {
      clearInterval(this.myCountdown);
      this.setState({
        minutes: this.props.minutes,
        seconds: this.props.seconds,
        inProgress: this.props.inProgress
      })
    }
  }



  componentDidUpdate(prevProps) {
    if (prevProps.minutes !== this.props.minutes || prevProps.seconds !== this.props.seconds) {
      this.setState({
        minutes: this.props.minutes,
        seconds: this.props.seconds
      })
      console.log(this.state.minutes, this.state.seconds)
    }
  }


  countdown = () => {
    this.myCountdown = setInterval(this.decrement, 100);
  }



  decrement = () => {
    console.log("decrementing...")

    if (parseInt(this.state.seconds) > 0) {
      this.setState({
        seconds: this.leftFillNum(this.state.seconds - 1, 2)
      })
    }
    else if (parseInt(this.state.seconds) === 0 && parseInt(this.state.minutes) > 0) {
      this.setState({
        minutes: this.leftFillNum(this.state.minutes - 1, 2),
        seconds: 59
      })
    }
    if (this.state.minutes == 0 && this.state.seconds == 0) {
      console.log("zero - alarm will sound here");
      document.getElementById("alarm").play();
      clearInterval(this.myCountdown);
      this.setState({
        minutes: "00",
        seconds: "00"
      })

      //call function to swap timers
      this.swapSession()
    }

  }

  swapSession = () => {
    if (this.state.inProgress === "session") {

      this.setState({
        inProgress: "break",
        minutes: this.props.breakTime,
        seconds: 0
      })
    }
    else if (this.state.inProgress === "break") {
      this.setState({
        inProgress: "session",
        minutes: this.props.minutes,
        seconds: 0
      })
    }
    this.countdown()
  }

  pause = () => {
    console.log("pause");
    clearInterval(this.myCountdown);
  }




  render() {
    return (
      <div id="countdown-timer">
        <div id="time-left">
          {this.state.minutes}:{this.state.seconds}
        </div>
        <div id="current-session">{this.state.inProgress}</div>
        <button id="start_stop" onClick={this.countdown}>Start</button>
        <button onClick={this.pause}>Pause</button>
        <audio className="alarm" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" type="audio/wav" id="alarm"> </audio>
      </div>
    )
  }
}
export default Clock;
