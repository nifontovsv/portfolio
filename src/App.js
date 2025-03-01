import { Route, Routes } from 'react-router';
import './App.css';
import Main from './component/Main/Main';
import Projects from './component/Projects/Projects';
import About from './component/About/About';
import Contacts from './component/Contacts/Contacts';
import Navbar from './component/Navbar/Navbar';
import mainImage from '../src/images/mainImage.png';
import Footer from './component/Footer/Footer';
import NeuralNoise from './component/NeuralNoise/NeuralNoise';

function App() {
	return (
		<div className='app'>
			<NeuralNoise />
			<Navbar />
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/about' element={<About />} />
				<Route path='/projects' element={<Projects />} />
				<Route path='/contacts' element={<Contacts />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
