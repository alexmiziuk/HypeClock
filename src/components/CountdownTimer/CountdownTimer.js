import React, { useEffect, useState } from 'react';
import './CountdownTimer.scss';



const CountdownTimer = () => {
	const [time, setTime] = useState({ minutes: 60, seconds: 0 });
 
	useEffect(() => {
	  const timer = setInterval(() => {
		 setTime((prev) => {
			if (prev.seconds > 0) {
			  return { ...prev, seconds: prev.seconds - 1 };
			} else if (prev.minutes > 0) {
			  return { minutes: prev.minutes - 1, seconds: 59 };
			} else {
			  clearInterval(timer);
			  return { minutes: 0, seconds: 0 };
			}
		 });
	  }, 1000);
 
	  return () => clearInterval(timer);
	}, []); 
 
	const formatNumber = (num) => String(num).padStart(2, '0');
	
 
	return (
	  <section className='timer'>
		 <div className="timer__minutes">
			{formatNumber(time.minutes).split('').map((digit, index) => (
			  <div key={index} className="timer__minutes-min">{digit}</div>
			))}
		 </div>
		 <div className="timer__seconds">
			{formatNumber(time.seconds).split('').map((digit, index) => (
			  <div key={index} className="timer__seconds-sec">{digit}</div>
			))}
		 </div>
	  </section>
	);
 };

export default CountdownTimer;


