import { ThemeProvider, createTheme } from '@mui/material';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';
import Home from './Home';

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useLocation: () => ({ hash: '' })
    };
});

vi.mock('../../components/header/v2', () => ({
    default: () => <header data-testid="header">Header</header>
}));

vi.mock('../../components/footer/Footer', () => ({
    default: () => <footer data-testid="footer">Footer</footer>
}));

vi.mock('./sections/AboutUsSection', () => ({
    default: () => <section data-testid="about-us-section">About Us Section</section>
}));

vi.mock('./sections/second-section/index', () => ({
    default: () => <section data-testid="second-section">Second Section</section>
}));

const theme = createTheme();

describe('Home component', () => {
    test('renders main components', () => {
        render(
            <ThemeProvider theme={theme}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </ThemeProvider>
        );

        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('about-us-section')).toBeInTheDocument();
        expect(screen.getByTestId('second-section')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
});