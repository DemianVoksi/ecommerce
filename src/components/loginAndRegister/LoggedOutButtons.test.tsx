import { render, screen } from '@testing-library/react';
import { ContextProvider } from '../../utils/ContextProvider';
import { LoggedOutButtons } from './LoggedOutButtons';

// mock useNavigate
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUsedNavigate
}));

// tests
describe('logged out buttons tests', () => {
	test('log in button renders', () => {
		render(
			<ContextProvider>
				<LoggedOutButtons />
			</ContextProvider>
		);
		const buttonElement = screen.getByRole('button', {
			name: 'Log in'
		});
		expect(buttonElement).toBeInTheDocument();
	});

	test('register button renders', () => {
		render(
			<ContextProvider>
				<LoggedOutButtons />
			</ContextProvider>
		);
		const buttonElement = screen.getByRole('button', {
			name: 'Register'
		});
		expect(buttonElement).toBeInTheDocument();
	});
});
