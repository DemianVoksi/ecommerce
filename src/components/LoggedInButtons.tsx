import React from 'react';
import 'loggedInOutButtons.css';

export const LoggedInButtons = () => {
	return (
		<div
			className='logged-in-out-buttons-wrapper'
			id='logged-in-buttons-wrapper'
		>
			<button className='button'>Log out</button>
			<button className='button'>View cart</button>
		</div>
	);
};
