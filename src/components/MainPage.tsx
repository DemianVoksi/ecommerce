import { Footer } from './Footer';
import { Header } from './Header';
import { Inventory } from './Inventory';
import './main.css';

export const MainPage = () => {
	return (
		<div className="main-wrapper">
			<Header />
			<Inventory />
			<Footer />
		</div>
	);
};
