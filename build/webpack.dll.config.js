var path = require("path");
var webpack = require("webpack");
var package = require('../package.json')

var vendor = Object.keys(package.dependencies)
vendor = vendor.filter(v => v !== 'vue' && v !== 'ant-design-vue')
vendor.push('vue/dist/vue.esm.js')
vendor.push('ant-design-vue')
console.log(vendor)
module.exports = {
  // 你想要打包的模块的数组
  entry: {
    vendor: vendor
  },
  output: {
    path: path.join(__dirname, '..', 'static/js'), // 打包后文件输出的位置
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    }),
    // 压缩打包的文件，与该文章主线无关
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
