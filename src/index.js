import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import './index.css';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import Economía from './Pages/economia';
import App from './App';
import Opinión from './Pages/opinion';
import Nosotros from './Pages/nosotros';


function Main() {
	return (
		<BrowserRouter>
			<Routes>
        <Route path="/" element={<App />} />
				<Route path="/economía" element={<Economía />} />
				<Route path="/opinión" element={<Opinión />} />
				<Route path="/Nosotros" element={<Nosotros />} />
			</Routes>
		</BrowserRouter>
	);
}

const root = createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Main />
	</React.StrictMode>
);

reportWebVitals();
