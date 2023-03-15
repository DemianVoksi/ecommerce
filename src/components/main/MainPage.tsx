import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { SiteContext } from '../../utils/ContextProvider';
import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
import { Inventory } from '../inventory/Inventory';
import { RollerPage } from '../roller/RollerPage';
import './main.css';

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
