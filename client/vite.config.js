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
        environment: 'jsdom', // Use jsdom to simulate a browser environment
        coverage: {
            reporter: ['text', 'html'], // Output coverage in text and HTML formats
            reportsDirectory: './coverage', // Directory to save coverage reports
        },
    },
});