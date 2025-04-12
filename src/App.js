import Container from './components/Container/Container';
import CountdownTimer from './components/CountdownTimer/CountdownTimer';
import GamburgerMenu from './components/GamburgerMenu/GamburgerMenu';
import Gamburger from './components/Gamburger/Gamburger';
import { useState } from 'react';
import './App.scss';


function App() {
	const [isActiveGamburger, setIsActiveGamburger] = useState(false);
	const [fixedTime, setFixedTime] = useState(null);
	return (
		<div className="App">
			<GamburgerMenu isActiveGamburger={isActiveGamburger} setGlobalTime={setFixedTime} />
			<Gamburger setIsActiveGamburger={setIsActiveGamburger} isActiveGamburger = {isActiveGamburger} />
			<Container>
				
				<CountdownTimer fixedTime={fixedTime}/>
			</Container>
		</div>
	);
}

export default App;
