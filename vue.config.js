let path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('common', resolve('src/components/common'))
            .set('network', resolve('src/network'))
            .set('views', resolve('src/views'))

    }
}