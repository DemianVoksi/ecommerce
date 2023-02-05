import React, { useContext } from 'react';
import { SiteContext } from '../utils/ContextProvider';
import './header.css';
import { LoggedInButtons } from './LoggedInButtons';
import { LoggedOutButtons } from './LoggedOutButtons';

export const Header = () => {
	const values = React.useContext(SiteContext);

	if (values?.isLoggedIn) {
		return (
			<div className="header-wrapper">
				<div className="logo-wrapper">
					<h4 className="logo">The Computer Shop</h4>
				</div>
				<div className="header-buttons">
					<LoggedInButtons />
				</div>
				<p>Current user from state: {values?.user?.email}</p>
				<div>
					is logged in: {values?.isLoggedIn ? <p>yes</p> : <p>no</p>}
				</div>
			</div>
		);
	} else {
		return (
			<div className="header-wrapper">
				<div className="logo-wrapper">
					<h4 className="logo">The Computer Shop</h4>
				</div>
				<div className="header-buttons">
					<LoggedOutButtons />
				</div>
				<p>Current user from state: {values?.user?.email}</p>
				<div>
					is logged in: {values?.isLoggedIn ? <p>yes</p> : <p>no</p>}
				</div>
			</div>
		);
	}
};
