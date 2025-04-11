import Container from './components/Container/Container';
import CountdownTimer from './components/CountdownTimer/CountdownTimer';
import GamburgerMenu from './components/GamburgerMenu/GamburgerMenu';
import './App.scss';


function App() {
	return (
		<div className="App">
			<GamburgerMenu />
			<Container>
				
				<CountdownTimer />
			</Container>
		</div>
	);
}

export default App;
