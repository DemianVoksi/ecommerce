import React from 'react';
import './login.css';

export const Login = () => {
	return (
		<div className='login-page-wrapper'>
			<div className='login-head-text'>
				<h4>Some text</h4>
			</div>

			<div className='both-forms-wrapper'>
				<div className='one-form-wrapper' id='register-form-wrapper'>
					<form className='form' id='register-form' /* onSubmit={funkcija} */>
						<p>Register</p>
						<div className='form-email-wrapper'>
							<label className='form-label-email' htmlFor='register-email'>
								Email:{' '}
							</label>
							<input
								className='form-input-email'
								type='email'
								name='register-email'
								placeholder='Enter email...'
								minLength={7}
								maxLength={50}
								required
								/* value={value.registerEmail}*/
								/*onChange={(e) => value.setRegisterEmail(e.target.value)}*/
							/>
						</div>
						<div className='form-password-wrapper'>
							<label
								className='form-label-password'
								htmlFor='register-password'
							>
								Password:{' '}
							</label>
							<input
								className='form-input-password'
								type='password'
								name='register-password'
								placeholder='Enter password...'
								/*value={value.registerPassword}*/
								/*onChange={(e) => value.setRegisterPassword(e.target.value)}*/
							/>
						</div>
						<div className='button-container'>
							<button className='form-button' type='submit'>
								Register
							</button>
						</div>
					</form>
				</div>

				<div className='one-form-wrapper' id='login-form-wrapper'>
					<form className='form' id='login-form' /* onSubmit={funkcija} */>
						<p>Login</p>
						<p>Log in</p>
						<div className='form-email-wrapper'>
							<label className='form-label-email' htmlFor='login-email'>
								Email:{' '}
							</label>
							<input
								className='form-input-email'
								type='email'
								name='login-email'
								placeholder='Enter email...'
								minLength={7}
								maxLength={50}
								required
								/*value={value.loginEmail}*/
								/*onChange={(e) => value.setLoginEmail(e.target.value)}*/
							/>
						</div>
						<div className='form-password-wrapper'>
							<label className='form-label-password' htmlFor='login-password'>
								Password:{' '}
							</label>
							<input
								className='form-input-password'
								type='password'
								name='login-password'
								placeholder='Enter password...'
								/*value={value.loginPassword}*/
								/*onChange={(e) => value.setLoginPassword(e.target.value)}*/
							/>
						</div>
						<div className='button-container'>
							<button className='form-button'>Log in</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
