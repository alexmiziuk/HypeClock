import './TimeDifference.scss';
import React, { useState, useEffect } from 'react';

function TimeDifference({ inputTimeToTimer, sendLocalTime, setGlobalTime }) {
	const [fixedDifference, setFixedDifference] = useState(null);

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
				
				let diffSeconds = 0
				
				if (time1 < time2) {
					diffSeconds = time2 - time1;
				} else {
					console.log('Вводимая величина должна быть больше локального времени');
				}
				
				/* const diffSeconds = Math.abs(time1 - time2); */

				const formatTime = (seconds) => {
					const hrs = Math.floor(seconds / 3600);
					const mins = Math.floor((seconds % 3600) / 60);
					const secs = seconds % 60;
					return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
				};

				setFixedDifference(formatTime(diffSeconds));


				setGlobalTime(formatTime(diffSeconds));
			} catch (e) {
				setFixedDifference('Ошибка');
			}
		}
	}, [inputTimeToTimer, setGlobalTime]);
	

	return (
		<>
		{!fixedDifference? <div>Ожидание данных...</div> : ''}
		</>
	);
}

export default TimeDifference;