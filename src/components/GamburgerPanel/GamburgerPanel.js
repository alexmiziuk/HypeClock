import React from 'react';
import './GamburgerPanel.scss';

const GamburgerPanel = ({ children, isVisible, isActiveGamburger }) => {
	return (
	  <div className={`gamburger-panel ${isVisible || isActiveGamburger ? 'visible' : ''}`}>
		 {children}
	  </div>
	);
 };
 

export default GamburgerPanel;
