## Webpack

Webpack是前端常用的一个模块化打包工具！

webpack 支持所有符合 [ES5 标准](https://kangax.github.io/compat-table/es5/) 的浏览器

### 1. Webpack 的五个核心概念

- Entry

  入口指示 `webpack` 以哪个文件为入口起点开始打包，分析构建内部依赖图。

- Output

  输出`Output` 指示 `Webpack` 打包后的资源 `bundles` 输入到哪里去，以及如何命名

- Loader

  webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力，Loader 可以使 Webpack 能够处理那些非 javascript 文件（如 ts, css）

- Plugins

  loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

- Mode

  模式指示 Webpack 使用时响应模式的配置。

  development , production(代码优化上线),none

### 2.优化

HMR: `Hot Module Replacement` 功能

- 一个模块发生变化，只会重写打包这一个模块，而不是打包所有模块，极大地提升构建速度。

优化打包构建速度

- OneOf
- babel缓存
- 多进程打包
- externals 
- dll

优化代码运行的性能

- 缓存（hash-chunkhash-contenthash）
- hash - webpack 每次打包都会生成一个hash值
- chunkhash， 根据入口
- contenthash 根据内容生产hash值

- tree shaking（树摇） 去除没有使用的模块，es6
- code split
- 懒加载/预加载
- pwa 离线也可也访问