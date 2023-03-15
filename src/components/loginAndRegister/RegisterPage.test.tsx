import { render, screen } from '@testing-library/react';
import { ContextProvider } from '../../utils/ContextProvider';
import { RegisterPage } from './RegisterPage';

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
describe('Register page tests', () => {
	test('register email input renders correctly', () => {
		render(
			<ContextProvider>
				<RegisterPage />
			</ContextProvider>
		);
		const inputField = screen.getByRole('textbox', {
			name: 'Email:'
		});
		expect(inputField).toBeInTheDocument();
	});

	test('register password input renders correctly', () => {
		render(
			<ContextProvider>
				<RegisterPage />
			</ContextProvider>
		);
		const inputField = screen.getByText('Password:');
		expect(inputField).toBeInTheDocument();
	});
});
