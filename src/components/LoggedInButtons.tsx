import React from 'react';
import 'loggedInOutButtons.css';
import { Link } from 'react-router-dom';

export const LoggedInButtons = () => {
	return (
		<div
			className='logged-in-out-buttons-wrapper'
			id='logged-in-buttons-wrapper'
		>
			<button className='button'>Log out</button>
			<Link to='/cart'>
				<button className='button'>View cart</button>
			</Link>
		</div>
	);
};
