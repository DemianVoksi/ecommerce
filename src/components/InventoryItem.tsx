import React from 'react';
import './inventoryItem.css';

export const InventoryItem = ({ ...prod }) => {
	return (
		<div className='inventory-item-wrapper'>
			<p>{prod.name}</p>
			<p>{prod.memory}</p>
		</div>
	);
};
