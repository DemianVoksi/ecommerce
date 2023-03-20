import { DocumentData, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../utils/ContextProvider';
import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
import { ProductImage } from '../productImage/ProductImage';
import { RollerPage } from '../roller/RollerPage';
import './product.css';

export const ProductPage = () => {
	const values = useAuth();
	let productID = useParams();
	let productName = `${productID.id}.png`;
	const [product, setProduct] = useState<DocumentData[]>([])!;

	useEffect(() => {
		values.setIsLoading(true);
		snapshotProduct();
		console.log('use effect triggered', productName);
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
		values.setIsLoading(false);
		return product;
	};

	const handlePurchase = () => {};

	const handleAddToCart = async () => {
		values.addItemToCart(product[0]);
	};

	const handleRemoveItem = async () => {
		values.removeItemFromCart(product[0]);
	};

	return (
		<div className="product-page-container">
			<Helmet>
				<title>{product[0]?.name}</title>
				<meta name="description" content="Product page" />
				<link rel="canonical" href="/product/:id" />
			</Helmet>
			<Header />
			<div className="product-container">
				<div className="image-container">
					{values.isLoading ? (
						<RollerPage />
					) : (
						<ProductImage
							product={product}
							productName={productName}
						/>
					)}
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
						<button
							className="product-button"
							onClick={handlePurchase}
						>
							Purchase
						</button>
						<button
							className="product-button"
							onClick={handleAddToCart}
						>
							Add to cart
						</button>
						{values.arrayofCartIds.includes(product[0]?.id) ? (
							<button
								className="product-button"
								onClick={handleRemoveItem}
							>
								Remove from cart
							</button>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};
