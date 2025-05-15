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

vi.mock('../../components/VisualModal/StyleContext', () => ({
    useStyle: () => ({
        styles: {
            fontSize: 'standard',
            colorMode: 'light',
            letterInterval: 'standard',
            showImage: true
        },
        open: false,
        setOpen: vi.fn(),
        userEntry: false,
        checkStyle: true
    })
}));

vi.mock('../../components/VisualModal/VisualModal', () => ({
    default: ({ open }) => open ? <div data-testid="visual-modal">Visual Modal</div> : null
}));

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

describe('Home component', () => {
    test('renders main components', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('about-us-section')).toBeInTheDocument();
        expect(screen.getByTestId('second-section')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    test('applies letter spacing based on style context', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        // Correct method: use getByRole or container.querySelector
        const intervalDiv = screen.getByText('', {
            selector: 'div.interval'
        });

        expect(intervalDiv).toHaveStyle('letter-spacing: 1px');
    });
});