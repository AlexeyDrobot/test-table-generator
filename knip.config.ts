import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['src/main.tsx'],
  project: ['src/**/*.{ts,tsx}', 'eslint.*.{js,ts}'],
  ignore: [
    'dist/**',
    'node_modules/**',
    'docs/**',
    'README.md',
    'src/vite-env.d.ts',
  ],
  ignoreDependencies: ['tailwindcss'],
};

export default config;
