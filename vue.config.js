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
}
