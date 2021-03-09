## AJAX



### 1 什么是 AJAX ？

`AJAX` = 异步 `JavaScript` 和 `XML`。`（Asynchronous JavaScript and XML）`

AJAX 是一种用于创建快速动态网页的技术。

通过在后台与服务器进行少量数据交换，AJAX 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。

传统的网页（不使用 AJAX）如果需要更新内容，必需重载整个网页面。

**优势**

- 可以无需刷新页面与服务器端进行通信
- 允许根据用户事件更新部分页面内容

**劣势**

- 没有浏览历史，不能回退
- 存在跨域问题
- `SEO` 不友好    Ajax获取的内容是通过js显示到页面的，不能被爬虫到

#### HTTP

HTTP（hypertext transport protocol ）协议，超文本传输协议，协议规定了浏览器和万维网服务器之间相互通信的规则。

##### 请求报文

- ##### 请求行

  -  GET POST  HTTP/1.1

- ##### 请求头部 

  - HOST:xxx
  - Cookie:xxx

- ##### 空行

- ##### 请求数据(主体)

##### 响应报文

- ##### 状态行，由HTTP协议版本号， 状态码， 状态消息 三部分组成。HTTP/1.1 200 OK

- ##### 消息报头，用来说明客户端要使用的一些附加信息

- ##### 空行，消息报头后面的空行是必须的

- ##### 响应正文(主体)，服务器返回给客户端的文本信息。

### 2 AJAX的使用

- 安装 服务端框架 `npm i express`
- 建立服务端

```javascript
const express = require('express')

const app = express();

app.get('/server',(req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.send('Hello Ajax');
});
app.listen(8000,()=>{
    console.log("服务器已启动")
})
```

#### ajax 使用步骤

1. 1. **【创建对象】**Ajax的所有操作都是基于对象进行的，所以要先创建  `XMLHttpRequest`  对象 。
   2. **【设置请求信息】**用 `open` 方法对对象初始化，设置请求方法和 `url` 。
   3. **【设置请求头信息】**如果需要，可用 `setRequestHeader()` 设置请求头。
   4. **【设置发送信息】**用 `send` 方法 ，发送请求。如果请求为 GET，`send `方法不用传参数。
   5. **【设置接收方法】**返回结果的处理方法存储在 `onreadystatechange` 属性。

1. 1. 1. **【判断对象状态**】对象状态 `readystate` 有 `1,2,3,4` 四个值，最终状态 `4` 是成功值。
      2. **【判断响应码**】判断响应状态码 `status` 是否是 2 开头。

1. 1. 1. - **是，**对数据进行获取。

1. 1. 1. 1. 1. **行** - `status` `statusText`
            2. **头** - `getAllResponseHeaders()`
            3. **体** - `response`

1. 1. 1. - **否，**进行错误处理。

```javascript
		//1. 创建对象
        const xhr = new XMLHttpRequest();
        //设置响应体数据的类型,也可以手动转换
        xhr.responseType = "json";
        //2. 初始化请求方法和url
        xhr.open('POST','http://127.0.0.1:8000/server/post');
        //3. 设置请求头部信息
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        //4. 设置发送信息
        let data = event.key ;
        xhr.send(data);
        //5. 设置接收方法
        xhr.onreadystatechange = function (result){
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status < 300){
                    console.log(xhr.response)
                    box1.innerHTML = xhr.response;
                }
            }
        }
```

#### IE缓存问题

IE浏览器会对ajax请求结果作为**缓存**

解决办法，加时间戳。

```javascript
xhr.open('GET','http://127.0.0.1:8000/ie?t=' + Date.now());
```

#### AJAX超时与异常处理

```javascript
//设置超时时间
xhr.timeout = 5000;
//超时回调
xhr.ontimeout = function (){
    alert('请稍后重试')
}
//网络异常回调
xhr.onerror = function (){
    alert('网络异常')
}
```

```Javascript
//取消请求
xhr.abort();
```

### 3 AXIOS

Axios 是一个基于 promise 的 HTTP 库,可以用在浏览器和 Node.js 中。

```javascript
axios({
            method:'POST',
            url:'/ie',
            params:{
                vip:'1',
                level:30
            },
            headers:{
                a:1,
            },
            data:{
                name:'xyz',
                id:123
            }
        }).then(data => {
            console.log(data)
            //响应状态码
            console.log(data.status)
            //响应字符串
            console.log(data.statusText)
            //响应头
            console.log(data.headers)
            //响应体
            console.log(data.data)
        })
```

### 4 Fetch

是一个全局函数，也基于Promise

`declare function fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;`

```javascript
        fetch('http://127.0.0.1:8000/ie',{
            method:'POST',
            headers:{
                a:1,
                b:2
            },
            body:'x=1&y=2'
        }).then(data => {
            return data.text();
        }).then(data => {
            console.log(data)
        });
```

### 5 跨域

同源策略由 Netscape 公司提出，是浏览器的一种安全策略。

- 协议

- 域名

- 端口

  同源： 上述三者完全一致，否则就是跨域

  

#### 5.1 JSONP

`JSON(JSON with padding)` 是一个非官方的跨域解决方案，只支持 `get` 请求

`JSONP` 借助 `script` 来实现跨域 ， 服务器会返回一段 js 代码



#### 5.2 CORS

跨域资源共享，是官方跨域的解决方案，支持 `get,post` 请求。

跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器收到该响应以后就会对响应放行。

```javascript
  	res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader("Access-Control-Allow-Headers",'*');
    res.setHeader("Access-Control-Allow-Method",'*');
```

