import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Cart } from './components/Cart';
import { Login } from './components/Login';
import { Main } from './components/Main';
import { Purchase } from './components/Purchase';
import { UserProfile } from './components/UserProfile';
// where does className='App' go when you put in the React Router

function App() {
	return (
		// <div className='App'>
		// 	<Main />
		// </div>

		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='user-profile' element={<UserProfile />} />
				<Route path='login' element={<Login />} />
				<Route path='cart' element={<Cart />} />
				<Route path='purchase' element={<Purchase />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
