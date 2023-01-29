import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

export const UserProfilePage = () => {
	return (
		<div className="user-profile">
			<Header />
			{/* content */}
			<p>User profile page</p>
			<Footer />
		</div>
	);
};
