## ES6相关知识

ES6是`ECMAScript2015`，指下一代es语法

### 1.  `let`  和  `const`

- ES6开始，全局变量将逐步与顶层对象脱钩。 **let命令，const命令声明的全局变量，不再属于顶层对象的属性**。而 var，function等声明的全局变量，依旧是顶层对象的属性（window, global）。
- 处于块级作用域，不会变量提升

- ES6声明对象方法（共6种）：
  - var  function  ES5
  - let const import class  新增

### 2. 变量的解构赋值

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

#### 2.1 数组的解构赋值

```javascript
  let [a,b,c] = [1,2,3]; //a=1,b=2,c=3
  let [d,[e,f]] = [4,[5,6]];//d=4,e=5,f=6
  let [h,...j] = [4,5,6,7];// h=4,j=[5,6,7]
  //允许赋值默认值
  let [foo = true] = [] // foo=true
  //ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。
  let [x,y=2] = [1] // y = 2
  let [x,y=2] = [1,undefined] // y=2
  let [x,y=2] = [1,null] // y = null
  //默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
  let [x = 1, y = x] = [];     // x=1; y=1
  let [x = 1, y = x] = [2];    // x=2; y=2
  let [x = 1, y = x] = [1, 2]; // x=1; y=2
  let [x = y, y = 1] = [];     // ReferenceError: y is not defined

```

#### 2.2 对象的解构赋值

​	对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```javascript
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"
//如果解构失败，变量的值等于undefined。
let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined

//对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。
let {max,min} = Math;
console.log(max(1,2,3));//3
console.log(min(1,2,3));//1

```

对象的解构赋值是下面形式的简写:

`let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };`

对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是**后者**，而不是**前者**。

（1）如果要将一个已经声明的变量用于解构赋值，必须非常小心。

> 因为 JavaScript 引擎会将`{x}`理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。

（2）解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。

（3）由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。

```javascript
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
```

#### 2.3 解构赋值用途

**（1）交换变量的值**

```javascript
let x = 1;
let y = 2;

[x, y] = [y, x];
```

**（2）从函数返回多个值**

```javascript
// 返回一个数组

function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```

**（3）函数参数的定义**

```javascript
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

**（4）提取 JSON 数据**

```javascript
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]

```

**（5）遍历 Map 结构**

```javascript
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
```

**（6）输入模块的指定方法**

`const { SourceMapConsumer, SourceNode } = require("source-map");`

### 3. 模板字符串

模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

- 模板字符串可以表示多行字符串
- 变量拼接 :模板字符串中嵌入变量，需要将变量名写在`${}`之中。

### 4. 箭头函数

- **this 是静态的**，this 始终指向**函数声明**时所在作用域下的 this 的值
- 箭头函数不能作为构造函数实例化对象
- 不能使用 `arguments` 变量
- 箭头函数适用于与 this 无关的回调，定时器，数组的方法回调等等；不适合于事件回调，对象的方法

### 5. rest参数

ES5: `arguments` 获取参数

ES6:引入rest方式 `...args`

```javascript
function fn(a,b,...args){
    console.log(args)
}
fn(1,2,3,5,6);
```

### 6. 扩展运算符

『 ...』扩展运算符可以将 **数组** 转换为逗号分隔的 **参数序列**，可以用于数组合并，数组拷贝等等场景

```javascript
const tfbos = ['易烊千玺', '王源','王俊凯 '];
const kuaizi = ['肖央','王太利'];
const res = [...tfbos,...kuaizi];
```

### 7. Symbol

ES6 引入了一种新的原始数据类型`Symbol`，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种是：`undefined`、`null`、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

1. **Symbol 两种创建方式**

   ```javascript
     let s1 = Symbol('xyz');
     let s2 = Symbol('xyz');
     console.log(s1 === s2); // false
     let s3 = Symbol.for('xyz');
     let s4 = Symbol.for('xyz');
     console.log(s3 === s4); // true
   ```

2. **Symbol 不能和其它数据进行运算（包括自己）**

3. **由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符**，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。

   ```javascript
   let mySymbol = Symbol();
   
   // 第一种写法
   let a = {};
   a[mySymbol] = 'Hello!';
   
   // 第二种写法
   let a = {
     [mySymbol]: 'Hello!'
   };
   
   // 第三种写法
   let a = {};
   Object.defineProperty(a, mySymbol, { value: 'Hello!' });
   
   // 以上写法都得到同样结果
   a[mySymbol] // "Hello!"
   ```

4. **Symbol 属性名的遍历**

   Symbol 作为属性名，遍历对象的时候，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回。

   **但是，**它也不是私有属性，有一个`Object.getOwnPropertySymbols()`方法，可以获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

   **此外，**`Reflect.ownKeys()`方法（是一个新的API）可以返回所有类型的键名，包括常规键名和 Symbol 键名。

5. **Symbol内置值**

   > https://wangdoc.com/es6/symbol.html

### 8. 迭代器

JavaScript 原有的表示“集合”的数据结构，主要是数组（`Array`）和对象（`Object`），ES6 又添加了`Map`和`Set`。

遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令`for...of`循环，Iterator 接口主要供`for...of`消费。

- 原生具备iterator接口的数据（可用for....of遍历）

  1. Array
  2. Arguments
  3. Set
  4. Map
  5. String
  6. TypeArray
  7. NodeList

-  工作原理

  （1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

  （2）第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。

  （3）第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。

  （4）不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。

  迭代器的使用：

```javascript
    const xiyou = ['孙悟空','猪八戒','唐僧','沙和尚'];
    let iterator = xiyou[Symbol.iterator]();
    console.log(iterator)
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());

	//自定义遍历数据
    const banji = {
        name:"终极一班",
        stus:[
            "xiaoming",
            "xiaolang",
            "xiaotian",
            "knight"
        ],
        [Symbol.iterator](){
            let index = 0;
            let _this = this;
            return{
                next: function (){
                    if(index < _this.stus.length){
                        const result = {value:_this.stus[index],done:false};
                        index++;
                        //返回结果
                        return result;
                    }else{
                        return {value:undefined,done:true};
                    }

                }
            }
        }
    }
    for(let v of banji){
        console.log(v);
    }
