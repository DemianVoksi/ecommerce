import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

export const Purchase = () => {
	return (
		<div className='purchase'>
			<Header />
			<div className='purchase-content'>
				<div className='cart-contents'></div>
				<div className='purchase-form-container'>
					<form>
						{/*
						Delivery info: 

						Name
						Address
						City
						Code 
						Country
						State?

						Payment info:
						Card number
						safety code 
						expiration
						card holder

						*/}
						<div></div>
					</form>
				</div>
			</div>
			<Footer />
		</div>
	);
};
