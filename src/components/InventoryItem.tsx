import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/ContextProvider';
import './inventoryItem.css';

export const InventoryItem = ({ ...prod }) => {
	const values = useAuth();
	const imageName = prod.name;
	const product = { ...prod };
	const navigate = useNavigate();
	const htmlID = prod.picUrl;

	useEffect(() => {
		values.putPicInImg(prod.picUrl, htmlID);
	}, []);

	const printProduct = () => {
		console.log(product);
	};

	const handleAddItem = () => {
		values.addItemToCart(prod);
	};

	const handleRemoveItem = () => {
		values.removeItemFromCart(prod);
	};

	const handleGoToProduct = () => {
		navigate(`product/${prod.id}`);
	};

	return (
		<div className="inventory-item-wrapper">
			<div className="product-info">
				<img alt="product" className="image" id={htmlID}></img>
				<div className="product-info-div">
					<p id="product-name">{prod.name}</p>
					<p className="product-info-p">{`Memory: ${prod.memory}GB RAM `}</p>{' '}
					<p className="product-info-p">{`Storage: ${prod.storage}`}</p>{' '}
					<p className="product-info-p">{`Processor: ${prod.processor}`}</p>{' '}
					<p className="product-info-p">{`Price: ${prod.price} kr`}</p>{' '}
				</div>
				<div className="inventory-item-buttons-wrapper">
					<button
						className="inventory-button"
						onClick={handleAddItem}
					>
						Add to cart
					</button>
					<button
						className="inventory-button"
						onClick={handleGoToProduct}
					>
						Go to product page
					</button>
					{/* <button className="inventory-button" onClick={handleRemoveItem}>
					Remove from cart
				</button>
				<button onClick={printProduct}>Print</button> */}
				</div>
			</div>
		</div>
	);
};
