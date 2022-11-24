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

type ValueTypes = {
	registerEmail: string;
	setRegisterEmail: React.Dispatch<React.SetStateAction<string>>;
	registerPassword: string;
	setRegisterPassword: React.Dispatch<React.SetStateAction<string>>;
	loginEmail: string;
	setLoginEmail: React.Dispatch<React.SetStateAction<string>>;
	loginPassword: string;
	setLoginPassword: React.Dispatch<React.SetStateAction<string>>;
	user: {};
	setUser: React.Dispatch<React.SetStateAction<{}>>;
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	cart: never[];
	setCart: React.Dispatch<React.SetStateAction<never[]>>;
	toBuy: never[];
	setToBuy: React.Dispatch<React.SetStateAction<never[]>>;
	// login: (
	// 	loginEmail: string,
	// 	loginPassword: string
	// ) => Promise<UserCredential | undefined>;
	// register: (
	// 	registerEmail: string,
	// 	registerPassword: string
	// ) => Promise<UserCredential | undefined>;
	logout: () => Promise<void>;
	addItemToCart: () => void;
	purchaseItems: () => void;
	purchaseCart: () => void;
	fireAuth: Auth;
};

/*
For login and register:

Ok I guess I figured it out. I had to import it and use it like this, import { auth } from 'firebase';
const myCallback = (result: auth.UserCredential) => { //function contents }
you could also import just firebase and consume firebase.auth.UserCredential
*/

// define types of all value variables

export const SiteContext = createContext<ValueTypes | null>(null);

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
				// login,
				// register,
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
