import './TimeDifference.scss';
import React, { useState, useEffect } from 'react';

function TimeDifference({ inputTimeToTimer, sendLocalTime, setGlobalTime }) {
	const [fixedDifference, setFixedDifference] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (inputTimeToTimer && sendLocalTime) {
			try {
				const parseTimeString = (str) => {
					const [hours, minutes, seconds] = str.split(':').map(Number);
					return { hours, minutes, seconds };
				};

				const timeToSeconds = ({ hours, minutes, seconds }) =>
					hours * 3600 + minutes * 60 + seconds;

				const time1 = timeToSeconds(parseTimeString(sendLocalTime));
				const time2 = timeToSeconds(inputTimeToTimer);

				let diffSeconds = time2 - time1;
/* 
				let timerId; */

				if (diffSeconds < 0) {
					setError('The entered value must be greater than the local time');
					/* 
										if (timerId) clearTimeout(timerId);
					
										timerId = setTimeout(() => {
											setError('');
										
										
										}, 15000); */
					
					return;
					
				} 
				
				
				const formatTime = (seconds) => {
					const hrs = Math.floor(seconds / 3600);
					const mins = Math.floor((seconds % 3600) / 60);
					const secs = seconds % 60;
					return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
				};

				const formatted = formatTime(diffSeconds);
				setFixedDifference(formatted);
				setGlobalTime(formatted);
				setError(null);
			} catch (e) {
				setError('Unexpected error occurred');
			}
		}

	}, [inputTimeToTimer, sendLocalTime, setGlobalTime]);

	return (
		<>
			{error && <div className="error">{error}</div>}
			{!fixedDifference && !error && <div>Waiting for data...</div>}
		</>
	);
}

export default TimeDifference;