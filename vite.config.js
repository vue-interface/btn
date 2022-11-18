import { babel } from '@rollup/plugin-babel';
import vue from '@vitejs/plugin-vue';
import { pascalCase } from "change-case";
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { name } from './package.json';

const filename = name.split('/')[1];

export default defineConfig({
    optimizeDeps: {
        exclude: ['@vue-interface/activity-indicator']
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'index.ts'),
            name: pascalCase(filename),
            fileName: (format) => `${filename}.${format}.js`,
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                assetFileNames: ({ name }) => {
                    if(name === 'style.css') {
                        return `${filename}.css`;
                    }
    
                    return name;
                },
                globals: {
                    vue: 'Vue'
                },
            },
            plugins: [
                babel({
                    babelHelpers: 'bundled'
                })
            ]
        },
        watch: !process.env.NODE_ENV && {
            include: [
                './tailwindcss/**/*.js'
            ]
        }
    },
    plugins: [
        vue(),
        dts()
    ],
});
