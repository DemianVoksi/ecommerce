import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiteContext } from '../utils/ContextProvider';
import './inventory.css';
import { InventoryItem } from './InventoryItem';

export const Inventory = () => {
	const values = React.useContext(SiteContext)!;
	const [userCart, setUsercart] = useState<DocumentData[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		values.fetchProducts();
		// fetchActiveCart();
	}, []);

	// const fetchActiveCart = async () => {
	// 	const fetchedCart = await values.snapshotCart();
	// 	const cart = fetchedCart;
	// 	setUsercart(cart);
	// };

	if (values.allProducts) {
		return (
			<div className="inventory-wrapper">
				{values.allProducts.map((prod: DocumentData) => (
					<div key={prod.id}>
						<InventoryItem {...prod} />
					</div>
				))}
			</div>
		);
	} else return <p>Loading...</p>;
};
