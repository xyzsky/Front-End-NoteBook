//编写一个方法，求一个字符串的字节长度
function getBytes(str){
    let len = str.length;
    let bytes = len;
    for(let i=0; i < len; i++){
        if(str.charCodeAt(i) > 255) bytes++;
    }
    return bytes;
}
//bind的用法，以及实现bind的函数需要注意的点
//bind的作用 和 call apply 相同，区别是 call 和 apply 是立即调用函数，而bind 是返回了一个函数
//需要调用的时候再去执行

//实现一个函数的clone
Object.prototype.clone = function (){
    var o = this.constructor === Array ? []:{};
    for(var e in this){
        o[e] = typeof this[e] === 'object' ? this[e].clone() : this[e];
    }
    return o;
}
//代理console.log函数
function log(){
    console.log.apply(console,arguments);
}
//输出今天的日期
function getToday(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month > 10 ? month : '0'+month;
    day = day > 10 ? day : '0' + day;
    console.log(year + '-' + month + '-' + day);
}
//用js实现随机选取10-100之间的10个数字，存入一个数组，并排序
function getTenToHundredSortArray(){
    let array = [];
    for(let i=0; i < 10; i++){
        array.push(Math.round(Math.random() * (-90) + 100));
    }
    array.sort()
    return array;
}
//提取URL的get参数
function serilizeUrl(url) {
    const result = {};
    url = url.split('?')[1];
    var map = url.split("&");ff
    for(let i = 0, len = map.length; i < len; i ++){
        result[map[i].split('=')[0]] = map[i].split('=')[1];
    }
    return result;
}
//
// console.log(serilizeUrl('http://item.taobao.com/item.htm?a=1&b=2&c=&d=xxx&e'));

//实现清除前后空格
function trimBlank(str){
    return str.replace(/^\s+/,"").replace(/\s+$/,"");
}
//每隔一秒输入1，2，3
function print123(){
    //method 1
    // for(let i=1; i <= 3; i++){
    //     setTimeout(() => {
    //         console.log(i)
    //     },1000 * i)
    // }

    //method2
    // for(var i=1; i <= 3; i++){
    //     (function (i){
    //         setTimeout(()=>{
    //             console.log(i)
    //         },1000*i)
    //     })(i);
    // }
    // function timer(time){
    //     return new Promise(resolve => {
    //         setTimeout(resolve,time)
    //     })
    // }
    // //method3
    // async function sleep(time){
    //     for(var i=0; i < 3; i++){
    //         await timer(1000);
    //         console.log(i)
    //     }
    // }
    // sleep(1000);


}
//判断一个输入是否是回文串
function run(str){
    if(typeof str !== 'string') return false;
    return str.split('').reverse().join('') === str;
}

//数组扁平化处理，多维数组转为一维数组
function flatten(arr){
    return arr.reduce((prev,item) =>{
        return prev.concat(Array.isArray(item) ? flatten(item):item);
    });
}

// const arr = [1,2,3,[2,3,[5,66,2],89,],98];
//实现一个函数，可以对js的5中主要数据类型进行复制
function cloneObj2(obj){
    var o = obj.constructor === Array ? []:{};
    for(var e in obj){
        o[e] = typeof obj[e] === 'object' ? cloneObj2(e) : obj[e];
    }
}