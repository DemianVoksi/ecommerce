import React from 'react';
import './inventory.css';
// import { InventoryItem } from './InventoryItem';
import { db } from '../utils/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export const Inventory = () => {
	////////////////////////////////// provjera da li radi

	/*
	Prebacivanje documenta iz jednog collectiona u drugi:
	https://stackoverflow.com/questions/68885676/how-do-we-copy-data-from-one-collection-to-another-in-firestore
	*/
	const productsCollectionRef = collection(db, 'products');

	const getProducts = async () => {
		const data = await getDocs(productsCollectionRef);
		data.docs.map((doc) => console.log(doc.ref.path));
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
