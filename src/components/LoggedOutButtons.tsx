import React from 'react';
import { useNavigate } from 'react-router-dom';
import './loggedInOutButtons.css';

export const LoggedOutButtons = () => {
	const navigate = useNavigate();
	const handleGoToLogin = () => {
		navigate('/login');
	};

	return (
		<div
			className='logged-in-out-buttons-wrapper'
			id='logged-out-buttons-wrapper'
		>
			<button className='button' id='login-button' onClick={handleGoToLogin}>
				Log in or register
			</button>
		</div>
	);
};
