import './TimeDifference.scss';
import React from 'react'

function TimeDifference({ time }) {
	// Добавьте проверку на существование time
	if (!time) return <div>No time data</div>;
 
	const timeString = `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
	console.log(timeString);
	
	return (
	  <div className="time-difference">
		 {timeString}
	  </div>
	);
 }

export default TimeDifference