import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './ContextProvider';
import { firebaseAuth } from './firebaseConfig';

type ProtectedLoginProps = {
	children: React.ReactNode;
};

export const ProtectedLogin = ({ children }: ProtectedLoginProps) => {
	const auth = firebaseAuth;

	if (auth.currentUser) {
		return (
			<>
				<Navigate to="/" />
			</>
		);
	} else {
		return <>{children}</>;
	}
};