```

> ES遍历方法

#### 8.1 属性的遍历 方法

ES6 一共有 5 种方法可以遍历对象的属性。

**（1）for...in**

`for...in`循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

**（2）Object.keys(obj)**

`Object.keys`返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

**（3）Object.getOwnPropertyNames(obj)**

`Object.getOwnPropertyNames`返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

**（4）Object.getOwnPropertySymbols(obj)**

`Object.getOwnPropertySymbols`返回一个数组，包含对象自身的所有 Symbol 属性的键名。

**（5）Reflect.ownKeys(obj)**

`Reflect.ownKeys`返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

- 首先遍历所有数值键，按照数值升序排列。
- 其次遍历所有字符串键，按照加入时间升序排列。
- 最后遍历所有 Symbol 键，按照加入时间升序排列。

### 9. 生成器

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。

执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

形式上，Generator 函数是一个普通函数，但是有两个特征。一是，`function`关键字与函数名之间有一个星号；二是，函数体内部使用`yield`表达式，定义不同的内部状态（`yield`在英语里的意思就是“产出”）。yield相当于将整段代码分隔成几部分。

`iterator.next(params)` 可以传参数，参数会作为上一次 `yield` 的返回值。

```javascript
    function * gen(){
        console.log("hello generator")
        yield '1';
        yield '2';
        yield '3';
    }
    let iterator = gen();
    iterator.next();
    console.log(iterator.next())
    console.log(iterator.next())
```



**实例**：生成器解决回调地狱问题

```javascript
    function one(){
        setTimeout(()=>{
            console.log(111)
            it.next();
        },1000)
    }
    function two(){
        setTimeout(()=>{
            console.log(2222)
            it.next();
        },2000)
    }
    function three(){
        setTimeout(()=>{
            console.log(3333)
        },3000)
    }
    function * gen2(){
        yield one();
        yield two();
        yield three();
    }
    let it = gen2();
    it.next();
```

### 10. Promise **

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。

- 语法上Promise是一个构造函数，用来封装异步操作并可获取其成功或失败的结果。

`Promise`对象有以下两个特点。

（1）对象的状态不受外界影响。`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是`Promise`这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

**创建Promise实例**

```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

**调用then方法，**返回的结果也是一个Promise对象，对象状态由回调函数的执行结果决定。

```javascript

