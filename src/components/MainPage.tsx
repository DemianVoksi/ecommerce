import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { SiteContext } from '../utils/ContextProvider';
import { Footer } from './Footer';
import { Header } from './Header';
import { Inventory } from './Inventory';
import './main.css';
import { RollerPage } from './RollerPage';

export const MainPage = () => {
	const values = useContext(SiteContext);
	return (
		<div className="main-wrapper">
			<Helmet>
				<title>The Computer Shop</title>
				<meta
					name="description"
					content="The Computer Shop inventory page"
				/>
				<link rel="canonical" href="/" />
			</Helmet>
			{values?.isLoading ? (
				<RollerPage />
			) : (
				<div className="main-wrapper">
					<Header />
					<Inventory />
					<Footer />
				</div>
			)}
		</div>
	);
};
