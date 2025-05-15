import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import App from './App';

// Mock React lazy and Suspense
vi.mock('react', async () => {
    const actual = await vi.importActual('react');
    return {
        ...actual,
        lazy: (factory) => {
            const Component = () => null;
            Component.displayName = 'MockedLazyComponent';
            return Component;
        },
        Suspense: ({ children }) => children,
    };
});

// Mock the VisualModal component
vi.mock('./components/VisualModal/VisualModal', () => ({
    default: () => <div data-testid="visual-modal">Visual Modal</div>
}));

// Mock all required React Router components and hooks
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        // Mock the components
        BrowserRouter: ({ children }) => <div data-testid="browser-router">{children}</div>,
        Routes: ({ children }) => <div data-testid="routes">{children}</div>,
        Route: () => <div data-testid="route"></div>,
        // Mock the hooks
        useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
        useNavigate: () => vi.fn(),
        useParams: () => ({}),
    };
});

// Mock any Redux-related hooks if needed
vi.mock('react-redux', async () => {
    const actual = await vi.importActual('react-redux');
    return {
        ...actual,
        useSelector: vi.fn().mockImplementation(selector => {
            // Mock the store data needed
            const state = {
                music: { isPlaying: false },
                // Add other state data as needed
            };
            return selector(state);
        }),
        useDispatch: () => vi.fn(),
    };
});

// If needed, mock BackgroundMusic component since it appears to be causing issues
vi.mock('./pages/aml-games/components/background-music', () => ({
    default: () => <div data-testid="background-music">Background Music</div>
}));

describe('App Component', () => {
    test('renders without crashing', () => {
        // Add a data-testid to the App container for testing
        render(<App />);

        // Check the router components are rendered
        expect(screen.getByTestId('browser-router')).toBeInTheDocument();
        expect(screen.getByTestId('routes')).toBeInTheDocument();
    });
});