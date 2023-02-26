import { useContext } from 'react';
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
