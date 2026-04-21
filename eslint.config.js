import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

export default defineConfig([
  ...nextVitals,
  globalIgnores([
    '.next/**',
    'dist/**',
    'node_modules/**',
    '_backup_static/**',
    'src/assets/**',
    'src/components/**',
    'src/pages/**',
    'src/App.jsx',
    'src/index.css',
    'src/main.jsx',
    'src/pdf-data.js',
  ]),
])
