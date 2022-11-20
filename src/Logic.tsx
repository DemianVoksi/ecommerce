import React from 'react';

export interface Product {
	name: string;
	producer: string;
	price: number;
	processor: string;
	memory: number;
	storage: string;
	storageNum: number;
	os: string;
	weight: number;
	screenSize: string;
	screenSizeNum: number;
}

export interface Cart {
	owner: string;
	list: string[];
}

export const Logic = () => {
	const products: Product[] = [
		{
			name: 'MacBook Pro 13 M2 2022 8/256GB',
			producer: 'Apple',
			price: 16000,
			processor: 'Apple M2',
			memory: 8,
			storage: '256 GB SSD',
			storageNum: 256,
			os: 'macOS Monterey',
			weight: 1.4,
			screenSize: '13.6" Liquid Retina',
			screenSizeNum: 13.6
		},
		{
			name: 'MacBook Pro 14 M1 Pro 2021 1TB',
			producer: 'Apple',
			price: 25000,
			processor: 'Apple M1 Pro',
			memory: 16,
			storage: '1 TB SSD',
			storageNum: 1024,
			os: 'macOS Monterey',
			weight: 1.6,
			screenSize: '14.2" Retina XDR',
			screenSizeNum: 14.2
		},
		{
			name: 'MacBook Pro 14 M1 Pro 2021 512GB',
			producer: 'Apple',
			price: 22000,
			processor: 'Apple M1 Pro',
			memory: 16,
			storage: '512 GB SSD',
			storageNum: 512,
			os: 'macOS Monterey',
			weight: 1.6,
			screenSize: '14.2" Retina XDR',
			screenSizeNum: 14.2
		},
		{
			name: 'MacBook Pro 16 M1 Pro 2021 512GB',
			producer: 'Apple',
			price: 26000,
			processor: 'Apple M1 Pro',
			memory: 16,
			storage: '512 GB SSD',
			storageNum: 512,
			os: 'macOS Monterey',
			weight: 2.1,
			screenSize: '16.2" Liquid Retina XDR',
			screenSizeNum: 16.2
		},
		{
			name: 'Lenovo ThinkBook 14 Gen2 i7/16/512GB',
			producer: 'Lenovo',
			price: 12000,
			processor: 'Intel Core i7-1165G7',
			memory: 16,
			storage: '512 GB SSD',
			storageNum: 512,
			os: 'Windows 11 Pro',
			weight: 1.4,
			screenSize: '14" Full HD',
			screenSizeNum: 14
		},
		{
			name: 'Lenovo ThinkPad P15 Gen2 15.6" i7/32/512GB',
			producer: 'Lenovo',
			price: 36500,
			processor: 'Intel Core i7-11850H',
			memory: 32,
			storage: '512 GB M.2 SSD',
			storageNum: 512,
			os: 'Windows 10 Pro',
			weight: 2.87,
			screenSize: '15.6" Full HD',
			screenSizeNum: 15.6
		},
		{
			name: 'Dell Latitude 3420 14" i5/8/256',
			producer: 'Dell',
			price: 9800,
			processor: 'Intel Core i5-1135G7',
			memory: 8,
			storage: '256 GB M.2 SSD',
			storageNum: 256,
			os: 'Windows 11 Pro',
			weight: 1.52,
			screenSize: '14" Full HD',
			screenSizeNum: 14
		},
		{
			name: 'Lenovo ThinkPad T14s Gen3 i7/16/512GB',
			producer: 'Lenovo',
			price: 24000,
			processor: 'Intel Core i7-1260P',
			memory: 16,
			storage: '512 GB SSD',
			storageNum: 512,
			os: 'Windows 11 Pro',
			weight: 1.21,
			screenSize: '14" WUXGA',
			screenSizeNum: 14
		}
	];

	return <div>Logic</div>;
};
