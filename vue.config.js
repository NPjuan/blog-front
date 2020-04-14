const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports={
  assetsDir:'static',
  publicPath:'./',

  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: "http:192.168.0.1:8080",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
    },
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/assets/styles/variables.scss')
      ]
    }
  },
  chainWebpack: config => {
    // 设置快捷路径， @ 表示 'src' ，components 表示 'src/components'
    config.resolve.alias
      // .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
  },
}
