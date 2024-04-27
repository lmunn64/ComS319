import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Browse from './browse';
import 'bootstrap/dist/css/bootstrap.css';
import AddItem from './additem';
import UpdateItem from './updateitem';
import Delete from './delete.js';
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
				path="/updateitem"
				element={<UpdateItem />}
			/>
			<Route
				path="/"
				element={<Browse />}
			/>
			<Route
				path="/delete"
				element={<Delete />}
			/>
			<Route
				path="/about"
				element={<StudentInfo />}
			/>
		</Routes>
	</BrowserRouter>
);
