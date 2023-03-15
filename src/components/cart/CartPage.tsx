import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';

export const CartPage = () => {
	return (
		<div>
			<Header />
			<div className="cart-contents-container">
				{/* 
				(cart empty) ? <p>Your cart is empty</p> : 
				<div className='cart-contents'>
					{cart.forEach((item) => {
						<div className='item-content'>
							<p>item.pic</p>					
							<p>item.name</p>					
							<p>item.price</p>
					})}
						</div>
				</div> 
				*/}
			</div>
			<Footer />
		</div>
	);
};
