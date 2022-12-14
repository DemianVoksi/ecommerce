import React from 'react';
import './inventoryItem.css';

export const InventoryItem = ({ ...prod }) => {
	return (
		<div className='inventory-item-wrapper'>
			<p>{prod.name}</p>
			<p>{prod.price}</p>
			<p>{prod.id}</p>
		</div>
	);
};
