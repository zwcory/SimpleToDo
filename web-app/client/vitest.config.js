// vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,              // makes 'describe', 'it', 'expect' global
        environment: 'jsdom',       // simulate browser environment
        setupFiles: ['./setupTests.js'], // points to the setup file (create in step 3)
    },
});
