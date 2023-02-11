import React, { useEffect, useState } from 'react';
import './inventory.css';
import { InventoryItem } from './InventoryItem';
import { db } from '../utils/firebaseConfig';
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { SiteContext } from '../utils/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

export const Inventory = () => {
	const values = React.useContext(SiteContext)!;
	const [userCart, setUsercart] = useState<DocumentData[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		values.fetchProducts();
		// fetchActiveCart();
	}, []);

	const fetchActiveCart = async () => {
		const fetchedCart = await values.snapshotCart();
		const cart = fetchedCart;
		setUsercart(cart);
	};

	const printCart = () => {
		console.log(userCart);
	};

	const goToPurchase = () => {
		navigate('/purchase');
		values.snapshotCart();
	};

	const printUser = () => {
		let user = values.fetchCurrentUserEmail();
		console.log(user);
	};

	if (values.allProducts) {
		return (
			<div className="inventory-wrapper">
				{values.allProducts.map((prod: DocumentData) => (
					<div key={prod.id}>
						<InventoryItem {...prod} />
					</div>
				))}
				{/* <button onClick={printCart}>print cart</button>
				<button onClick={goToPurchase}>go to purchase</button>
				<button onClick={printUser}>print user</button> */}
			</div>
		);
	} else return <p>Loading...</p>;
};
