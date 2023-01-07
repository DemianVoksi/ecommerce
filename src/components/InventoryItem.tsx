import React from 'react';
import { SiteContext } from '../utils/ContextProvider';
import './inventoryItem.css';

export const InventoryItem = ({ ...prod }) => {
	const values = React.useContext(SiteContext);
	const handleAddItem = () => {
		values?.addItemToCart(prod);
	};

	const handleRemoveItem = () => {
		values?.removeItemFromCart(prod);
	};

	return (
		<div className='inventory-item-wrapper'>
			<p>{prod.name}</p>
			<p>{prod.price}</p>
			<p>{prod.id}</p>
			<button onClick={handleAddItem}>Add to cart</button>
			<button onClick={handleRemoveItem}>Remove from cart</button>
		</div>
	);
};
