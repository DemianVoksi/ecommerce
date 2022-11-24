import React, { createContext, useContext, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	getAuth,
	signOut,
	onAuthStateChanged,
	Auth
} from 'firebase/auth';

type UserContextProviderProps = {
	children: React.ReactNode;
};

// define types of all value variables

export const SiteContext = createContext({});

export const ContextProvider = ({ children }: UserContextProviderProps) => {
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const [user, setUser] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [cart, setCart] = useState([]);
	const [toBuy, setToBuy] = useState([]);
	const fireAuth = getAuth();

	/////////// ADD USE EFFECT

	// buttons

	const register = async (registerEmail: string, registerPassword: string) => {
		try {
			const newUser = await createUserWithEmailAndPassword(
				fireAuth,
				registerEmail,
				registerPassword
			);
			console.log(newUser.user.email);
			return newUser;
		} catch (error) {
			console.log(error);
		}
	};

	const login = async (loginEmail: string, loginPassword: string) => {
		try {
			const user = await signInWithEmailAndPassword(
				fireAuth,
				loginEmail,
				loginPassword
			);
			console.log(user.user.email);
			return user;
		} catch (error) {
			console.log(error);
		}
	};

	const logout = async () => {
		try {
			await signOut(fireAuth);
		} catch (error) {
			console.log(error);
		}
	};

	const addItemToCart = () => {};

	const purchaseItems = () => {};

	const purchaseCart = () => {};

	return (
		<SiteContext.Provider
			value={{
				registerEmail,
				setRegisterEmail,
				registerPassword,
				setRegisterPassword,
				loginEmail,
				setLoginEmail,
				loginPassword,
				setLoginPassword,
				user,
				setUser,
				isLoggedIn,
				setIsLoggedIn,
				cart,
				setCart,
				toBuy,
				setToBuy,
				login,
				register,
				logout,
				addItemToCart,
				purchaseItems,
				purchaseCart,
				fireAuth
			}}
		>
			{children}
		</SiteContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(SiteContext);
};
