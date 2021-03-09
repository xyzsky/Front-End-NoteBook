## TS基本知识

学习来源：尚硅谷 `TypeScript` 教程（李立超老师）

### 1. TS是什么？

- 以 `javascript` 为基础构建的语言，是一个 `JavaScript` 的超集。

- `typescript` 扩展了 `JavaScript`，并添加了类型，可以在任何支持`JavaScript` 的平台中执行

- `TS` 不能被`JS`解析器直接执行，需要将 `TS` 代码进行编译

**TS增加了什么？**

- 类型
- `ES`新特性
- `ES`不具备的新特性
- 丰富的配置选项
- 强大的开发工具

**安装**

`npm i -g typescript` 

编译： `tsc xxx.ts`

### 2. TS基本类型

| 类型    | 例子           | 描述                           |
| ------- | -------------- | ------------------------------ |
| number  | 1,10,111       | 数字类型                       |
| string  | 'wo','who'     | 字符串类型                     |
| any     | 1,true,'where' | 任意类型（尽量不用）           |
| unknown | *同上          | 类型安全的unknown              |
| 字面量  | 其本身         | 限制变量就是该字面量的值       |
| void    | 空值           | 没有值（或undefined）          |
| never   | 没有值         | 不能是任何值                   |
| object  | {name:'xxx'}   | 任意的JS对象                   |
| array   | [1,2]          | 任意的JS数组                   |
| tuple   | [1,2,3]        | 元组，TS新增类型，固定长度数组 |
| enum    | enum(a,b)      | 枚举，TS中新增类型             |

```typescript
//使用示例
let a:number;
a = 1;
let b :any;
b = 1;
b = true;
b = "string";
b = {name : 'xx'};
//字面量
let c = false;
c  = 123;
//unknown
let e : unknown;
e = 13;
a = e as number;
a = <number>e;
console.log(a)
//void
function foo1():void{
    return null;
}
//never
function foo2():never{
    throw new TypeError("类型返回错误")
}
//object
let obj1 :{name:string,[propname:string]:any}
obj = {"name":'xyz',sex:1,tel:'phone'}
//function
let foo3: (a:number,b:number) => number;
//array:不定长
let arr1 : Array<number | string | boolean>
arr1 = [1,"1",false,true]
let arr2: number[]
arr2 = [1,2,3,4,5,6,7]
//tuple ： 定长
let tup :[number,string]
tup = [1,"1"]
//enum
enum sex {
    male,
    female
}
//type 类型的别名
type mytype = [1,2,3,4,5,6];
let arr3 = mytype
let arr4 = mytype
//type强制转换
as
```

### 3. TS编译选项

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es2015", //版本
    "sourceMap": true,
    "outDir": "./dist",