new Promise((resolve, reject) => {
    fs.readFile('./resources/悯农.md',(err,data) => {
        if(err) reject(err);
        resolve(data);
    })
}).then(value => {
    return new Promise((resolve, reject) => {
        fs.readFile('./resources/静夜思.md',(err, data) => {
            resolve(value + data);
        })
    })
}).then(value => {
    console.log(value)
})
```

```javascript
  new Promise((reslove,reject) => {
    setTimeout(()=>{
      reslove('aaa');
    },1000)
  }).then(data=>{
    return data+'111'
  }).then(data => {
    return data+'222'
  }).then((data)=>{
    console.log(data);
  })
```

**catch方法**

用于**错误**时指定回调函数。相当于 then 只有一个参数。

### 11. Set

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

`Set`本身是一个构造函数，用来生成 Set 数据结构。

1. 实例化

   `const s = new Set()`

2. 方法：

   - add 添加元素
   - delete 删除元素
   - clear 清空元素
   - size 大小

3. 用例

   - 去除数组中的重复成员 `[...new Set(array)]`

   - 去除字符串中的重复字符 `[...new Set('abbabbc')].join('')`

   - 交集

     ```javascript
         let arr1 = [1,2,3,4,5];
         let arr2 = [2,3,4,6,7];
         let result = [...new Set(arr1)].filter(items => new Set(arr2).has(items))
     ```

   - 并集

     ```javascript
     let union = [...new Set([...arr1,...arr2])];
     ```

   - 差集

     ```javascript
     let diff = [...new Set(arr1)].filter(items => !new Set(arr2).has(items))
     ```

   

   

### 12 Map

ES6 提供了 Map  数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object  结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。

**Map的属性和方法：**

- size
- set
- get
- has
- clear
- delete

**创建Map**

`let m = new Map()`

**遍历方法**   

Map 结构原生提供三个遍历器生成函数和一个遍历方法。

- `Map.prototype.keys()`：返回键名的遍历器。
- `Map.prototype.values()`：返回键值的遍历器。
- `Map.prototype.entries()`：返回所有成员的遍历器。
- `Map.prototype.forEach()`：遍历 Map 的所有成员。

### 13 Class 类

>  移步TS笔记文档。

**ES5实现继承**

```javascript
    function Phone(brand,price){
        this.brand = brand;
        this.price = price;
    }
    Phone.prototype.call = function (){
        console.log('这可是手机啊')
    }
    function SmartPhone(brand,price,color){
        Phone.call(this,brand,price)
        this.color = color;
    }
    SmartPhone.prototype = new Phone();
    SmartPhone.prototype.constructor = SmartPhone;
```

### 14. ES 数值扩展

```javascript
    //表示的最小精度
    console.log(Number.EPSILON);
    function equal(a,b){
        //一般认为i，两个数之差小于最小精度就认为是相等了
        return (a-b) < Number.EPSILON;
    }
    console.log(equal(0.1+0.2,0.3));//true
    console.log(0.1+0.2 === 0.3);//false
    //二进制八进制
    let b = 0b1010;
    let o = 0o777;
    let x = 0xff;

    Number.isFinite(100);
    Number.isNaN(123);
    Number.parseInt('123asd');
    Number.parseFloat('123.12lgh');
    Number.isInteger(12.1);
    console.log(Math.trunc(3.1));
    console.log(Math.sign(null));
```

### 15. 对象方法扩展

1. `object.is()` 判断两个值是否完全相等
2. `object.assign(obj1,obj2)`合并两个对象
3. `Object.setPrototypeOf()` `Object.setPrototypeOf`方法的作用与`__proto__`相同，用来设置一个对象的原型对象（prototype），返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。

### 16. ES6 模块化

​	在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6  在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

​	ES6 的模块自动采用严格模式，不管你有没有在模块头部加上`"use strict";`。

**export**



**import**



### 17. ES 7 新特性

1. ```javascript
   const arr = ['西游记','红楼梦','三国演义','水浒传'];
   arr.includes('西游记')
   ```

2. `**` : 幂运算符

### 18 ES8 新特性

- async

ES2017 标准引入了 async 函数，使得异步操作变得更加方便。

async 函数是什么？一句话，它就是 **Generator 函数的语法糖。**

**内置执行器。**所以会执行里面所有的 `await` 语句。

- await 

  

正常情况下，`await`命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。

`await`命令只能用在`async`函数之中，如果用在普通函数，就会报错。

### 19. ES8 对象方法

```
    const school = {
        name:'硅谷',
        cities:['北京','上海']
    }
    console.log(Object.keys(school)) // ["name", "cities"]
    console.log(Object.values(school)) // ["硅谷", Array(2)]
    console.log(Object.entries(school))
    const map = new Map(Object.entries(school))
    console.log(map)
    console.log(Object.getOwnPropertyDescriptor(school,'name'))
