import { useNavigate } from 'react-router-dom';
import './loggedInOutButtons.css';

export const LoggedOutButtons = () => {
	const navigate = useNavigate();

	const handleGoToLogin = () => {
		navigate('/login');
	};

	const handleGoToRegister = () => {
		navigate('/register');
	};

	return (
		<div
			className="logged-in-out-buttons-wrapper"
			id="logged-out-buttons-wrapper"
		>
			<button
				className="button"
				id="login-button"
				onClick={handleGoToLogin}
			>
				Log in
			</button>
			<button
				className="button"
				id="register-button"
				onClick={handleGoToRegister}
			>
				Register
			</button>
		</div>
	);
};
