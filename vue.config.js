const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports={
  assetsDir:'static',
  publicPath:'./',

  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      // 配置代理不可以改变axios的baseURL,优先级不够高
      '/api': {
        target: "http://localhost:3000",
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
