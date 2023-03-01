import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { SiteContext } from '../utils/ContextProvider';
import { Footer } from './Footer';
import { Header } from './Header';
import './userProfile.css';

export const UserProfilePage = () => {
	const values = useContext(SiteContext)!;

	return (
		<div className="user-profile-wrapper">
			<Helmet>
				<title>User Profile</title>
				<meta name="description" content="User profile page" />
				<link rel="canonical" href="/user-profile" />
			</Helmet>
			<Header />
			<div className="user-profile-content">
				<p>User: {values.fireAuth.currentUser?.email} </p>
			</div>
			<Footer />
		</div>
	);
};
