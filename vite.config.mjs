import { defineConfig } from 'vite'
import { ectPlugin } from './plugins/vite-plugin-ect.mjs'
import { roadrollerPlugin } from './plugins/vite-plugin-roadroller.mjs'
import babel from 'vite-plugin-babel'

/**
 * Environment flags:
 *
 * USE_RR_CONFIG=1 - use existing roadroller config ('readroller-config.json').
 */

const babelConfig = {
  babelrc: false,
  configFile: false,
  plugins: ['babel-plugin-syntax-hermes-parser'],
  presets: ['@babel/preset-flow']
}

/**
 * mode - 'development', 'production'
 * command - 'build', 'serve'
 * isSsrBuild - boolean
 * isPreview - boolean
 */
export default defineConfig(props => {
  switch (props.command) {
    case 'build':
      return {
        build: {
          minify: true,
          target: 'es2020',
          modulePreload: { polyfill: false },
          assetsInlineLimit: 800,
          assetsDir: '',
          rollupOptions: {
            output: {
              assetFileNames: '[name][extname]',
              inlineDynamicImports: true
            }
          }
        },
        esbuild: true,
        plugins: [babel({ babelConfig }), roadrollerPlugin(), ectPlugin()]
      }

    default:
      return {
        plugins: [babel({ babelConfig })]
      }
  }
})
