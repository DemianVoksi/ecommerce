import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SiteContext } from '../../utils/ContextProvider';
import './loggedInOutButtons.css';

export const LoggedInButtons = () => {
	const values = React.useContext(SiteContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		values?.logout();
		navigate('/');
	};

	const handleGoToCart = () => {
		navigate('/purchase');
		values?.handleTotal();
	};

	return (
		<div
			className="logged-in-out-buttons-wrapper"
			id="logged-in-buttons-wrapper"
		>
			<button
				className="button"
				id="logout-button"
				onClick={handleLogout}
			>
				Log out
			</button>
			<button className="button" onClick={handleGoToCart}>
				Checkout
			</button>
		</div>
	);
};
