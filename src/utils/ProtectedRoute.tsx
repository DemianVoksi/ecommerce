import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './ContextProvider';

type ProtectedRouteProps = {
	children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const auth = useAuth();

	if (!auth?.user) {
		return <Navigate to='/' />;
	}
	return children;
};
