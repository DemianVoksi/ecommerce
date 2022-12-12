import React from 'react';
import './inventory.css';
// import { InventoryItem } from './InventoryItem';
import { db } from '../utils/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { SiteContext } from '../utils/ContextProvider';

export const Inventory = () => {
	////////////////////////////////// provjera da li radi
	const productsCollectionRef = collection(db, 'products');
	const value = React.useContext(SiteContext)!;

	const getProducts = async () => {
		const data = await getDocs(productsCollectionRef);
		data.docs.map((doc) => console.log(doc.data()));
		// value.createNewCart();
		// doc.id je id
		// doc.data() je data{}
	};
	//////////////////////////////////////////////////////

	return (
		<div className='inventory-wrapper'>
			<button onClick={getProducts}>inventory</button>
			{/*
		firebaseInventoryItems.map((item) => {
			<InventoryItem item={item} />
		})
		*/}
		</div>
	);
};
