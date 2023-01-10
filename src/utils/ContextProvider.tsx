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
	cart: DocumentData[];
	setCart: React.Dispatch<React.SetStateAction<DocumentData[]>>;
	toBuy: never[];
	setToBuy: React.Dispatch<React.SetStateAction<never[]>>;
	allProducts: DocumentData[];
	setAllProducts: React.Dispatch<React.SetStateAction<DocumentData[]>>;
	productsCollectionRef: CollectionReference<DocumentData>;
	cartsCollectionRef: CollectionReference<DocumentData>;
	currentProduct: DocumentData[];
	setCurrentProduct: React.Dispatch<React.SetStateAction<DocumentData[]>>;
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
	const [cart, setCart] = useState<DocumentData[]>([]); //<DocumentData[]>([])
	// Suggestion
	// Only one cart is in play so the type should be
	// DocumentData
	// also note that cart is singular!
	// prefer undefined
	// const [cartId, setCartId] = useState<DocumentData[] | null>(null);
	const [toBuy, setToBuy] = useState([]);
	const [allProducts, setAllProducts] = useState<DocumentData[]>([]);
	const [currentProduct, setCurrentProduct] = useState<DocumentData[]>([]);
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

	const snapshotCart = async (): Promise<DocumentData[]> => {
		// queries current user cart and puts it into state
		const userCartQuery = query(
			cartsCollectionRef,
			where('owner', '==', user!.email)
		);
		const userCartSnapshot = await getDocs(userCartQuery);
		const userCart: DocumentData[] = userCartSnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id
		}));
		setCart(userCart);
		return userCart;
	};
	// const [cart, setCart] = useState();

	const addItemToCart = async (prod: DocumentData) => {
		const userCart = await snapshotCart();
		// makes new array and initialises it with the current user cart
		let newUserCart = [...userCart];
		// pushes selected product into the array
		newUserCart[0].cart.push(prod);
		// sets state with the updated array
		setCart(newUserCart);
		// updates the firestore user cart with the new updated state
		await updateDoc(doc(cartsCollectionRef, userCart[0].id), {
			cart: arrayUnion(...userCart[0].cart)
		});
		console.log(`added item to cart ${userCart[0].id}`);
	};

	const removeItemFromCart = async (prod: DocumentData) => {
		snapshotCart();

		let newProductArr = [...cart];
		console.log(newProductArr[0].cart);
		const index = newProductArr[0].cart
			.map((product: any) => product.id)
			.indexOf(prod.id);
		if (index > -1) {
			newProductArr[0].cart.splice(index, 1);
		}
		setCart(newProductArr);
		await updateDoc(doc(cartsCollectionRef, cart[0].id), {
			cart: [...cart[0].cart]
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
	const context = useContext(SiteContext);

	if (!context) {
		throw new Error('Must be under <ContextProvider />. Did you forget?');
	}

	return context;
};
