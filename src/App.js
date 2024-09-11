import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import AnimeDetails from './pages/AnimeDetails';

function App() {
	return (
		<div>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/search' element={<Search />} />
					<Route path='/watch/:anilistId' element={<AnimeDetails />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;