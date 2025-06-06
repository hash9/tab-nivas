import * as React from "react";
import moment from 'moment-timezone';
import { getHourDegree, getMinuteSecondDegree, getSecondDegree } from './clock.constants';
import "./clock.css";

export default class Clock extends React.Component {
  clockInterval = "";
  constructor(props) {
    super(props);
    this.handleDate = this.handleDate.bind(this);
    this.state = {
      hours: "",
      minutes: "",
      seconds: "",
      displayDate: [],
    };
  }

  componentDidMount() {
    this.clockInterval = setInterval(this.handleDate, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.clockInterval);
  }

  handleDate() {
    const timezone = moment.tz.guess();
    const hours = moment.tz(timezone).get('hour');
    const minutes = moment.tz(timezone).get('minute');
    const seconds = moment.tz(timezone).get('second');
    const day = moment.tz(timezone).format('ddd');
    const date = moment.tz(timezone).format('D');
    const combinedDateFormat = day + date;
    const displayDate = combinedDateFormat.split('');
    this.setState({ hours, minutes, seconds, displayDate });
  }

  render() {
    const { hours, minutes, seconds, displayDate } = this.state;
    const hourDegree = getHourDegree(hours);
    const minuteDegree = getMinuteSecondDegree(minutes);
    const secondDegree = getSecondDegree(seconds);
    const secondsStyle = {
      transform: `rotate(${secondDegree}deg) translateY(420%)`
    };
    const minutesStyle = {
      transform: `rotate(${minuteDegree * 5.9}deg)`
    };
    const hoursStyle = {
      transform: `rotate(${hourDegree * 29.5}deg)`
    };
    const dateStyle = {
      transform: `translateY(-50%) rotate(${secondDegree - 40}deg) `
    };
    return (
      <div className="clock">
        <div className="edge"></div>
        <div className="edge"></div>
        <div className="edge"></div>
        <div className="edge"></div>
        <div className="edge"></div>
        <div className="edge"></div>
        <div className="edge"></div>
        <div className="edge"></div>
        <div className="edge"></div>
        <div className="edge"></div>
        <div className="edge"></div>
        <div className="edge"></div>
        <div className="hour hand" style={hoursStyle}></div>
        <div className="minute hand" style={minutesStyle}></div>
        <div className="date" style={dateStyle}>
          <span>{displayDate[0]}</span><span>{displayDate[1]}</span><span>{displayDate[2]}</span> <span>{displayDate[3]}</span><span>{displayDate[4]}</span>
        </div>
        <div className="second" style={secondsStyle}></div>
      </div>
    // </div>
    );
  }
}
