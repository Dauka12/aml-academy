import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { AuthProvider, useAuth } from './AuthContext';

const mockLocalStorage = (() => {
    let store = {};
    return {
        getItem: vi.fn(key => store[key] || null),
        setItem: vi.fn((key, value) => {
            store[key] = value.toString();
        }),
        clear: vi.fn(() => {
            store = {};
        }),
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage
});

const TestComponent = () => {
    const { isLoggedIn } = useAuth();
    return <div data-testid="logged-in-status">{isLoggedIn.toString()}</div>;
};

describe('AuthContext', () => {
    beforeEach(() => {
        mockLocalStorage.clear();
        vi.clearAllMocks();
    });

    test('initializes with not logged in state when no token exists', () => {
        mockLocalStorage.getItem.mockReturnValue(null);

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(screen.getByTestId('logged-in-status').textContent).toBe('false');
    });

    test('initializes with logged in state when token exists', () => {
        mockLocalStorage.getItem.mockReturnValue('test-token');

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        act(() => {
            expect(screen.getByTestId('logged-in-status').textContent).toBe('true');
        });
    });
});