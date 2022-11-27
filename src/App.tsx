import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Cart } from './components/Cart';
import { Login } from './components/Login';
import { Main } from './components/Main';
import { Purchase } from './components/Purchase';
import { UserProfile } from './components/UserProfile';
import { ContextProvider } from './utils/ContextProvider';
import { ProtectedRoute } from './utils/ProtectedRoute';
// where does className='App' go when you put in the React Router

function App() {
	return (
		// <div className='App'>
		// 	<Main />
		// </div>

		<ContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route
						path='/user-profile'
						element={
							<ProtectedRoute>
								<UserProfile />
							</ProtectedRoute>
						}
					></Route>
					<Route path='login' element={<Login />} />
					<Route path='cart' element={<Cart />} />
					<Route path='purchase' element={<Purchase />} />
				</Routes>
			</BrowserRouter>
		</ContextProvider>
	);
}

export default App;
