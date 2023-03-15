import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { SiteContext } from '../../utils/ContextProvider';
import './loginAndRegister.css';

export const RegisterPage = () => {
	const values = React.useContext(SiteContext)!;
	const navigate = useNavigate();

	const cleanInputs = () => {
		const registerEmailInput = document.getElementById(
			'register-email'
		) as HTMLInputElement;
		registerEmailInput.value = '';
		const registerPasswordInput = document.getElementById(
			'register-password'
		) as HTMLInputElement;
		registerPasswordInput.value = '';
		values.setRegisterEmail('');
		values.setRegisterPassword('');
	};

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const newUser = await createUserWithEmailAndPassword(
				values.fireAuth,
				values.registerEmail,
				values.registerPassword
			);
			values.setIsLoggedIn(true);
			cleanInputs();
			navigate('/');
			values.createNewCart(values.registerEmail);
			return newUser;
		} catch (error) {
			cleanInputs();
			alert(error);
		}
	};

	const HandleReturnHome = () => {
		navigate('/');
	};

	return (
		<div className="login-page-wrapper">
			<Helmet>
				<title>Register</title>
				<meta name="description" content="Register page" />
				<link rel="canonical" href="/register" />
			</Helmet>
			<div className="login-head-text">
				<h4>Register a new account</h4>
			</div>

			<div className="both-forms-wrapper">
				<div className="one-form-wrapper" id="register-form-wrapper">
					<form
						className="form"
						id="register-form"
						onSubmit={handleRegister}
					>
						<p className="form-title-p">Register</p>
						<div className="form-email-wrapper">
							<label
								className="form-label-email"
								htmlFor="register-email"
							>
								Email:{' '}
							</label>
							<input
								className="form-input-email"
								id="register-email"
								type="email"
								name="register-email"
								placeholder="Enter email..."
								minLength={6}
								maxLength={50}
								required
								value={values!.registerEmail}
								onChange={(e) =>
									values.setRegisterEmail(e.target.value)
								}
							/>
						</div>
						<div className="form-password-wrapper">
							<label
								className="form-label-password"
								htmlFor="register-password"
							>
								Password:{' '}
							</label>
							<input
								className="form-input-password"
								id="register-password"
								type="password"
								name="register-password"
								placeholder="Enter password..."
								minLength={8}
								value={values!.registerPassword}
								onChange={(e) =>
									values.setRegisterPassword(e.target.value)
								}
							/>
						</div>
						<div className="button-container">
							<button className="form-button" type="submit">
								Register
							</button>
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
