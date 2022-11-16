import React from 'react';
import './header.css';
import { LoggedInButtons } from './LoggedInButtons';
import { LoggedOutButtons } from './LoggedOutButtons';

export const Header = () => {
	return (
		<div className='header-wrapper'>
			<div className='logo-wrapper'>
				<h4 className='logo'>Logo</h4>
			</div>
			<div className='header-buttons'>
				{/*
        loggedIn ? <LoggedInButtons /> : <LoggedOutButtons />
        */}
				<button>Go to login</button>
			</div>
		</div>
	);
};
