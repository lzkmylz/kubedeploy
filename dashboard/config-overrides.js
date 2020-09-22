const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy,
  addExternalBabelPlugin,
  overrideDevServer,
  watchAll
} = require('customize-cra');

const devServerConfig = () => config => {
  return {
    ...config,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      }
    }
  }
}

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: "css",
    }),
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          '@font-family':
            "'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
        }
      }
    }),
    addDecoratorsLegacy(),
    addExternalBabelPlugin('@babel/plugin-transform-async-to-generator')
  ),
  devServer: overrideDevServer(
    devServerConfig()
  )
};