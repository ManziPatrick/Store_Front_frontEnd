import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';
import EnvironmentPlugin from 'vite-plugin-environment';
import path from 'path';
import dotenev from 'dotenv';

dotenev.config();
export default defineConfig({
	plugins: [react(), reactRefresh(), EnvironmentPlugin('all')],
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
	},
	server: {
		port: Number(3000),
	},
	build: {
		rollupOptions: {
			external: ['dist/assets/index-83123d28.css'],
		},
	},
});
