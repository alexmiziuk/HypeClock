import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import './UserTimeInput.scss';

const UserTimeInput = forwardRef((_props, ref) => {
	const [time, setTime] = useState({
		hours: 0,
		minutes: 0,
		seconds: 0
	});

	const hoursRef = useRef(null);
	const minutesRef = useRef(null);
	const secondsRef = useRef(null);
	const intervalRef = useRef(null);
	const delayTimerRef = useRef(null);

	useImperativeHandle(ref, () => ({
		getTime: () => time
	}));

	useEffect(() => {
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
			if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
		};
	}, []);
	const handleChange = (e, type) => {
		const value = Math.max(0, parseInt(e.target.value) || 0);
		const maxValues = { hours: 23, minutes: 59, seconds: 59 };

		setTime(prev => ({
			...prev,
			[type]: Math.min(value, maxValues[type])
		}));

		if (e.target.value.length >= 2) {
			focusNextField(type);
		}
	};

	const focusNextField = (currentField) => {
		const fieldsOrder = ['hours', 'minutes', 'seconds'];
		const currentIndex = fieldsOrder.indexOf(currentField);

		if (currentIndex < fieldsOrder.length - 1) {
			const nextField = fieldsOrder[currentIndex + 1];
			const refs = { hours: hoursRef, minutes: minutesRef, seconds: secondsRef };
			refs[nextField].current?.focus();
		}
	};

	const startContinuousChange = (type, direction) => {
		
		direction === 'up' ? increment(type) : decrement(type);

		delayTimerRef.current = setTimeout(() => {
			intervalRef.current = setInterval(() => {
				direction === 'up' ? increment(type) : decrement(type);
			}, 50);
		}, 300);
	};

	const stopContinuousChange = () => {
		if (delayTimerRef.current) {
			clearTimeout(delayTimerRef.current);
			delayTimerRef.current = null;
		}
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	const increment = (type) => {
		const maxValues = { hours: 23, minutes: 59, seconds: 59 };
		setTime(prev => {
			const newValue = prev[type] < maxValues[type] ? prev[type] + 1 : 0;
			return { ...prev, [type]: newValue };
		});
	};

	const decrement = (type) => {
		const maxValues = { hours: 23, minutes: 59, seconds: 59 };
		setTime(prev => {
			const newValue = prev[type] > 0 ? prev[type] - 1 : maxValues[type];
			return { ...prev, [type]: newValue };
		});
	};

	const formatWithLeadingZero = (value) => {
		return value.toString().padStart(2, '0');
	};

	return (
		<div className="time-input-container">

			<div className="time-input-group">
				<label className="time-input-label">h</label>
				<button
					className="time-input-button"
					onMouseDown={() => startContinuousChange('hours', 'down')}
					onMouseUp={stopContinuousChange}
					onMouseLeave={stopContinuousChange}
					onClick={(e) => e.preventDefault()}
				>
					▼
				</button>
				<input
					ref={hoursRef}
					type="text"
					value={formatWithLeadingZero(time.hours)}
					onChange={(e) => handleChange(e, 'hours')}
					maxLength={2}
				/>
				<button
					className="time-input-button"
					onMouseDown={() => startContinuousChange('hours', 'up')}
					onMouseUp={stopContinuousChange}
					onMouseLeave={stopContinuousChange}
					onClick={(e) => e.preventDefault()}
				>
					▲
				</button>
				<span>:</span>
			</div>

			<div className="time-input-group">
				<label className="time-input-label">m</label>
				<button
					className="time-input-button"
					onMouseDown={() => startContinuousChange('minutes', 'down')}
					onMouseUp={stopContinuousChange}
					onMouseLeave={stopContinuousChange}
					onClick={(e) => e.preventDefault()}
				>
					▼
				</button>
				<input
					ref={minutesRef}
					type="text"
					value={formatWithLeadingZero(time.minutes)}
					onChange={(e) => handleChange(e, 'minutes')}
					maxLength={2}
				/>
				<button
					className="time-input-button"
					onMouseDown={() => startContinuousChange('minutes', 'up')}
					onMouseUp={stopContinuousChange}
					onMouseLeave={stopContinuousChange}
					onClick={(e) => e.preventDefault()}
				>
					▲
				</button>
				<span>:</span>
			</div>

			<div className="time-input-group">
				<label className="time-input-label">s</label>
				<button
					className="time-input-button"
					onMouseDown={() => startContinuousChange('seconds', 'down')}
					onMouseUp={stopContinuousChange}
					onMouseLeave={stopContinuousChange}
					onClick={(e) => e.preventDefault()}
				>
					▼
				</button>
				<input
					ref={secondsRef}
					type="text"
					value={formatWithLeadingZero(time.seconds)}
					onChange={(e) => handleChange(e, 'seconds')}
					maxLength={2}
				/>
				<button
					className="time-input-button"
					onMouseDown={() => startContinuousChange('seconds', 'up')}
					onMouseUp={stopContinuousChange}
					onMouseLeave={stopContinuousChange}
					onClick={(e) => e.preventDefault()}
				>
					▲
				</button>
			</div>
		</div>
	);
});

export default UserTimeInput;