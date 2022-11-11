import React from 'react';
import './Header.css';
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
			</div>
		</div>
	);
};
