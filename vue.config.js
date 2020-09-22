const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

const path = require('path');//引入path模块
function resolve(dir) {
  return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}

module.exports = {
  publicPath: "/",
  devServer: {
    port: 8088,
    proxy: "http://localhost:8088"
  },
  chainWebpack: (config) => {
    config.resolve.alias
        .set('@$', resolve('src'))
        .set('@api', resolve('src/api'))
        .set('@assets', resolve('src/assets'))
        .set('@comp', resolve('src/components'))
        .set('@views', resolve('src/views'))

  },

  css: {
    // modules:false,
    // extract:true,
    sourceMap: false,
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  }
}
