const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
    devServer: {
        proxy: 'http://localhost:8081'
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
    }
}