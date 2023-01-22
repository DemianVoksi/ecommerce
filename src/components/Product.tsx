import React, { useEffect, useState } from 'react';
// import { Header } from './Header';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../utils/ContextProvider';
import { DocumentData, getDocs, query, where } from 'firebase/firestore';
import './product.css';

export const Product = () => {
	const values = useAuth();
	let productID = useParams();
	let productName = `${productID.id}.png`;
	const [product, setProduct] = useState<DocumentData[]>([])!;
	const navigate = useNavigate();

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

	const handlePurchase = () => {};

	const handleAddToCart = () => {};

	const handleGoBack = () => {
		navigate('/');
	};

	return (
		<div className="product-container">
			<div className="image-container">
				<img
					src={require(`../pics/${productName}`)}
					alt="product"
					className="product-image"
				></img>
				<p className="product-price">Price: {product[0]?.price} SEK</p>
			</div>
			<div className="info-container">
				<div className="title-container">
					<p className="product-title">{product[0]?.name}</p>
				</div>
				<div className="product-details-container">
					<p className="product-details">
						Memory: {product[0]?.memory} GB
					</p>
					<p className="product-details">
						Storage: {product[0]?.storage}
					</p>
					<p className="product-details">
						Processor: {product[0]?.processor}
					</p>
					<p className="product-details">
						Screen: {product[0]?.screenSize}
					</p>
					<p className="product-details">
						Operating system: {product[0]?.os}
					</p>
					<p className="product-details">
						Weight: {product[0]?.weight} kg
					</p>
				</div>
				<div className="product-buttons-container">
					<button className="product-button" onClick={handlePurchase}>
						Purchase
					</button>
					<button
						className="product-button"
						onClick={handleAddToCart}
					>
						Add to cart
					</button>
					<button onClick={handleGoBack}>go back</button>
				</div>
			</div>
		</div>
	);
};
