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

	const printUser = () => {
		console.log(values.user);
	};

	return (
		<div className="cart-in-purchase-container">
			<div>
				{userCart[0].cart.map((item: any) => (
					<div>
						{' '}
						<p>
							{item.name}: {item.price} SEK
						</p>
					</div>
				))}
			</div>
			<button onClick={printCart}>print cart</button>
			<button onClick={printUser}>print user</button>
		</div>
	);
};
