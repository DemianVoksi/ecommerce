import { render, screen } from '@testing-library/react';
import { ContextProvider } from '../../utils/ContextProvider';
import { LoggedInButtons } from './LoggedInButtons';

// mock useNavigate
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUsedNavigate
}));

// tests
describe('logged in buttons tests', () => {
	test('log out button renders', () => {
		render(
			<ContextProvider>
				<LoggedInButtons />
			</ContextProvider>
		);
		const buttonElement = screen.getByRole('button', {
			name: 'Log out'
		});
		expect(buttonElement).toBeInTheDocument();
	});

	test('profile page button renders', () => {
		render(
			<ContextProvider>
				<LoggedInButtons />
			</ContextProvider>
		);
		const buttonElement = screen.getByRole('button', {
			name: 'Profile page'
		});
		expect(buttonElement).toBeInTheDocument();
	});
});
