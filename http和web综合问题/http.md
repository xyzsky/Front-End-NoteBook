## Http相关知识



### 1. HTTP的几种请求方法用途

- GET 方法
  - 发送一个请求来取得服务器上的某一资源
-  POST 方法
  - 向 URL 指定资源提交数据或附加新的数据
-  PUT 方法
  - 与 POST 方法相像，向服务器提交数据。但是，PUT 方法会指定资源在服务器上的位置，而 POST 方法不会
- HEAD 方法
  - 只请求页面的首部
- DELETE 方法
  - 删除服务器上的某些资源
- OPTIONS 方法
  - 它用于获取当前 `URL` 所支持的方法。如果请求成功，会有一个 `Allow` 的头包含类似 `"GET,POST"` 这样的信息
- TRACE 方法
  - TRACE 方法被用于激发一个远程的，应用层的请求消息回路（TRACE方法让客户端测试到服务器的网络通路，回路的意思如发送一个请返回一个响应， 这就是一个请求响应回路）
- CONNECT 方法
  - 把请求连接转换到透明的 TCP/IP通道

### 2. HTTP 状态码及其含义

- 1XX：信息状态码
  - `100 Continue`   继续，一般在发送`post`请求时，已发送了`http header`之后服务端将返回此信息，表示确认，之后发送具体参数信息
  
- 2XX：成功状态码
  - `200 OK`         正常返回信息
  - `201 Created`   请求成功并且服务器创建了新的资源
- `202 Accepted`   服务器已接受请求，但尚未处理
  
- 3XX：重定向
  - `301 Moved Permanently`  请求的网页已永久移动到新位置。
  - `302 Found`     临时性重定向。
- `303 See Other`  临时性重定向，且总是使用 `GET` 请求新的 `URI`。
  - `304 Not Modified` 自从上次请求后，请求的网页未修改过。

- 4XX：客户端错误
  - `400 Bad Request` 服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
  - `401 Unauthorized` 请求未授权。
- `403 Forbidden`  禁止访问。
  - `404 Not Found`   找不到如何与 `URI` 相匹配的资源。
- `405 Request method not supported` 请求方法不支持
  
- 5XX: 服务器错误
  - `500 Internal Server Error`  最常见的服务器端错误。
  - `503 Service Unavailable` 服务器端暂时无法处理请求（可能是过载或维护）。
  - `505 HTTP Version Not Supported` 版本不支持

### 3. HTTP request报文结构是怎样的 ASCII码形式，刻可读

1. 首行是**Request-Line**包括：**请求方法**，**请求URI**，**协议版本**，**CRLF**
2. 首行之后是若干行**请求头**，包括**general-header**，**request-header**或者**entity-header**，每个一行以CRLF结束
3. 请求头和消息实体之间有一个**CRLF分隔**                      **空行！！！**
4. 根据实际请求需要可能包含一个**消息实体** 一个请求报文例子如下：

```
GET /Protocols/rfc2616/rfc2616-sec5.html HTTP/1.1
Host: www.w3.org
Connection: keep-alive
Cache-Control: max-age=0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36
Referer: https://www.google.com.hk/
Accept-Encoding: gzip,deflate,sdch
Accept-Language: zh-CN,zh;q=0.8,en;q=0.6
Cookie: authorstyle=yes
If-None-Match: "2cc8-3e3073913b100"
If-Modified-Since: Wed, 01 Sep 2004 13:24:52 GMT

name=qiu&age=25
```

### 4.  HTTP response报文结构是怎样的

- 首行是状态行包括：**HTTP版本，状态码，状态描述**，后面跟一个CRLF

- 首行之后是**若干行响应头**，包括：**通用头部，响应头部，实体头部**

- 响应头部和响应实体之间用**一个CRLF空行**分隔

- 最后是一个可能的**消息实体** 响应报文例子如下：

```
HTTP/1.1 200 OK
Date: Tue, 08 Jul 2014 05:28:43 GMT
Server: Apache/2
Last-Modified: Wed, 01 Sep 2004 13:24:52 GMT
ETag: "40d7-3e3073913b100"
Accept-Ranges: bytes
Content-Length: 16599
Cache-Control: max-age=21600
Expires: Tue, 08 Jul 2014 11:28:43 GMT
P3P: policyref="http://www.w3.org/2001/05/P3P/p3p.xml"
Content-Type: text/html; charset=iso-8859-1

{"name": "qiu", "age": 25}
```

  

