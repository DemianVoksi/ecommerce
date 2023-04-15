import {
	Auth,
	getAuth,
	onAuthStateChanged,
	signOut,
	User
} from 'firebase/auth';
import {
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
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	cart: DocumentData[];
	setCart: React.Dispatch<React.SetStateAction<DocumentData[]>>;
	toBuy: never[];
	setToBuy: React.Dispatch<React.SetStateAction<never[]>>;
	allProducts: DocumentData[];
	setAllProducts: React.Dispatch<React.SetStateAction<DocumentData[]>>;
	getArrayOfIds: () => Promise<void>;
	arrayofCartIds: string[];
	setArrayOfCartIds: React.Dispatch<React.SetStateAction<string[]>>;
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
	total: number | null;
	setTotal: React.Dispatch<React.SetStateAction<number | null>>;
	handleTotal: () => Promise<void>;
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

export const SiteContext = createContext<ValueTypes | null>(null);

export const ContextProvider = ({ children }: UserContextProviderProps) => {
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const [user, setUser] = useState<User | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [cart, setCart] = useState<DocumentData[]>([]);
	const [total, setTotal] = useState<number | null>(null);
	const [toBuy, setToBuy] = useState([]);
	const [allProducts, setAllProducts] = useState<DocumentData[]>([]);
	const [currentProduct, setCurrentProduct] = useState<DocumentData[]>([]);
	const [arrayofCartIds, setArrayOfCartIds] = useState<string[]>([]);
	const fireAuth = getAuth();
	const productsCollectionRef = collection(db, 'products');
	const cartsCollectionRef = collection(db, 'carts');
	const storageRef = ref(storage);

	useEffect(() => {
		setIsLoading(true);
		onAuthStateChanged(fireAuth, (user) => {
			if (!!user) {
				setUser(user);
				setIsLoggedIn(true);
				snapshotCart();
				getArrayOfIds();
				handleTotal();
			}
		});
	}, []);

	const fetchProducts = async () => {
		const data = await getDocs(productsCollectionRef);
		setAllProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		setIsLoading(false);
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
		setIsLoading(false);
		// handleTotal();
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

	const addItemToCart = async (prod: DocumentData) => {
		if (user) {
			const userCart = await snapshotCart();
			setCart(userCart);
			let newUserCart = [...userCart];
			getArrayOfIds();
			let productIsInCart = arrayofCartIds.includes(prod.id);

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
					} else {
						console.log('other products exist');
					}
				}
			} else if (!productIsInCart) {
				newUserCart[0].cart.push(prod);
				newUserCart[0].cart.at(-1).quantity++;
				await updateDoc(doc(cartsCollectionRef, newUserCart[0].id), {
					cart: newUserCart[0].cart
				});
				console.log(`added item to cart ${userCart[0].id}`);
			}
		} else {
			alert('Please make an account to use the cart feature');
		}
	};

	const removeItemFromCart = async (prod: DocumentData) => {
		const userCart = await snapshotCart();
		setCart(userCart);
		let newUserCart = [...userCart];
		getArrayOfIds();

		for (let i = 0; i < newUserCart[0].cart.length; i++) {
			if (
				prod.id === newUserCart[0].cart[i].id &&
				newUserCart[0].cart[i].quantity > 1
			) {
				newUserCart[0].cart[i].quantity--;
				setCart(newUserCart);
				await updateDoc(doc(cartsCollectionRef, newUserCart[0].id), {
					cart: newUserCart[0].cart
				});
			} else if (
				prod.id === newUserCart[0].cart[i].id &&
				newUserCart[0].cart[i].quantity === 1
			) {
				let newIDs = arrayofCartIds.filter(
					(item) => item !== newUserCart[0].cart[i].id
				);
				setArrayOfCartIds(newIDs);
				newUserCart[0].cart.splice(i, 1);
				setCart(newUserCart);
				await updateDoc(doc(cartsCollectionRef, newUserCart[0].id), {
					cart: newUserCart[0].cart
				});
			} else {
				console.log('other products exist');
			}
		}
	};

	const toNum = (input: string) => {
		let num = Number(input.replaceAll(' ', ''));
		return num;
	};

	const handleTotal = async () => {
		const userCart = await snapshotCart();

		if (userCart[0].cart.length < 1) {
			setTotal(0);
		} else if (userCart[0].cart.length === 1) {
			let itemTotal =
				toNum(userCart[0].cart[0].price) * userCart[0].cart[0].quantity;
			setTotal(itemTotal);
		} else {
			const cartTotal = userCart[0].cart
				.map((value: any) => {
					let numbered = toNum(value.price);
					let itemTotal = numbered * value.quantity;
					return itemTotal;
				})
				.reduce((a: number, b: number) => a + b);
			setTotal(cartTotal);
		}
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
				isLoading,
				setIsLoading,
				cart,
				setCart,
				toBuy,
				setToBuy,
				allProducts,
				setAllProducts,
				currentProduct,
				setCurrentProduct,
				getArrayOfIds,
				arrayofCartIds,
				setArrayOfCartIds,
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
				total,
				setTotal,
				handleTotal,
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
