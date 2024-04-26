import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Browse from './browse';
import 'bootstrap/dist/css/bootstrap.css';
import AddItem from './additem';
import UpdateItem from './updateitem';

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
		</Routes>
	</BrowserRouter>
);
