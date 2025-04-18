import Container from './components/Container/Container';
import CountdownTimer from './components/CountdownTimer/CountdownTimer';
import GamburgerMenu from './components/GamburgerMenu/GamburgerMenu';
import Gamburger from './components/Gamburger/Gamburger';
import BackgroundManager from './components/BackgroundManager/BackgroundManager';
import { useState } from 'react';
import './App.scss';


function App() {
	const [isActiveGamburger, setIsActiveGamburger] = useState(false);
	const [fixedTime, setFixedTime] = useState(null);
	return (
		<div className="App">
			<BackgroundManager>
			<GamburgerMenu isActiveGamburger={isActiveGamburger} setGlobalTime={setFixedTime} />
			<Gamburger setIsActiveGamburger={setIsActiveGamburger} isActiveGamburger = {isActiveGamburger} />
			<Container>
				
				<CountdownTimer fixedTime={fixedTime}/>
			</Container>
			</BackgroundManager>
		</div>
	);
}

export default App;
