import { useAuth } from '../utils/ContextProvider';
import './inventoryItem.css';

export const InventoryItem = ({ ...prod }) => {
	// const values = React.useContext(SiteContext);
	const values = useAuth();

	const handleAddItem = () => {
		values.addItemToCart(prod);
	};

	const handleRemoveItem = () => {
		values.removeItemFromCart(prod);
	};

	return (
		<div className="inventory-item-wrapper">
			<p id="product-name">{prod.name}</p>
			<p>{prod.price}</p>{' '}
			<div className="inventory-item-buttons-wrapper">
				<button className="inventory-button" onClick={handleAddItem}>
					Add to cart
				</button>
				<button className="inventory-button" onClick={handleRemoveItem}>
					Remove from cart
				</button>
			</div>
		</div>
	);
};
