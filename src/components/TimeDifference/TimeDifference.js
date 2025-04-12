import './TimeDifference.scss';
import React, { useState, useEffect } from 'react';

function TimeDifference({ inputTimeToTimer, sendLocalTime }) {
	const [fixedDifference, setFixedDifference] = useState(null);

	useEffect(() => {
		// Вычисляем разницу при каждом изменении sendLocalTime
		if (inputTimeToTimer && sendLocalTime) {
			try {
				const parseTimeString = (str) => {
					const [hours, minutes, seconds] = str.split(':').map(Number);
					return { hours, minutes, seconds };
				};

				const timeToSeconds = ({ hours, minutes, seconds }) =>
					hours * 3600 + minutes * 60 + seconds;

				// Используем актуальное значение time на момент нажатия
				const time1 = timeToSeconds(parseTimeString(sendLocalTime));
				const time2 = timeToSeconds(inputTimeToTimer);

				const diffSeconds = Math.abs(time1 - time2);

				const formatTime = (seconds) => {
					const hrs = Math.floor(seconds / 3600);
					const mins = Math.floor((seconds % 3600) / 60);
					const secs = seconds % 60;
					return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
				};

				setFixedDifference(formatTime(diffSeconds));
			} catch (e) {
				setFixedDifference('Ошибка');
			}
		}
	}, [inputTimeToTimer]); // Срабатываем только при изменении inputTimeToTimer

	if (!fixedDifference) return <div>Ожидание данных...</div>;

	return (
		<div className="time-difference">
			Фиксированная разница: {fixedDifference}
		</div>
	);
}

export default TimeDifference;