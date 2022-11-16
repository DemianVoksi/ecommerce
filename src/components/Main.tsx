import React from 'react';
import './main.css';
import { Footer } from './Footer';
import { Header } from './Header';
import { Inventory } from './Inventory';

export const Main = () => {
	return (
		<div className='main-wrapper'>
			<p>Main page</p>
			<Header />
			<Inventory />
			<Footer />
		</div>
	);
};
