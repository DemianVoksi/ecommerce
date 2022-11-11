import React from 'react';

export const Logic = () => {
	interface Product {
		name: string;
		price: number;
		processor: string;
		memory: string;
		storage: string;
		operatingSystem: string;
		weight: string;
		screenSize: string;
	}

	interface Cart {
		list: string[];
	}

	return <div>Logic</div>;
};
