const webpack = require('webpack')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const path = require('path')

module.exports = {
  publicPath: '/',

  devServer: {
    proxy: 'http://localhost:8000/',
    historyApiFallback: {
      disableDotRule: true
    }
  },

  configureWebpack: config => {
    // Add plugins
    config.plugins = [
      ...(config.plugins || []),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      })
    ]

    // Add prerender plugin only in production
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          routes: ['/', '/business']
        })
      )
    }

    // Merge resolve config safely
    config.resolve = {
      ...(config.resolve || {}),
      alias: {
        ...(config.resolve?.alias || {}),
        vue$: 'vue/dist/vue.common.js',
        '@': path.resolve(__dirname, 'src')
      }
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
