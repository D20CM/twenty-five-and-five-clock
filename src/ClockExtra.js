import React from 'react';
import './Clock.css';


class Clock extends React.Component {
    constructor(props) {
        super(props);


        this.state = {

            sessionTime: 25,
            breakTime: 5,
            minutes: 25,
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

            minutes: 25,
            seconds: "00",
            sessionTime: 25,
            breakTime: 5,
            inProgress: "session"
        })
        this.countdownTimer.current.reset();
        console.log("reset")
    }

    incrementSession = () => {
        const currentCountdownTimer = this.countdownTimer.current;
        console.log(this.state.inProgress)
        if (!currentCountdownTimer.state.running && currentCountdownTimer.state.inProgress == "session"){
        
            let minutes = parseInt(this.state.minutes);
        minutes++;
        if (minutes > 60) {
            minutes = 60;
        this.setState({
            minutes: minutes.toString(),
            sessionTime: minutes
        })
        }
        else{
            this.setState({
                minutes: minutes.toString(),
                sessionTime: minutes
            })
        }
    }
    }

    decrementSession = () => {
        const currentCountdownTimer = this.countdownTimer.current;
        
        if (!currentCountdownTimer.state.running && currentCountdownTimer.state.inProgress == "session"){


        let minutes = parseInt(this.state.minutes);
        minutes--;
            if (minutes < 1) {
                minutes = 1;
                this.setState({
                    minutes: minutes.toString(),
                    sessionTime: minutes
                })
            }
            else {
                this.setState({
                    minutes: minutes.toString(),
                    sessionTime: minutes
                })
            }
        }
    }


    incrementBreak = () => {
        const currentCountdownTimer = this.countdownTimer.current;
        //******************************************************************************
        if (!currentCountdownTimer.state.running){

        if (this.state.breakTime < 60) {
            this.setState({
                breakTime: this.state.breakTime + 1
            })
        }
          if (currentCountdownTimer.state.inProgress === ("break") && !currentCountdownTimer.state.running){
             if (this.state.breakTime < 60) {
            this.setState({
              minutes: this.state.breakTime +1,
                breakTime: this.state.breakTime + 1
            })
             }
          }
    }
    }

    decrementBreak = () => {
        const currentCountdownTimer = this.countdownTimer.current;
        // ******************************************************************(*******)
        if (!currentCountdownTimer.state.running){
        if (this.state.breakTime > 1) {
            this.setState({
                breakTime: this.state.breakTime - 1
            })
        }
          if (currentCountdownTimer.state.inProgress === ("break") && !currentCountdownTimer.state.running){
              if (this.state.breakTime > 1) {
            this.setState({
              minutes: this.state.breakTime -1,
                breakTime: this.state.breakTime - 1
            })
              }
          }
    }
    }


    render() {
        return (
            <div id="container">
            <div id="central-block">
                <div id="adjustments">
                    <div id="session-adjustments">
                        <div id="session-label">Session length</div>
                        <div id="session-length">{this.state.sessionTime}</div>
                        <button id="session-decrement" onClick={this.decrementSession}>Down</button>
                        <button id="session-increment" onClick={this.incrementSession}>Up</button>
                    </div>
                    <div id="break-adjustments">
                        <div id="break-label">Break length</div>
                        <div id="break-length">{this.state.breakTime}</div>
                        <button id="break-decrement" onClick={this.decrementBreak}>Down</button>
                        <button id="break-increment" onClick={this.incrementBreak}>Up</button>
                    </div>
                </div>
                {/* <CountdownTimer time={this.state.displayText}/> */}
                <CountdownTimer minutes={this.state.minutes} seconds={this.state.seconds} sessionTime={this.state.sessionTime} breakTime={this.state.breakTime} ref={this.countdownTimer} inProgress={this.state.inProgress} />
                <button id="reset" onClick={this.reset}>Reset</button>


            </div>
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
            inProgress: this.props.inProgress,
            running: false
        })
      
        
        this.myCountdown = 0;
        this.countdown = this.countdown.bind(this);
        this.decrement = this.decrement.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.pause = this.pause.bind(this);
        //ensure numbers are always 2 digits with a leading zero if necessary - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
        this.leftFillNum = (num, targetLength) => {
            return num.toString().padStart(targetLength, 0);
        }

        this.reset = () => {
            clearInterval(this.myCountdown);
            document.getElementById("beep").pause();
            document.getElementById("beep").currentTime = 0;
            document.getElementById("time-left").style.color = ""
            this.setState({
                minutes: this.leftFillNum(this.props.minutes,2),
                seconds: this.leftFillNum(this.props.seconds,2),
                running: false,
                inProgress: "session"
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
      
      if (prevProps.inProgress !== this.props.inProgress){
        this.setState({
          inProgress: this.props.inProgress
        })
      }
    }


    countdown = () => {
      console.log("session length = " + this.props.sessionTime, "break length = "  + this.props.breakTime);
      console.log("countdown function start" + this.state.inProgress)
        this.myCountdown = setInterval(this.decrement, 1000);
        this.setState({
            running: true,
          inProgress: this.state.inProgress
            
        })
    }



    decrement = () => {
        console.log("decrementing...")
      /*console.log("decrement " + this.state.inProgress)
      console.log(this.props.sessionTime)
      console.log(this.props.breakTime)*/

        if (parseInt(this.state.seconds) > 0 && parseInt(this.state.minutes) > 0 ){
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
      
        else if (this.state.minutes == 0 && this.state.seconds >= 0) {
            document.getElementById("time-left").style.color = "Red"
           this.setState({
                seconds: this.leftFillNum(this.state.seconds - 1, 2)
            })
        }
      
        if (this.state.minutes == 0 && this.state.seconds == -1) {
          
            console.log("zero - alarm will sound here");
          console.log(this.state.inProgress + "at alarm sound")
            document.getElementById("beep").play();
            clearInterval(this.myCountdown)
            this.setState({
                minutes: this.leftFillNum(0,2),
                seconds: this.leftFillNum(0,2)
            })
          if (this.state.inProgress === "session"){
            this.setState({
              inProgress: "break"
            })
            
          }
          else{
            this.setState({
              inProgress: "session"
            })
          }
          
          document.getElementById("time-left").style.color = "";
            //call function to swap timers
          console.log("test1" + this.state.inProgress)
                     this.swapSession()
                 
        }

    }

    swapSession = () => {
      console.log("swapSession function")
      console.log("test2" + this.state.inProgress)
      console.log(this.props.sessionTime)
      console.log(this.props.breakTime)
        if (this.state.inProgress === "break") {

            this.setState({
                minutes: this.leftFillNum(this.props.breakTime,2),
                seconds: this.leftFillNum(0,2)
            })
          
        }
        else if (this.state.inProgress === "session") {
            this.setState({
                minutes: this.leftFillNum(this.props.minutes,2),
                seconds: this.leftFillNum(0,2)
            })
        }
        this.countdown()
    }

    pause = () => {
        console.log("pause");
        clearInterval(this.myCountdown);
        this.setState({
            running: false
            
        })
    }

    handleStart = () => {
        if (!this.state.running) {
            this.countdown()
        }
        else {
            this.pause();
        }
    }

  
   
render()
  
  {

        return (
            <div id="countdown-timer">
                <div id="time-left">
                    {this.state.minutes}:{this.state.seconds}
                </div>
                <button id="start_stop" onClick={this.handleStart}>Start/Pause</button>
            <div id="timer-label">{this.state.inProgress}</div>
            
           
               
                <audio className="alarm" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" type="audio/wav" id="beep"> </audio>
            </div>
        )
    }
}


export default Clock;
