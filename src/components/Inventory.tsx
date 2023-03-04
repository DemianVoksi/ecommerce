import { DocumentData } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { SiteContext } from '../utils/ContextProvider';
import './inventory.css';
import { InventoryItem } from './InventoryItem';

export const Inventory = () => {
	const values = React.useContext(SiteContext)!;

	useEffect(() => {
		values.fetchProducts();
	}, []);

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
