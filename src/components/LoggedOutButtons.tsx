import React from 'react';
import 'loggedInOutButtons.css';

export const LoggedOutButtons = () => {
	return (
		<div
			className='logged-in-out-buttons-wrapper'
			id='logged-out-buttons-wrapper'
		>
			<button className='button'>Log in or register</button>
		</div>
	);
};
