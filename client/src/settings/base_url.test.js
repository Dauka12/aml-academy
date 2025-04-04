import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('import.meta.env', () => ({
    PROD: false
}));

vi.mocked(import.meta.env, true).PROD = false;

describe('base_url', () => {
    beforeEach(() => {
        vi.resetModules();
        vi.mocked(import.meta.env, true).PROD = false;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('returns development URL when not in production', async () => {
        vi.mocked(import.meta.env, true).PROD = false;

        const { base_url } = await import('./base_url');
        expect(base_url).toBe('http://localhost:8444');
    });

    test('returns production URL when in production', async () => {
        vi.mocked(import.meta.env, true).PROD = true;

        const { base_url } = await import('./base_url');
        expect(base_url).toBe('https://amlacademy.kz');
    });
});