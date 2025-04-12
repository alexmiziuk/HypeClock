import './GamburgerMenu.scss';
import UserLocalTime from '../UserLocalTime/UserLocalTime';
import UserTimeInput from '../UserTimeInput/UserTimeInput';
import React from 'react';
import { useState, useRef } from 'react';
import TimeDifference from '../TimeDifference/TimeDifference';

function GamburgerMenu() {
	const [inputTimeToTimer, setInputTimeToTimer]  = useState(null), [showTimeDifference, setShowTimeDifference] = useState(false)
	const [currentTime, setCurrentTime] = useState('');
	const timeInputRef = useRef();
	const handleSend = () => {
		if(timeInputRef.current) {
		  const currentTime = timeInputRef.current.getTime();
		  setInputTimeToTimer(currentTime);
		  setShowTimeDifference(true);
		}
	 };
	return (
		<div className="gamburger-menu">
			<UserLocalTime onTimeUpdate={setCurrentTime}/>
			<UserTimeInput ref={timeInputRef}/>
			<button onClick={handleSend}>

				Send Time
			</button>
			{showTimeDifference && inputTimeToTimer && (
				<TimeDifference inputTimeToTimer={inputTimeToTimer} sendLocalTime={currentTime} />
			)}
		</div>
	)
}

export default GamburgerMenu