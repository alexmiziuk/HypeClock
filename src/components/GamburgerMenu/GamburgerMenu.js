import './GamburgerMenu.scss';
import UserLocalTime from '../UserLocalTime/UserLocalTime';
import UserTimeInput from '../UserTimeInput/UserTimeInput';
import React from 'react';
import { useState, useRef } from 'react';
import TimeDifference from '../TimeDifference/TimeDifference';

function GamburgerMenu({ setGlobalTime, isActiveGamburger }) {
	const [inputTimeToTimer, setInputTimeToTimer] = useState(null), [showTimeDifference, setShowTimeDifference] = useState(false)
	const [currentTime, setCurrentTime] = useState('');
	const timeInputRef = useRef();
	const handleSend = () => {
		if (timeInputRef.current) {
			const currentTime = timeInputRef.current.getTime();
			setInputTimeToTimer(currentTime);
			setShowTimeDifference(true);
		}
	};
	return (
		<div className={`gamburger-menu ${isActiveGamburger ? 'gamburger-menu_active' : ''}`}>
			<UserLocalTime onTimeUpdate={setCurrentTime} />
			<UserTimeInput ref={timeInputRef} />
			<button className ="send-custom-time" onClick={handleSend}>
				Send time to timer
			</button>
			{showTimeDifference && inputTimeToTimer && (
				<TimeDifference inputTimeToTimer={inputTimeToTimer} sendLocalTime={currentTime} setGlobalTime={setGlobalTime} />
			)}
		</div>
	)
}

export default GamburgerMenu