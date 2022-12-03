import React, { createContext, useContext, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	UserCredential,
	signInWithEmailAndPassword,
	getAuth,
	signOut,
	// onAuthStateChanged,
	Auth
} from 'firebase/auth';
import {
	collection,
	CollectionReference,
	DocumentData,
	getDocs
} from 'firebase/firestore';
import { db } from './firebaseConfig';

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
	allProducts: DocumentData | null;
	setAllProducts: React.Dispatch<React.SetStateAction<DocumentData[] | null>>;
	productsCollectionRef: CollectionReference<DocumentData>;
	currentProduct: DocumentData | null;
	setCurrentProduct: React.Dispatch<
		React.SetStateAction<DocumentData[] | null>
	>;
	login: (
		loginEmail: string,
		loginPassword: string
	) => Promise<UserCredential | undefined>;
	register: (
		registerEmail: string,
		registerPassword: string
	) => Promise<UserCredential | undefined>;
	logout: () => Promise<void>;
	addItemToCart: () => void;
	purchaseItems: () => void;
	purchaseCart: () => void;
	emptyCart: () => void;
	fetchProducts: () => Promise<void>;
	fireAuth: Auth;
};

// define types of all value variables

export const SiteContext = createContext<ValueTypes | null>(null);

export interface CurrentProduct {
	name: string;
	producer: string;
	price: number;
	processor: string;
	memory: number;
	storage: string;
	storageNum: number;
	os: string;
	weight: number;
	screenSize: string;
	screenSizeNum: number;
	// id: string[];
}

export const ContextProvider = ({ children }: UserContextProviderProps) => {
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const [user, setUser] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [cart, setCart] = useState([]);
	const [toBuy, setToBuy] = useState([]);
	const [allProducts, setAllProducts] = useState<DocumentData[] | null>(null);
	const [currentProduct, setCurrentProduct] = useState<DocumentData[] | null>(
		null
	);
	const fireAuth = getAuth();
	const productsCollectionRef = collection(db, 'products');

	/////////// ADD USE EFFECT

	const fetchProducts = async () => {
		const data = await getDocs(productsCollectionRef);
		setAllProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	};
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

	const emptyCart = () => {};

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
				allProducts,
				setAllProducts,
				currentProduct,
				setCurrentProduct,
				productsCollectionRef,
				login,
				register,
				logout,
				addItemToCart,
				purchaseItems,
				purchaseCart,
				emptyCart,
				fetchProducts,
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
