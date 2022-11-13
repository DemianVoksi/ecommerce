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

	const products: Product[] = [
		{
			name: 'MacBook Pro 13 M2 2022 8/256GB',
			price: 16000,
			processor: 'Apple M2',
			memory: '8 GB',
			storage: '256 GB SSD',
			operatingSystem: 'macOS Monterey',
			weight: '1.4 kg',
			screenSize: '13.6" Liquid Retina'
		},
		{
			name: 'MacBook Pro 14 M1 Pro 2021 1TB',
			price: 25000,
			processor: 'Apple M1 Pro',
			memory: '16 GB',
			storage: '1 TB SSD',
			operatingSystem: 'macOS Monterey',
			weight: '1.6 kg',
			screenSize: '14.2" Retina XDR'
		},
		{
			name: 'MacBook Pro 14 M1 Pro 2021 512GB',
			price: 22000,
			processor: 'Apple M1 Pro',
			memory: '16 GB',
			storage: '512 GB SSD',
			operatingSystem: 'macOS Monterey',
			weight: '1.6 kg',
			screenSize: '14.2" Retina XDR'
		},
		{
			name: 'MacBook Pro 16 M1 Pro 2021 512GB',
			price: 26000,
			processor: 'Apple M1 Pro',
			memory: '16 GB',
			storage: '512 GB SSD',
			operatingSystem: 'macOS Monterey',
			weight: '2.1 kg',
			screenSize: '16.2" Liquid Retina XDR'
		},
		{
			name: 'Lenovo ThinkBook 14 Gen2 i7/16/512GB',
			price: 12000,
			processor: 'Intel Core i7-1165G7',
			memory: '16 GB',
			storage: '512 GB SSD',
			operatingSystem: 'Windows 11 Pro',
			weight: '1.4 kg',
			screenSize: '14" Full HD'
		},
		{
			name: 'Lenovo ThinkPad P15 Gen2 15.6" i7/32/512GB',
			price: 36500,
			processor: 'Intel Core i7-11850H',
			memory: '32 GB',
			storage: '512 GB M.2 SSD',
			operatingSystem: 'Windows 10 Pro',
			weight: '2.87 kg',
			screenSize: '15.6" Full HD'
		},
		{
			name: 'Dell Latitude 3420 14" i5/8/256',
			price: 9800,
			processor: 'Intel Core i5-1135G7',
			memory: '8 GB',
			storage: '256 GB M.2 SSD',
			operatingSystem: 'Windows 11 Pro',
			weight: '1.52 kg',
			screenSize: '14" Full HD'
		},
		{
			name: 'Lenovo ThinkPad T14s Gen3 i7/16/512GB',
			price: 24000,
			processor: 'Intel Core i7-1260P',
			memory: '16 GB',
			storage: '512 GB SSD',
			operatingSystem: 'Windows 11 Pro',
			weight: '1.21 kg',
			screenSize: '14" WUXGA'
		}
	];

	interface Cart {
		list: string[];
	}

	return <div>Logic</div>;
};
