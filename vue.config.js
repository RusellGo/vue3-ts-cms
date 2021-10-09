const path = require('path');

// const Components = require('unplugin-vue-components/webpack');
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

module.exports = {
  // 1.配置方式一：CLI提供的属性
  outputDir: './build',
  // 解决打包后文件路径问题
  publicPath: './',
  // 配置方式二：和 webpack 属性完全一致，最后会进行合并
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       components: '@/components'
  //     }
  //   },
  //   module: {
  //     unknownContextCritical: false
  //   },
  //   plugins: [
  //     Components({
  //       resolvers: [ElementPlusResolver()]
  //     })
  //   ]
  // }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   };
  // }
  // 配置方式三：
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('components', '@/components');
  }
};
