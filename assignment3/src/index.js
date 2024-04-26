import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Browse from './browse';
import 'bootstrap/dist/css/bootstrap.css';
import AddItem from './additem';
import Confirmation from './confirmation';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<BrowserRouter>
		<Routes>
			<Route
				index
				element={<Browse />}
			/>
			<Route
				path="additem"
				element={<AddItem />}
			/>
			<Route
				path="/confirmation"
				element={<Confirmation />}
			/>
			<Route
				path="/"
				element={<Browse />}
			/>
		</Routes>
	</BrowserRouter>
);
