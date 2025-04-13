import React, { useEffect, useState } from 'react';
import './CountdownTimer.scss';

const CountdownTimer = ({ fixedTime }) => {
  const parseTime = (timeStr) => {
    if (!timeStr) return { hours: 0, minutes: 0, seconds: 0 };
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    return { hours, minutes, seconds };
  };

  const [time, setTime] = useState(parseTime(fixedTime));
  const [currentTimer, setCurrentTimer] = useState(null);

  useEffect(() => {
    const newTime = parseTime(fixedTime);
    setTime(newTime);
    
    return () => {
      if (currentTimer) clearInterval(currentTimer);
    };
  }, [fixedTime]);

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        clearInterval(timerID);
        return prev;
      });
    }, 1000);

    setCurrentTimer(timerID);
    return () => clearInterval(timerID);
  }, [time]);

	const formatNumber = (num) => String(num).padStart(2, '0');

	return (
    <section className='timer'>
		 {time.hours > 0 && (
        <div className="timer__hours">
          {formatNumber(time.hours).split('').map((digit, index) => (
            <div key={index} className="timer__hours-hour">{digit}</div>
          ))}
        </div>
			)}
		{(time.hours > 0 || time.minutes > 0) && (
      <div className="timer__minutes">
        {formatNumber(time.minutes).split('').map((digit, index) => (
          <div key={index} className="timer__minutes-min">{digit}</div>
        ))}
      </div>
			)}
			{(time.hours > 0 || time.minutes > 0 || time.seconds > 0) && (
      <div className="timer__seconds">
        {formatNumber(time.seconds).split('').map((digit, index) => (
          <div key={index} className="timer__seconds-sec">{digit}</div>
        ))}
				</div>
			)}
    </section>
  );
};

export default CountdownTimer;