//    "strictNullChecks": true 所有严格检查的总开关
    //    "alwaysStrict": true 设置编译后的文件是否使用严格模式
    //    "strictNullChecks": true 严格的检查所有空值
    //    "noImplicitThis": true 不允许使用不明确的this
    //    "noImplicitAny": true 不允许隐式any
    //    "alwaysStrict": true 严格模式
    //    "noEmitOnError": true 当有错误时不生产编译文件
    //    "noEmit": true 不生成编译后的文件
    //    "removeComments": true  是否移除注释
    //    "checkJs": true 检查JS语法是否符合规范
    //    "allowJs": true
    //    "outFile": "./bundle.js" 合并为一个文件
    //    "lib": ["xz"]
  },
  "exclude": [
    "node_modules"
  ],
  "include": ["./*"]
}
```

### 4. webpack 打包TS

1. `npm init`

2. `npm i -D webpack webpack-cli typescript ts-loader`

3. html 插件 `npm i -D html-webpack-plugin`
4.  清空之前的打包文件 `npm i -D clean-webpack-plugin`
5. 引入Babel, 兼容不同版本的浏览器 `npm i -D @babel/core @babel/preset-env babel-loader core-js `

```javascript
const path = require('path');
const HtmpWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    //指定入口文件
    entry: "./src/index.ts",
    mode:"development",
    //指定输出目录
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: "bundle.js",
        environment:{
            arrowFunction: false
        },
    },
    //指定打包时需要使用的模块
    module: {
        rules: [
            {
                test:/\.ts$/,
                use:[
                    {
                        //指定加载器
                        loader:"babel-loader",
                        //设置babel
                        options: {
                            //设置预定义环境
                            presets:[
                                    //指定环境的插件
                                    ["@babel/preset-env",
                                    //配置信息
                                    {
                                        //要兼容的浏览器
                                        targets:{
                                            "chrome":"87",
                                            "ie":"11"
                                        },
                                        //指定corejs版本
                                        "corejs":"3",
                                        //使用corejs的方式表示按需加载
                                        "useBuiltIns":"usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader',
                ],
                exclude: /node-modules/
            }
        ]
    },
    //配置webpack插件
    plugins:[
        new CleanWebpackPlugin(),
        new HtmpWebpackPlugin({
            // title:'xyz',
            template:'./src/index.html'
        }),
    ],
    //用来设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    }
}
```

### 5. TS——面向对象

- TS是一门面向对象的语言，其编程思想是将一件事情划分为几个模块对象，分别解决。

  #### 5.1 TS——类

  ```typescript
  //定义类
  class Person{
      name: string;
      food:string;
      strength:number=0;
      //构造函数
      constructor() {
          this.name = '123';
          this.food = '米饭'
      }
      eat(){
          console.log(this.food);
      }
  }
  //实例化
  const person = new Person();
  person.eat();
  
  //类的继承
  class Man extends Person{
      constructor(strength:number) {
          //实现父类的构造函数
          super();
          this.strength = strength;
      }
  }
  const man = new Man(1);
  console.log(man.strength)
  
  //抽象类--里面的方法可以不实现，交由子类实现。不可以直接实例化
  abstract class Person{
      name: string;
      food:string;
      strength:number=0;
      constructor() {
          this.name = '123';
          this.food = '米饭'
      }
      abstract eat():void;
  }
  class Man extends Person{
      constructor(strength:number) {
          super();
          this.strength = strength;
      }
  
      eat(): void {
          console.log(this.food)
      }
  }
  const man = new Man(1);
  man.eat();
  
  //接口，接口所提供的是一系列的抽象方法或属性。所有的均在子类实现。一般定义公共的东西
  interface Perhave{
      do():void;
      age:number;
  }
  class Man extends Person implements Perhave{
      age: number; //必须实现age
      constructor(strength:number) {
          super();
          this.age = 20;
          this.strength = strength;
      }
  
      eat(): void {
          console.log(this.food)
      }
  
      do(): void {
          //子类必须实现do方法
          console.log("睡觉啊")
      }
  }
  ```

  #### 5.2 属性封装

  类中的属性可以定义为3种类型

  - `public` 公共属性， 访问不受限制
  - `private` 私有属性，只有本类中可以访问
  - `protected`保护属性，本类或子类中可以访问

  属性封装，意味着将属性设置为 `private` 或 `protected` 类型，防止外部随意对属性修改。

  属性封装后，可以实现 `set get` 方法，实现对属性的获取和修改。

  ```typescript
  class Person{
      private name: string;
      constructor() {
          this.name = '123';
      }
      set Name(name:string){
          this.name = name;
      }
      get Name(){
          return this.name;
      }
  }
  const person = new Person();
  console.log(person.name); //错误，不可访问
  console.log(person.Name); //正确，通过get方法获取
  ```

  #### 5.3 泛型

  泛型：可以根据输入类型进行适应的类型。

  ```typescript
  function foo<T>(name:T){
      console.log(name);
  }
  foo(1);
  foo(person);
  foo('123');
  foo(true)
  ```

  