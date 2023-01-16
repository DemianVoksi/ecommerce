import React from 'react';
import { Header } from './Header';
import { CurrentProduct } from '../utils/ContextProvider';

export const Product = ({ ...children }: CurrentProduct) => {
	return (
		<Product
		// name="string"
		// producer="string"
		// price={number}
		// processor="string"
		// memory={number}
		// storage="string"
		// storageNum={number}
		// os="string"
		// weight={number}
		// screenSize="string"
		// screenSizeNum={number}
		// id="string"
		>
			{<p>{children.id}</p>}
		</Product>
	);
};
