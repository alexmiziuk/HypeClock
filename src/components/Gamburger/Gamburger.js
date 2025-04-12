import './Gamburger.scss';
import React from 'react';

const Gamburger = ({setIsActiveGamburger, isActiveGamburger}) => {
	

	return (
		<div className={`gamburger ${isActiveGamburger ? 'gamburger--active' : ''}`} onClick={() => setIsActiveGamburger(prev => !prev)}>
			<div className="gamburger__line"></div>
			<div className="gamburger__line"></div>
			<div className="gamburger__line"></div>
		</div>
	);
};

export default Gamburger;