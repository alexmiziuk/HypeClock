import Container from './components/Container/Container';
import CountdownTimer from './components/CountdownTimer/CountdownTimer';
import GamburgerMenu from './components/GamburgerMenu/GamburgerMenu';
import Gamburger from './components/Gamburger/Gamburger';
import BackgroundManager from './components/BackgroundManager/BackgroundManager';
import { useState } from 'react';
import GamburgerPanel from './components/GamburgerPanel/GamburgerPanel';

import './App.scss';


function App() {
	const [isBgControls, setBgControls] = useState(false);
	const [isPanelVisible, setIsPanelVisible] = useState(false);
	const [isActiveGamburger, setIsActiveGamburger] = useState(false);
	const [fixedTime, setFixedTime] = useState(null);

	useState(() => {
		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				setIsActiveGamburger(false);
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}
	, []);
	return (
		<div className="App">
			<BackgroundManager>
				<GamburgerMenu isActiveGamburger={isActiveGamburger} setGlobalTime={setFixedTime} setBgControls={setBgControls} />
				<div className="background-panel-hover"
					onMouseEnter={() => setIsPanelVisible(true)}
					onMouseLeave={() => setIsPanelVisible(false)}>
					<GamburgerPanel isVisible={isPanelVisible} setIsPanelVisible={setIsPanelVisible} isActiveGamburger={isActiveGamburger} isBgControls={isBgControls}>
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
