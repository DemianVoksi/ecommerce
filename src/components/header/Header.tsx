import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SiteContext } from '../../utils/ContextProvider';
import { LoggedInButtons } from '../loginAndRegister/LoggedInButtons';
import { LoggedOutButtons } from '../loginAndRegister/LoggedOutButtons';
import './header.css';

export const Header = () => {
	const values = React.useContext(SiteContext);
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate('/');
	};

	if (values?.isLoggedIn) {
		return (
			<div className="header-wrapper">
				<div className="logo-wrapper" onClick={handleGoBack}>
					<h4 className="logo">The Computer Shop</h4>
					{/* <p>user: {values.fireAuth.currentUser?.email}</p> */}
				</div>
				<div className="header-buttons">
					<LoggedInButtons />
				</div>
			</div>
		);
	} else {
		return (
			<div className="header-wrapper">
				<div className="logo-wrapper" onClick={handleGoBack}>
					<h4 className="logo">The Computer Shop</h4>
				</div>
				<div className="header-buttons">
					<LoggedOutButtons />
				</div>
			</div>
		);
	}
};
