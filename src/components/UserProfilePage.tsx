import { useContext } from 'react';
import { SiteContext } from '../utils/ContextProvider';
import { Footer } from './Footer';
import { Header } from './Header';
import './userProfile.css';

export const UserProfilePage = () => {
	const values = useContext(SiteContext)!;

	return (
		<div className="user-profile-wrapper">
			<Header />
			<div className="user-profile-content">
				<p>User: {values.fireAuth.currentUser?.email} </p>
			</div>
			<Footer />
		</div>
	);
};
