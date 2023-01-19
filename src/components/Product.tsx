import React, { useEffect, useState } from 'react';
// import { Header } from './Header';
import { useParams } from 'react-router-dom';
import { useAuth } from '../utils/ContextProvider';
import { DocumentData, getDocs, query, where } from 'firebase/firestore';

export const Product = () => {
	const values = useAuth();
	let productID = useParams();
	const [product, setProduct] = useState<DocumentData[]>([])!;

	useEffect(() => {
		snapshotProduct();
	}, []);

	const snapshotProduct = async () => {
		const productQuery = query(
			values.productsCollectionRef,
			where('__name__', '==', productID.id)
		);
		const productSnapshot = await getDocs(productQuery);
		const productProper = productSnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id
		}));
		setProduct(productProper);
	};

	return (
		<div>
			<p>{product[0]?.name}</p>
			<p>{product[0]?.price}</p>
		</div>
	);
};
