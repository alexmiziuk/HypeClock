import './GamburgerMenu.scss';
import UserLocalTime from '../UserLocalTime/UserLocalTime';
import UserTimeInput from '../UserTimeInput/UserTimeInput';	
import React from 'react'

function GamburgerMenu() {
  return (
	  <div className="gamburger-menu">
		  <UserLocalTime />
		  <UserTimeInput />
		  
	 </div>
  )
}

export default GamburgerMenu