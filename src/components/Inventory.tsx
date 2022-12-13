import React, { useEffect } from 'react';
import './inventory.css';
import { InventoryItem } from './InventoryItem';
import { db } from '../utils/firebaseConfig';
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { SiteContext } from '../utils/ContextProvider';

export const Inventory = () => {
	const value = React.useContext(SiteContext)!;

	useEffect(() => {
		value.fetchProducts();
	}, []);

	if (value.allProducts) {
		return (
			<div className='inventory-wrapper'>
				{value.allProducts!.map((prod: DocumentData) => (
					<div key={prod.id}>
						<InventoryItem {...prod} />
					</div>
				))}
			</div>
		);
	} else return <p>Loading...</p>;
};
