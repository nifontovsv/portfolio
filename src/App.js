import { Route, Routes } from 'react-router';
import './App.css';
import Container from './component/Container/Container';
import Projects from './component/Projects/Projects';
import Navbar from './component/Navbar/Navbar';
import Contacts from './component/Contacts/Contacts';
import About from './component/About/About';

function App() {
	return (
		<div className='App'>
			<Container>
				<Navbar />
				<Routes>
					<Route path='/about' element={<About />} />
					<Route path='/projects' element={<Projects />} />
					<Route path='/contacts' element={<Contacts />} />
				</Routes>
			</Container>
		</div>
	);
}

export default App;
