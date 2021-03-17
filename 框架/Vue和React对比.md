![image-20210311195806526](D:\你好北邮\前端\fontend_notebook\框架\image-20210311195806526.png)



## Vue 和 React 设计思路

### 1. Vue 和 React 发展历程

- Vue1
- React15
- Vue2
- React16
- Vue3 React17

#### 1.  Vue3 的 options => composition

-  Options方案  API

  上下横跳，代码不集中，难以维护。数据在 data, 方法在 methods 里

- composition API

  - tree-shaking
  - 方便组合，逻辑都是函数，组合优于继承
  - 函数式组件
  - 一个功能一块

  缺点

  - 难看
  - return

#### 2. Vue 的 composition 和 React 的 hooks 的 异同

- hooks 是 有顺序要求的， 每次 render 都会执行
- Vue 是 基于响应式的      vue = 响应式 + vdom (响应式是数据变了通知， vdom 是数据变了不知道，需要算一次diff，才知道变化)
- react 没有响应式，纯纯的 vdom, 计算 diff。计算时间可能太长
- vue 1只有响应式，项目太大了之后，响应式对象太多，会导致卡顿。



### 3. Vue template 和 React jsx

- jsx优缺点
  - 
- template优缺点
  - 限制比较多，方便做优化
  - 不够动态，语法限制
  - 可遍历

ref api



#### 4. Vdom 在 vue 和 react 中的区别？

- 虚拟dom 是什么？
  - 虚拟 dom 是被动计算, 用 js 的 object 来描述  dom 节点
- 虚拟dom存在的意义
  - dom树操作非常耗时
- 虚拟dom 在vue 和 React 中的区别
- 虚拟 dom 杀手锏 （跨端）
  - 

> vue 根据组件划分，组件之间通过响应式通知，组件内部，通过 vdom 计算 diff
>
> 16.6ms 

#### 5. vue diff算法

vue3 最长递增子序列，双端预判 （Vue 会 静态标记，diff 动态节点）



![image-20210311213633597](D:\你好北邮\前端\fontend_notebook\框架\image-20210311213633597.png)

### 2. 二者开发思想和设计思路  PK

### 3. JSX和 template

### 4. 虚拟 dom 在 Vue 和 React 中的区别

### 5. 前端性能优化手段

- 宏观看性能

- Compiler

  react 解析 JSX

- Vdom

- 工程化

![image-20210312204937430](D:\你好北邮\前端\fontend_notebook\框架\image-20210312204937430.png)