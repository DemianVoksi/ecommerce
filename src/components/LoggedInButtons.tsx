import React from 'react';
import './loggedInOutButtons.css';
import { useNavigate } from 'react-router-dom';
import { SiteContext } from '../utils/ContextProvider';

export const LoggedInButtons = () => {
	const values = React.useContext(SiteContext);
	const navigate = useNavigate();
	const handleLogout = () => {
		values?.logout();
		navigate('/');
	};
	const handleViewCart = () => {
		navigate('/cart');
	};

	return (
		<div
			className='logged-in-out-buttons-wrapper'
			id='logged-in-buttons-wrapper'
		>
			<button className='button' onClick={handleLogout}>
				Log out
			</button>
			<button className='button' onClick={handleViewCart}>
				View cart
			</button>
		</div>
	);
};
