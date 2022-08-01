import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
export default {
    input: 'src/wrapper.js', // Path relative to package.json
    output: [
        {
          file: 'dist/main.js',
          format: 'umd',
          name: 'main',
          sourcemap: true,
          exports: 'named'
        }
      ],
    plugins: [
        commonjs(),
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
        }),
    ],
};