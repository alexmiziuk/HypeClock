import Container from './components/Container/Container';
import CountdownTimer from './components/CountdownTimer/CountdownTimer';
import GamburgerMenu from './components/GamburgerMenu/GamburgerMenu';
import Gamburger from './components/Gamburger/Gamburger';
import BackgroundManager from './components/BackgroundManager/BackgroundManager';
import { useState } from 'react';
import GamburgerPanel from './components/GamburgerPanel/GamburgerPanel';

import './App.scss';


function App() {
	const [isPanelVisible, setIsPanelVisible] = useState(false);
	const [isActiveGamburger, setIsActiveGamburger] = useState(false);
	const [fixedTime, setFixedTime] = useState(null);
	return (
		<div className="App">
			<BackgroundManager>
				<GamburgerMenu isActiveGamburger={isActiveGamburger} setGlobalTime={setFixedTime} />
				<div className="background-panel-hover"
					onMouseEnter={() => setIsPanelVisible(true)}
					onMouseLeave={() => setIsPanelVisible(false)}>
					<GamburgerPanel isVisible={isPanelVisible} isActiveGamburger={isActiveGamburger}>
						<Gamburger setIsActiveGamburger={setIsActiveGamburger} isActiveGamburger={isActiveGamburger} />
					</GamburgerPanel>
				</div>
				<Container>
					<CountdownTimer fixedTime={fixedTime} />
				</Container>
			</BackgroundManager>
		</div>
	);
}

export default App;
