const Koa=require('koa')
const Router=require('koa-router')
const app=new Koa()
const router=new Router()

app.use(async(ctx,next)=>{
    //路径
    console.log(ctx.path)
    //请求method
    console.log(ctx.method)
})

/*
客户端兼容性，一般保留三个版本的支持
v1 v2 v3支持三个版本
api携带版本号
1.路径 'v1/classic/latest'
2.参数 'classic/latest?version=v1'
3.header 
开闭原则  对代码的修改是关闭的，对代码的扩展是开放的
**/

//注册router中间件
app.use(router.routes()).use(router.allowedMethods())
//监听端口
app.listen(3000)