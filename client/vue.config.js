const webpack = require('webpack')
const path = require('path')

module.exports = {
    lintOnSave: false,
    publicPath: process.env.VUE_BASE_URL || '/',
    productionSourceMap: false,
    configureWebpack: {
        module: {
            // Fix for flot resize
            rules: [{
                test: /jquery\.flot\.resize\.js$/,
                use: 'imports-loader?this=>window'
            }]
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jquery: 'jquery',
                'window.jQuery': 'jquery',
                jQuery: 'jquery'
            })
        ],
        resolve: {
            alias: {
                vue$: path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.esm.js'),
            },
        }
    },
    transpileDependencies: [
        'resize-detector' // vue-echarts
    ]
}
