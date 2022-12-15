import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, signOut, Auth, onAuthStateChanged } from 'firebase/auth';
import {
	collection,
	CollectionReference,
	doc,
	DocumentData,
	getDocs,
	setDoc
} from 'firebase/firestore';
import { db } from './firebaseConfig';
// import { FirebaseError } from 'firebase/app';

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
	cartsCollectionRef: CollectionReference<DocumentData>;
	currentProduct: DocumentData | null;
	setCurrentProduct: React.Dispatch<
		React.SetStateAction<DocumentData[] | null>
	>;
	logout: () => Promise<void>;
	createNewCart: (userID: string) => void;
	addItemToCart: () => void;
	purchaseItems: () => void;
	purchaseCart: () => void;
	removeItemFromCart: () => void;
	fetchProducts: () => Promise<void>;
	fireAuth: Auth;
};

// export interface CurrentProduct {
// 	name: string;
// 	producer: string;
// 	price: number;
// 	processor: string;
// 	memory: number;
// 	storage: string;
// 	storageNum: number;
// 	os: string;
// 	weight: number;
// 	screenSize: string;
// 	screenSizeNum: number;
// 	id: string[];
// }

// define types of all value variables

export const SiteContext = createContext<ValueTypes | null>(null);

export const ContextProvider = ({ children }: UserContextProviderProps) => {
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const [user, setUser] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	/* 
	isLoggedIn gets messed up when a logged in user refreshes the page. 
	It logs the user out, but leaves the isLoggedIn as true, and the login page
	can't be accessed.
	Session storage?
	https://stackoverflow.com/questions/39097440/on-react-router-how-to-stay-logged-in-state-even-page-refresh
	*/
	const [cart, setCart] = useState([]);
	const [toBuy, setToBuy] = useState([]);
	const [allProducts, setAllProducts] = useState<DocumentData[] | null>(null);
	const [currentProduct, setCurrentProduct] = useState<DocumentData[] | null>(
		null
	);
	const fireAuth = getAuth();
	const productsCollectionRef = collection(db, 'products');
	const cartsCollectionRef = collection(db, 'carts');

	useEffect(() => {
		onAuthStateChanged(fireAuth, (user) => {
			setUser(user!);
		});
	}, []);

	const fetchProducts = async () => {
		const data = await getDocs(productsCollectionRef);
		setAllProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	};

	const logout = async () => {
		try {
			await signOut(fireAuth);
			setIsLoggedIn(false);
		} catch (error) {
			alert(error);
		}
	};

	const createNewCart = async (userID: string) => {
		await setDoc(doc(cartsCollectionRef), {
			owner: userID,
			cart: []
		});
	};

	const addItemToCart = () => {};

	const purchaseItems = () => {};

	const purchaseCart = () => {};

	const removeItemFromCart = () => {};

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
				cartsCollectionRef,
				logout,
				createNewCart,
				addItemToCart,
				purchaseItems,
				purchaseCart,
				removeItemFromCart,
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
