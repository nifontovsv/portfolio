import './App.css';
import Container from './component/Container/Container';
import Main from './component/Main/Main';
import Projects from './component/Projects/Projects';
import SnakeGame from './component/Projects/SnakeGame/SnakeGame';

function App() {
	return (
		<div className='app'>
			{/* <Container> */}
			{/* <Main /> */}
			<SnakeGame />
			{/* <Projects /> */}
			{/* </Container> */}
		</div>
	);
}

export default App;
