import { DocumentData } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { SiteContext } from '../../utils/ContextProvider';
import { Filter } from '../filter/Filter';
import { InventoryItem } from '../inventoryItem/InventoryItem';
import './inventory.css';

export const Inventory = () => {
	const values = React.useContext(SiteContext)!;

	useEffect(() => {
		values.fetchProducts();
	}, []);

	if (values.allProducts) {
		return (
			<div className="inventory-filter-wrapper">
				<Filter />
				<div className="inventory-wrapper">
					{values.allProducts.map((prod: DocumentData) => (
						<div key={prod.id}>
							<InventoryItem {...prod} />
						</div>
					))}
				</div>
			</div>
		);
	} else return <p>Loading...</p>;
};
