import React from 'react';
import { Header } from './Header';
import { CurrentProduct } from '../utils/ContextProvider';

export const Product = (props: CurrentProduct) => {
	return (
		<div>
			<p>{props.name}</p>
			<p>{props.price}</p>
		</div>
	);
};
