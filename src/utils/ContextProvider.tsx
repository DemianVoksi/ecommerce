import React, { useState } from 'react';

type UserContextProviderProps = {
	children: React.ReactNode;
};

export const ContextProvider = ({ children }: UserContextProviderProps) => {
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const [user, setUser] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [cart, setCart] = useState([]);
	const [toBuy, setToBuy] = useState([]);

	return <div></div>;
};
