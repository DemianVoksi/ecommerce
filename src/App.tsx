import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { CartPage } from './components/cart/CartPage';
import { LoginPage } from './components/loginAndRegister/LoginPage';
import { RegisterPage } from './components/loginAndRegister/RegisterPage';
import { MainPage } from './components/main/MainPage';
import { ProductPage } from './components/product/ProductPage';
import { PurchasePage } from './components/purchase/PurchasePage';
import { UserProfilePage } from './components/userProfile/UserProfilePage';
import { ContextProvider } from './utils/ContextProvider';
import { ProtectedLogin } from './utils/ProtectedLogin';
import { ProtectedRoute } from './utils/ProtectedRoute';

function App() {
	return (
		<div className="App">
			<ContextProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<MainPage />} />
						<Route
							path="/user-profile"
							element={
								<ProtectedRoute>
									<UserProfilePage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/login"
							element={
								<ProtectedLogin>
									<LoginPage />
								</ProtectedLogin>
							}
						/>
						<Route
							path="/register"
							element={
								<ProtectedLogin>
									<RegisterPage />
								</ProtectedLogin>
							}
						/>
						<Route path="/cart" element={<CartPage />} />
						<Route path="/purchase" element={<PurchasePage />} />
						<Route path="/product/:id" element={<ProductPage />} />
					</Routes>
				</BrowserRouter>
			</ContextProvider>
		</div>
	);
}

export default App;
