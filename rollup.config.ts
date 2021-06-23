/* eslint-disable import/no-extraneous-dependencies */
import babel from '@rollup/plugin-babel';
import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';

export default defineConfig([
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.es.js',
                format: 'es',
            },
            {
                file: 'dist/index.cjs.js',
                format: 'cjs',
            },
        ],
        plugins: [
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**',
                extensions: ['.ts'],
            })
        ]
    },
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.d.ts',
                format: 'es',
            },
        ],
        plugins: [dts()],
    },
]);
