import { render, screen } from '@testing-library/react';
import { ContextProvider } from '../../utils/ContextProvider';
import { LoginPage } from './LoginPage';

// mock useNavigate
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUsedNavigate
}));

// mock react-helmet-async
jest.mock('react-helmet-async', () => ({
	Helmet: () => jest.fn(),
	HelmetProvider: () => jest.fn()
}));

// tests
describe('Login page tests', () => {
	test('login email input renders correctly', () => {
		render(
			<ContextProvider>
				<LoginPage />
			</ContextProvider>
		);
		const inputField = screen.getByRole('textbox', {
			name: 'Email:'
		});
		expect(inputField).toBeInTheDocument();
	});

	test('login password input renders correctly', () => {
		render(
			<ContextProvider>
				<LoginPage />
			</ContextProvider>
		);
		const inputField = screen.getByText('Password:');
		expect(inputField).toBeInTheDocument();
	});
});