### 5 HTTP1.0 HTTP1.1 区别

HTTP1.0: 非持久连接

HTTP1.1: 持久连接

1. HTTP客户端发起请求连接

2. 服务端80端口等待连接，返回连接确认并通知客户端

3. HTTP客户端向TCP连接的套接字发送HTTP请求报文，报文表示客户端需要对象

4. HTTP服务器接收到请求报文，检索出被请求的对象，将对象封装在一个响应报文中，并通过其套接字向客户端发送

5. 发送对象

6. HTTP关闭TCP连接

   2RTT（往返时间）+传输时间 

### 6. Cookie

**维护状态**

1. 客户端发送正常的HTTP请求报文
2. 服务器发送响应报文，并设置cookie，并在服务端和客户端都储存下来
3. 客户端在下一次发送http请求报文时会携带cookie
4. 服务器发送响应报文

**作用**

- 登录验证
- 购物车
- 推荐
- 用户状态

> 安装本地缓存！条件GET方法可以解决本地服务器缓存一致性的问题！

### 7. UDP协议

**无连接**

- UDP发送端和接收端之间没有握手
- 每个UDP报文段都被独立的处理

UDP 是一种尽力而为的服务，报文段可能丢失，送到应用进程的报文段也可能是乱序的。

**UDP被用于：**

- 流媒体
- DNS
- SNMP

**在UDP上实现可靠传输：**

- 在应用层增加可靠性
- 应用特定的差错恢复

**报文格式：**

- 8 字节头部，2 个字节**源端口号**，2 字节**目的端口号**，**长度**， **校验和**（EDC, 差错控制编码）

**优势：**

不建立连接，开销小（头部小），无拥塞控制和流量控制。尽力而为！

**UDP校验和**

目标：：检测在被传输报文段中的差错（如比特反转）

发送方：

1. 将报文段的内容视为16比特的整数

2. 校验和：报文段的加法和（1 的补运算）
3. 发送方将校验和放在UDP的校验和字段

接收方：

1. 计算接收到的报文段的校验和
2. 检查计算出的校验和与校验和字段的内容是否相等



### 8. TCP 

**特点**：

- 点对点 -- 一个接收方，一个发送方
- 可靠的，按顺序的字节流
- 管道化（流水线）-- TCP拥塞控制和流量控制设置窗口的大小
- 发送和接收缓存
- 全双工数据    MSS: 最大报文段大小
- 面向连接
- 有流量控制

**TCP报文段结构**

32Bit,  源端口号，目的端口号，序号，确认号（ACK）,首部长度，保留未用，校验和，接收窗口，紧急数据指针，可选项，应用层数据

**标志位**： PSH(马上退出数据)， RST, SYN, FIN: 建立，拆除连接     

**序号**：以字节为编号，一个MSS的第一个字节在整个字节流中的序号（偏移量）

**ACK**： 确认n-1及以前字节

**接收窗口**：可接收字节数量



**TCP: 可靠数据传输**

- TCP 在IP不可靠服务的基础上建立了rdt
  - 管道化的报文段
  - 累积确认
  - 单个重传定时器
  - 是否可以接受乱序的，没有规范
- 通过以下事件触发重传
  - 超时
  - 重复的确认

**TCP流量控制**

缓冲区



**TCP连接建立**

TCP两次握手带来的问题：

- 建立半连接，（服务器维持了虚假的连接）
- 旧数据重传（服务器把旧数据当新数据接受）

**三次握手过程：**

1. 客户端， SYN = 1, Seq=X         syn=1表示连接请求
2. 服务器， SYN = 1， Seq = y, ACKbit =1, ACKnum = x+1
3. 客户端，ACKbit = 1, ACKnum = y+1  确认收到，表明客户端活跃



**TCP连接释放**

1. 客户端发送 FINbit = 1, seq = x
2. 服务器端返回 ACKbit=1, ACKnum = x+1
3. 服务器端发送 FINbit=1,seq=y
4. 客户端返回ACKbit=1;ACKnum=y+1