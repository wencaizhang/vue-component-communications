const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-component-communications/'
    : '/',

    chainWebpack: (config) => {
      config.resolve.alias
        .set('@$', resolve('src'))
        .set('@utils', resolve('src/utils'))
    },
}
