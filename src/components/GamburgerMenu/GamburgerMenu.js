import './GamburgerMenu.scss';
import UserLocalTime from '../UserLocalTime/UserLocalTime';
import UserTimeInput from '../UserTimeInput/UserTimeInput';
import BackgroundControls from '../BackgroundControls/BackgroundControls';
import React from 'react';
import {useState, useRef } from 'react';
import TimeDifference from '../TimeDifference/TimeDifference';


function GamburgerMenu({ setGlobalTime, isActiveGamburger, setBgControls}) {
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
		<div className={isActiveGamburger ? "gamburger-menu gamburger-menu_active" : "gamburger-menu"} onClick={(e) => e.stopPropagation()}>
			<UserLocalTime onTimeUpdate={setCurrentTime} />
			<UserTimeInput ref={timeInputRef} />
			<button className ="send-custom-time" onClick={handleSend}>
				Send time to timer
			</button>
			{showTimeDifference && inputTimeToTimer && (
				<TimeDifference inputTimeToTimer={inputTimeToTimer} sendLocalTime={currentTime} setGlobalTime={setGlobalTime} />
			)}
			<BackgroundControls setBgControls={setBgControls} />
		</div>
		
	)
}

export default GamburgerMenu