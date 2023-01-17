import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Cart } from './components/Cart';
import { Login } from './components/Login';
import { Main } from './components/Main';
import { Product } from './components/Product';
import { Purchase } from './components/Purchase';
import { UserProfile } from './components/UserProfile';
import { ContextProvider } from './utils/ContextProvider';
import { ProtectedLogin } from './utils/ProtectedLogin';
import { ProtectedRoute } from './utils/ProtectedRoute';

function App() {
	return (
		<div className="App">
			<ContextProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Main />} />
						<Route
							path="/user-profile"
							element={
								<ProtectedRoute>
									<UserProfile />
								</ProtectedRoute>
							}
						/>

						<Route
							path="/login"
							element={
								<ProtectedLogin>
									<Login />
								</ProtectedLogin>
							}
						/>
						<Route path="/cart" element={<Cart />} />
						<Route path="/purchase" element={<Purchase />} />
						<Route
							path="/product"
							element={
								<Product
								// spoof values
								// name="name"
								// producer="producer"
								// price={10}
								// processor="processor"
								// memory={10}
								// storage="storage"
								// storageNum={10}
								// os="os"
								// weight={10}
								// screenSize="screenSize"
								// screenSizeNum={10}
								// id="id"
								/>
							}
						/>
					</Routes>
				</BrowserRouter>
			</ContextProvider>
		</div>
	);
}

export default App;
