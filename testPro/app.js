const Koa=require('koa')
const axios=require('axios')

//es6 import from 导入包
//node.js 还不支持
//TC39 提案
//Typescript  大型 便于维护 

const app=new Koa()
//应用程序对象

//app 可以注册多个中间件,请求只会执行第一个中间件，其余中间件需要自己调用

app.use(async(ctx,next)=>{
    //ctx 上下文 洋葱模型
    console.log(1111)
    await next()
    console.log(2222)
})
app.use(async(ctx,next)=>{
    console.log(3333)
    const start=Date.now()
    const res=await axios.get('http://7yue.pro')  //等待 请求
    const end=Date.now()
    console.log(end-start) //时间差  1  913
    console.log(4444)
})
//打印结果 1342
/*
async  await 保证洋葱模型的正确执行,异步编程的终极解决方案
promise
next() 调用结果是promise，中间件是可以return
await  
1.求值关键字
await next() 返回promise成功的值
await 100*100  表达式求值 10000
2.阻塞线程，等待结果  await异步调用变成同步调用
async 函数前面加async，函数会包装成promise  中间件本身就返回promise，之所以用async是搭配await
借鉴 C#
3.使用ctx传值，但是必须保证执行顺序是洋葱模型
**/

//监听端口
app.listen(3000)

