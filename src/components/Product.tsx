import React from 'react';
import { Header } from './Header';
import { useParams } from 'react-router-dom';

export const Product = () => {
	let productID = useParams();

	const handleParams = () => {
		console.log(productID.id);
	};
	return (
		<div>
			<button onClick={handleParams}>Print ID</button>
		</div>
	);
};
