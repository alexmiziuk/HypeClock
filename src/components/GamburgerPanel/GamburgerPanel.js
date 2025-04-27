import React, { useEffect } from 'react';
import './GamburgerPanel.scss';

const GamburgerPanel = ({ children, isVisible, setIsPanelVisible, isActiveGamburger, isBgControls }) => {
	useEffect(() => {
		if (isBgControls) {
		  setIsPanelVisible(false);
		} else {
		  setIsPanelVisible(true);
		}
	 }, [isBgControls, setIsPanelVisible]);
  
	 // правильное вычисление className на каждую перерисовку
	 const className = `gamburger-panel ${!isBgControls && (isVisible || isActiveGamburger)
		? 'visible'
		: ''}`;
  
	return (
	  <div className={className}>
		 {children}
	  </div>
	);
 };
 

export default GamburgerPanel;
