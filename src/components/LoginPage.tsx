import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { SiteContext } from '../utils/ContextProvider';
import './loginAndRegister.css';

export const LoginPage = () => {
	const values = React.useContext(SiteContext)!;
	const navigate = useNavigate();

	const cleanInputs = () => {
		const loginEmailInput = document.getElementById(
			'login-email'
		) as HTMLInputElement;
		loginEmailInput.value = '';
		const loginPasswordInput = document.getElementById(
			'login-password'
		) as HTMLInputElement;
		loginPasswordInput.value = '';
		values.setLoginEmail('');
		values.setLoginPassword('');
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const user = await signInWithEmailAndPassword(
				values.fireAuth,
				values.loginEmail,
				values.loginPassword
			);
			console.log(user.user.email);
			console.log(user);
			values.setIsLoggedIn(true);
			values.setIsLoading(true);
			cleanInputs();
			navigate('/');
		} catch (error) {
			alert(error);
			cleanInputs();
		}
	};

	const HandleReturnHome = () => {
		navigate('/');
	};

	return (
		<div className="login-page-wrapper">
			<Helmet>
				<title>Login</title>
				<meta name="description" content="Login page" />
				<link rel="canonical" href="/login" />
			</Helmet>
			<div className="login-head-text">
				<h4>Log in</h4>
			</div>

			<div className="both-forms-wrapper">
				<div className="one-form-wrapper" id="login-form-wrapper">
					<form
						className="form"
						id="login-form"
						onSubmit={handleLogin}
					>
						<div className="form-email-wrapper">
							<label
								className="form-label-email"
								htmlFor="login-email"
							>
								Email:{' '}
							</label>
							<input
								className="form-input-email"
								id="login-email"
								type="email"
								name="login-email"
								placeholder="Enter email..."
								minLength={6}
								maxLength={50}
								required
								value={values!.loginEmail}
								onChange={(e) =>
									values.setLoginEmail(e.target.value)
								}
							/>
						</div>
						<div className="form-password-wrapper">
							<label
								className="form-label-password"
								htmlFor="login-password"
							>
								Password:{' '}
							</label>
							<input
								className="form-input-password"
								id="login-password"
								type="password"
								name="login-password"
								placeholder="Enter password..."
								minLength={8}
								value={values!.loginPassword}
								onChange={(e) =>
									values.setLoginPassword(e.target.value)
								}
							/>
						</div>
						<div className="button-container">
							<button className="form-button">Log in</button>
						</div>
					</form>
					<div className="return-home-container" id="return-home">
						<button
							className="form-button"
							onClick={HandleReturnHome}
						>
							Return to home page
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
