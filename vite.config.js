import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				background: 'src/background.js',
				content: 'src/content.js'
			},
			output: {
				entryFileNames: `[name].js`,
				chunkFileNames: `[name].js`,
				assetFileNames: `[name].[ext]`,
				dir: 'dist/',
			}
		},
		// Disable hashing for filenames
		assetFileNames: `[name].[ext]`,
	}
});
