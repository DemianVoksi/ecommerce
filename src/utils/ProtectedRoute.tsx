import React from 'react';
import { Navigate } from 'react-router-dom';
import { firebaseAuth } from './firebaseConfig';

type ProtectedRouteProps = {
	children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const auth = firebaseAuth;

	if (!auth.currentUser) {
		return (
			<>
				<Navigate to="/" />
			</>
		);
	} else {
		return <>{children}</>;
	}
};
