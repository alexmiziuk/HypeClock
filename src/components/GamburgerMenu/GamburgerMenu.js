import './GamburgerMenu.scss';
import UserLocalTime from '../UserLocalTime/UserLocalTime';
import UserTimeInput from '../UserTimeInput/UserTimeInput';
import React from 'react';
import { useState, useRef } from 'react';
import TimeDifference from '../TimeDifference/TimeDifference';

function GamburgerMenu() {
	const [timeData, setTimeData] = useState(null);
	const [showTimeDifference, setShowTimeDifference] = useState(false)
	const timeInputRef = useRef();
	const handleSend = () => {
		if(timeInputRef.current) {
		  const currentTime = timeInputRef.current.getTime();
		  setTimeData(currentTime);
		  setShowTimeDifference(true);
		}
	 };
	return (
		<div className="gamburger-menu">
			<UserLocalTime />
			<UserTimeInput ref={timeInputRef}/>
			<button onClick={handleSend}>

				Send Time
			</button>
			{showTimeDifference && timeData && (
				<TimeDifference time={timeData} />
			)}
		</div>
	)
}

export default GamburgerMenu