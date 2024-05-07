import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Browse from './browse';
import 'bootstrap/dist/css/bootstrap.css';
import AddItem from './additem';
import UpdateSong from './updatesong';
import studentinfo from './studentinfo.js';
import StudentInfo from './studentinfo.js';

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
				path="/updatesong"
				element={<UpdateSong />}
			/>
			<Route
				path="/"
				element={<Browse />}
			/>
			<Route
				path="/about"
				element={<StudentInfo />}
			/>
		</Routes>
	</BrowserRouter>
);
