import Container from './components/Container/Container';
import CountdownTimer from './components/CountdownTimer/CountdownTimer';
import './App.scss';

function App() {
	return (
		<div className="App">
			<Container>
				<CountdownTimer />
			</Container>
		</div>
	);
}

export default App;
