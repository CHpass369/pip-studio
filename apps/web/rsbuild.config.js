// @ts-check
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  html: {
    title: 'COTI Presupuestos',
  },
  plugins: [
    pluginReact(),
    pluginSass(),
  ],
  resolve: {
    alias: {
      'components': './src/components',
      'generics': './src/generics',
      'store': './src/store',
      'app': './src/app',
      'administrator': './src/administrator',
    },
  },
  server: {
    host: '0.0.0.0',
    port: 20018,
    historyApiFallback: true,
  },
});

// absolute imports rsbuild
