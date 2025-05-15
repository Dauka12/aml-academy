import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    assetsInclude: ['**/*.docx', '**/*.xlsx'],
    server: {
        port: 3000
    },
    test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
            reporter: ['text', 'html'],
            reportsDirectory: './coverage',
        },
    },
});