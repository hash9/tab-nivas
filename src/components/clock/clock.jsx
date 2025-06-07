import { useState, useEffect } from "react";
import moment from 'moment-timezone';
import { getHourDegree, getMinuteSecondDegree, getSecondDegree } from './clock.constants';
import "./clock.css";

const Clock = () => {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    displayDate: [],
  });

  useEffect(() => {
    const updateClock = () => {
      const timezone = moment.tz.guess();
      const now = moment.tz(timezone);
      const hours = now.get('hour');
      const minutes = now.get('minute');
      const seconds = now.get('second');
      const day = now.format('ddd');
      const date = now.format('D');
      const combinedDateFormat = day + date;
      const displayDate = combinedDateFormat.split('');
      setTime({ hours, minutes, seconds, displayDate });
    };

    updateClock(); // initial call
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const { hours, minutes, seconds, displayDate } = time;
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
    transform: `translateY(-50%) rotate(${secondDegree - 40}deg)`
  };

  return (
    <div className="clock">
      {[...Array(12)].map((_, i) => (
        <div className="edge" key={i}></div>
      ))}
      <div className="hour hand" style={hoursStyle}></div>
      <div className="minute hand" style={minutesStyle}></div>
      <div className="date" style={dateStyle}>
        {displayDate.map((char, idx) => (
          <span key={idx}>{char}</span>
        ))}
      </div>
      <div className="second" style={secondsStyle}></div>
    </div>
  );
};

export default Clock;