```

### 20. ES9 rest新增对象操作

```javascript
    function connect({host,port,...user}){
        console.log(host) // 12
        console.log(port) // 8000
        console.log(user) // {username: "root", passwd: "root"}
    }
    connect({
        host:12,
        port:8000,
        username:'root',
        passwd:'root'
    })
```

对象合并

```javascript
    const obj1 = {
        name:'xxx',
        sex:'男'
    }
    const obj2 = {
        id1:123,
        id2:456
    }
    const obj3 = {
        age:15,
        year:80
    }
    const obj = {...obj1,...obj2,...obj3}
    console.log(obj)// {name: "xxx", sex: "男", id1: 123, id2: 456, age: 15, …}
```

### 21.ES9 正则扩展



```javascript
    let str = '<a href="http://www.atguigu.com">硅谷</a>'
    const reg = /<a href="(.*)">(.*)<\/a>/;
    const res = reg.exec(str)
    console.log(res[1])
    console.log(res[2])
    const reg2 = /<a href="(?<url>.*)">(?<test>.*)<\/a>/;
    const res2 = reg2.exec(str);
    console.log(res2)
    //正向断言 先行断言
    const str2 = '12344你好啊443啊丢';
    const reg3 = /\d+(?=啊)/g
    console.log(reg3.exec(str2))
    //反向断言 后行断言，先匹配括号后的内容，在匹配括号中的
    const reg4 = /(?<=啊)\d+/
    console.log(reg4.exec(str2))
```

**s 修饰符：dotAll 模式**

ES2018 [引入](https://github.com/tc39/proposal-regexp-dotall-flag)`s`修饰符，使得`.`可以匹配任意单个字符。

```javascript

    //dotAll模式： dot: 除换行外的任何字符
    let string = `<ul>
                    <li>
                        <a href="">肖申克</a>
                    </li>
                    <li>
                        <a href="">阿甘正传</a>
                    </li>
                </ul>`
    const reg5 = /<li>.*?<a href="">(.*?)<\/a>/gs
    let result;
    let data = [];
    while(result = reg5.exec(string)){
        data.push(result[1]);
    }
    console.log(data)
```



### 22. ES10 扩展



**ES10 对象扩展方法**

```javascript
Object.fromEntries(map) // 将一个数组转换为对象
//与ES8 Ojbect.entries() 互为逆运算  将一个对象转为数组
```



**ES10 字符串扩展方法**

`trimStart()` 清除左边空格

`trimEnd()` 清除右边空格



**ES10 数组扩展方法**

`arr.flat(n)` 将高维数组转为低维数组  n 为深度， n = 高维数-低维数

`arr.flatMap()`  `是arr.map()`方法的扩展，可以将高维数组转为低维数组



**ES10 Symbol 扩展方法** `Symbol.prototype.description`

```
let s = Symbol('symbol1') 
console.log(s.description) //symbol1
```



### 23.ES11 



**类的私有属性** 

`#name` 定义私有属性



**`Promise.allSettled`**

传入一个Promise的数组，始终只能返回成功！

**`Promise.all`**

传入一个Promise的数组，**所有的Promise都成功**，才返回



**`String.prototype.matchAll`**

数据的批量提取

```javascript
        let string = `<ul>
                    <li>
                        <a href="">肖申克</a>
                    </li>
                    <li>
                        <a href="">阿甘正传</a>
                    </li>
                </ul>`
    const reg5 = /<li>.*?<a href="">(.*?)<\/a>/gs
    const result = string.matchAll(reg5)//直接取出所有匹配字符
    console.log([...result])
```



**可选链操作符**

？

`obj?.stu?.name`

省去了层层判断



**动态`import`**

返回的是一个Promise对象，就是在使用时在引入，提高效率

```javascript
    btn.onclick = function (){
        import('./016_模块化1.js').then(value => {
            console.log(value)
        })
    }
```



`BigInt`

- 表示方法： `let n = 124n`

- 方法： BigInt(123)

```javascript
    let max = Number.MAX_SAFE_INTEGER; //最大安全整数
    console.log(BigInt(max) + BigInt(1)) //9007199254740992n
    console.log(BigInt(max) + BigInt(2)) //9007199254740993n
```



**`globalThis`**

始终指向全局对象