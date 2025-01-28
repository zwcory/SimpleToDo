import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        https: true, // Force HTTPS in development
    },
    plugins: [react()], // Add React plugin to handle JSX
});
