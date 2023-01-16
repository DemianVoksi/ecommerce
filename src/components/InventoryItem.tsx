import { Navigate } from 'react-router-dom';
import { useAuth } from '../utils/ContextProvider';
import './inventoryItem.css';

export const InventoryItem = ({ ...prod }) => {
	// const values = React.useContext(SiteContext);
	const values = useAuth();
	const imageName = prod.name;
	const product = { ...prod };

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
		<Navigate to="/product" state={product} />;
	};

	return (
		<div className="inventory-item-wrapper">
			<div className="product-info" onClick={handleGoToProduct}>
				<p id="product-name">{prod.name}</p>
				<img
					src={require(`../pics/${imageName}.png`)}
					alt="product"
					className="image"
				></img>
				<div className="product-info-div">
					<p className="product-info-p">{`Memory: ${prod.memory}GB RAM `}</p>{' '}
					<p className="product-info-p">{`Storage: ${prod.storage}`}</p>{' '}
					<p className="product-info-p">{`Processor: ${prod.processor}`}</p>{' '}
					<p className="product-info-p">{`Price: ${prod.price} kr`}</p>{' '}
				</div>
			</div>
			<div className="inventory-item-buttons-wrapper">
				<button className="inventory-button" onClick={handleAddItem}>
					Add to cart
				</button>
				<button className="inventory-button" onClick={handleRemoveItem}>
					Remove from cart
				</button>
				<button onClick={printProduct}>Print</button>
			</div>
		</div>
	);
};
