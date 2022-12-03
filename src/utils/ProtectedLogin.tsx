import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './ContextProvider';

type ProtectedLoginProps = {
	children: React.ReactNode;
};

export const ProtectedLogin = ({ children }: ProtectedLoginProps) => {
	const auth = useAuth();

	if (auth?.user) {
		return (
			<>
				<Navigate to='/' />
			</>
		);
	} else {
		return <>{children}</>;
	}
};
