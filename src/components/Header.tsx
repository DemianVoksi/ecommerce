import React, { useContext } from 'react';
import { SiteContext } from '../utils/ContextProvider';
import './header.css';
import { LoggedInButtons } from './LoggedInButtons';
import { LoggedOutButtons } from './LoggedOutButtons';

export const Header = () => {
	const value = React.useContext(SiteContext);

	return (
		<div className='header-wrapper'>
			<div className='logo-wrapper'>
				<h4 className='logo'>The Computer Shop</h4>
			</div>
			<div className='header-buttons'>
				{value?.isLoggedIn ? <LoggedInButtons /> : <LoggedOutButtons />}
			</div>
		</div>
	);
};
