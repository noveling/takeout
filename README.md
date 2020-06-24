# mytakeout

> A Vue.js project

## 前言

这是一个用Vue仿写的外卖项目(用户端)，用vue-cli@2.0搭建的项目框架。
项目中运用了Vue中的大部分知识。(包含vuex、vue-router)。
项目中的数据由本地mockjs模拟。

## 功能说明

- 购物车(支持对商品状态管理)
  - 添加商品到购物车
  - 移除商品从购物车
  - 显示消费信息
- 商品列表(支持滚动显示)
- 用户评论(支持评论信息筛选)
- 显示商品详情
- 添加动画小球

## 技术栈

*  vue-cli
*  vue2
*  vue-router
*  vuex
*  stylus
*  webpack2
*  better-scroll
*  postcss-px-to-viewport
*  fastclick
*  iconfont
*  mockjs
*  axios

## 目录结构

``` bash
├── src                          
│   ├── assets                   // 静态资源
│   ├── components               // 全局组件
│   │   ├── common               // 公共组件
│   │   └── content              // 项目组件
│   ├── mock                     // 模拟网络请求
│   ├── network                  // 网络请求
│   │   └── api                  // 请求接口
│   ├── view                      
│   │   └── content              // 内容页面
│   │       └── page             // 子页面
│   ├── router                   // 路由
│   ├── store                    // 状态管理
│   ├── App.vue
│   └── main.js



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
