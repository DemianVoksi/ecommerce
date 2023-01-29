import React from 'react';
import './main.css';
import { Footer } from './Footer';
import { Header } from './Header';
import { Inventory } from './Inventory';

export const MainPage = () => {
	return (
		<div className="main-wrapper">
			<Header />
			<Inventory />
			<Footer />
		</div>
	);
};
