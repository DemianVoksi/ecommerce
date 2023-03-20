import { DocumentData } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { SiteContext } from '../../utils/ContextProvider';

export const ProductImage = (props: {
	product: DocumentData[];
	productName: string;
}) => {
	const values = React.useContext(SiteContext);

	useEffect(() => {
		values!.putPicInImg(props.productName, 'product-image');
	}, []);

	return (
		<div>
			<img
				alt="product"
				className="product-image"
				id="product-image"
			></img>
			<p className="product-price">Price: {props.product[0]?.price} kr</p>{' '}
		</div>
	);
};
