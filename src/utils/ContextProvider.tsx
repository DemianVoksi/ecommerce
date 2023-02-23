import {
	Auth,
	getAuth,
	onAuthStateChanged,
	signOut,
	User
} from 'firebase/auth';
import {
	arrayUnion,
	collection,
	CollectionReference,
	doc,
	DocumentData,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where
} from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { db, storage } from './firebaseConfig';

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
	snapshotCart: () => Promise<DocumentData[]>;
	addItemToCart: (prod: DocumentData) => Promise<void>;
	purchaseItems: () => void;
	purchaseCart: () => void;
	removeItemFromCart: (prod: DocumentData) => Promise<void>;
	fetchProducts: () => Promise<void>;
	fetchCurrentUserEmail: () => Promise<string | null | undefined>;
	putPicInImg: (nameOfPic: string, imgId: string) => Promise<void>;
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
	id: string;
	picUrl: string;
}

// define types of all value variables

export const SiteContext = createContext<ValueTypes | null>(null);

export const ContextProvider = ({ children }: UserContextProviderProps) => {
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const [user, setUser] = useState<User | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [cart, setCart] = useState<DocumentData[]>([]);
	const [toBuy, setToBuy] = useState([]);
	const [allProducts, setAllProducts] = useState<DocumentData[]>([]);
	const [currentProduct, setCurrentProduct] = useState<DocumentData[]>([]);
	const [arrayofCartIds, setArrayOfCartIds] = useState<string[]>([]);
	const fireAuth = getAuth();
	const productsCollectionRef = collection(db, 'products');
	const cartsCollectionRef = collection(db, 'carts');
	const storageRef = ref(storage);
	// const firebaseUser = fireAuth.currentUser;

	useEffect(() => {
		onAuthStateChanged(fireAuth, (user) => {
			if (!!user) {
				setUser(user);
				setIsLoggedIn(true);
			}
		});
		snapshotCart();
		getArrayOfIds();
		console.log('use effect triggered');
	}, []);

	const fetchProducts = async () => {
		const data = await getDocs(productsCollectionRef);
		setAllProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	};

	const putPicInImg = async (nameOfPic: string, imgId: string) => {
		const request = await getDownloadURL(ref(storage, nameOfPic));
		const img = document.getElementById(imgId);
		img?.setAttribute('src', request);
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

	const fetchCurrentUserEmail = async () => {
		let currentUserEmail = fireAuth.currentUser?.email;
		return currentUserEmail;
	};

	const snapshotCart = async (): Promise<DocumentData[]> => {
		// queries current user cart and puts it into state
		const curUserEmail = await fetchCurrentUserEmail();
		const userCartQuery = query(
			cartsCollectionRef,
			where('owner', '==', curUserEmail)
		);
		const userCartSnapshot = await getDocs(userCartQuery);
		const userCart: DocumentData[] = userCartSnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id
		}));
		setCart(userCart);
		// console.log(cart[0].cart);
		return userCart;
	};

	const getArrayOfIds = async () => {
		let idArray: string[] = [];
		let snappedCart = await snapshotCart();
		for (let i = 0; i < snappedCart[0].cart.length; i++) {
			if (!idArray.includes(snappedCart[0].cart[i].id)) {
				idArray.push(snappedCart[0].cart[i].id);
			}
		}
		let newArray = [...idArray];

		setArrayOfCartIds(newArray);
		console.log(arrayofCartIds);
	};

	const addItemToCart2 = async (prod: DocumentData) => {
		// old version
		const userCart = await snapshotCart();
		// makes new array and initialises it with the current user cart
		let newUserCart = [...userCart];
		// console.log(newUserCart[0].cart);
		// console.log(prod);

		// pushes selected product into the array
		newUserCart[0].cart.push(prod);
		// sets state with the updated array
		// setCart(newUserCart);
		// updates the firestore user cart with the new updated state
		await updateDoc(doc(cartsCollectionRef, newUserCart[0].id), {
			cart: arrayUnion(...newUserCart[0].cart)
		});
		console.log(`added item to cart ${userCart[0].id}`);
	};

	const addItemToCart = async (prod: DocumentData) => {
		// makes a copy of the user cart in newUserCart
		const userCart = await snapshotCart();
		setCart(userCart);
		let newUserCart = [...userCart];
		getArrayOfIds();

		// makes an array of cart element id's to loop through
		// and check if there is already an item in the cart
		// for (let i = 0; i < userCart[0].cart.length; i++) {
		// 	productIDs.push(userCart[0].cart[i].id);
		// }
		let productIsInCart = arrayofCartIds.includes(prod.id);
		// adds item to cart or increases quantity
		if (productIsInCart) {
			for (let i = 0; i < newUserCart[0].cart.length; i++) {
				if (prod.id === newUserCart[0].cart[i].id) {
					newUserCart[0].cart[i].quantity++;
					await updateDoc(
						doc(cartsCollectionRef, newUserCart[0].id),
						{
							cart: newUserCart[0].cart
						}
					);
					// console.log(newUserCart[0].cart);
				} else {
					console.log('some error');
				}
			}
		} else if (!productIsInCart) {
			newUserCart[0].cart.push(prod);
			newUserCart[0].cart.at(-1).quantity++;
			await updateDoc(doc(cartsCollectionRef, newUserCart[0].id), {
				cart: arrayUnion(...newUserCart[0].cart)
			});
			console.log(`added item to cart ${userCart[0].id}`);
		}
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
				snapshotCart,
				addItemToCart,
				purchaseItems,
				purchaseCart,
				removeItemFromCart,
				fetchProducts,
				putPicInImg,
				fetchCurrentUserEmail,
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
