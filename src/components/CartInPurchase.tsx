import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/ContextProvider';

export const CartInPurchase = () => {
	const values = useAuth();
	const [userCart, setUsercart] = useState<DocumentData[]>([]);

	useEffect(() => {
		fetchActiveCart();
	}, []);

	const fetchActiveCart = async () => {
		const fetchedCart = await values.snapshotCart();
		const cart = fetchedCart;
		setUsercart(cart);
	};

	const printCart = () => {
		console.log(userCart);
	};

	return (
		<div className="cart-in-purchase-container">
			<button onClick={printCart}>print cart</button>
		</div>
	);
};
