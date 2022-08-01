import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from '@rollup/plugin-buble'; // Transpile/polyfill with reasonable browser support
export default {
    input: 'src/wrapper.js', // Path relative to package.json
    output: [
        {
          file: 'dist/main.js',
          format: 'esm',
          plugins: [getBabelOutputPlugin({ presets: ['@babel/preset-env'] })]
        }
      ],
    plugins: [
        commonjs(),
        babel({ babelHelpers: 'bundled' }),
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
        }),
        buble(), // Transpile to ES5
    ],
};