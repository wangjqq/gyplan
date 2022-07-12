const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: 'localhost',
    port: 80, //设置端口
    open: true, // 控制是否自动打开浏览器
    // disableHostCheck: true, //跳过检查host  已遗弃
    historyApiFallback: true,
    allowedHosts: "all"
  },
  publicPath: './', //修改目录
  outputDir: 'gyplan', // build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
  assetsDir: 'assets', // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  filenameHashing: true, // 默认在生成的静态资源文件名中包含hash以控制缓存
  runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: true, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  // CopyWebpackPlugin: ([{
  //   from: path.resolve(__dirname, '../static'),
  //   to: config.build.assetsSubDirectory,
  //   ignore: ['.*']
  // }])

})