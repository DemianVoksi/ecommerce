import React, { createContext, useContext, useEffect, useState } from 'react';
import {
	getAuth,
	signOut,
	Auth,
	onAuthStateChanged,
	User
} from 'firebase/auth';
import {
	collection,
	CollectionReference,
	doc,
	DocumentData,
	getDocs,
	query,
	where,
	setDoc,
	updateDoc,
	arrayUnion
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
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	cart: DocumentData[] | null;
	setCart: React.Dispatch<React.SetStateAction<DocumentData[] | null>>;
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
	addItemToCart: (prod: DocumentData) => Promise<void>;
	purchaseItems: () => void;
	purchaseCart: () => void;
	removeItemFromCart: (prod: DocumentData) => Promise<void>;
	fetchProducts: () => Promise<void>;
	fireAuth: Auth;
};

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
	// add inventory number to items
}

// define types of all value variables

export const SiteContext = createContext<ValueTypes | null>(null);

export const ContextProvider = ({ children }: UserContextProviderProps) => {
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const [user, setUser] = useState<User | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	/* 
	isLoggedIn gets messed up when a logged in user refreshes the page. 
	It logs the user out, but leaves the isLoggedIn as true, and the login page
	can't be accessed.
	Session storage?
	https://stackoverflow.com/questions/39097440/on-react-router-how-to-stay-logged-in-state-even-page-refresh
	*/
	const [cart, setCart] = useState<DocumentData[] | null>(null); //<DocumentData[]>([])
	// const [cartId, setCartId] = useState<DocumentData[] | null>(null);
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
		const newCart = await setDoc(doc(cartsCollectionRef), {
			owner: userID,
			cart: []
		});
		return newCart;
	};

	const snapshotCart = async () => {
		// queries current user cart and puts it into state
		const userCart = query(
			cartsCollectionRef,
			where('owner', '==', user!.email)
		);
		const userCartSnapshot = await getDocs(userCart);
		setCart(
			userCartSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
		);
	};

	const addItemToCart = async (prod: DocumentData) => {
		snapshotCart();
		// makes new array and initialises it with the current user cart
		let newArr = [...cart!];
		// pushes selected product into the array
		newArr[0].cart.push(prod);
		// sets state with the updated array
		setCart(newArr);
		// updates the firestore user cart with the new updated state
		await updateDoc(doc(cartsCollectionRef, cart![0].id), {
			cart: arrayUnion(...cart![0].cart)
		});
	};

	const removeItemFromCart = async (prod: DocumentData) => {
		snapshotCart();

		let newProductArr = [...cart!];
		console.log(newProductArr[0].cart);
		const index = newProductArr[0].cart
			.map((product: any) => product.id)
			.indexOf(prod.id);
		if (index > -1) {
			newProductArr[0].cart.splice(index, 1);
		}
		setCart(newProductArr);
		await updateDoc(doc(cartsCollectionRef, cart![0].id), {
			cart: [...cart![0].cart]
		});
	};

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
