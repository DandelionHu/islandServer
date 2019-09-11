const Router=require('koa-router')
const router=new Router()

router.post('/v1/:id/classic/test',async(ctx,next)=>{
    const path=ctx.param  //获取路径里的参数
    const query=ctx.request.query //获取？号后面的参数
    const headers=ctx.request.header //获取header里面的参数
    const body=ctx.request.body
    
    ctx.body={
        path:'classic'
    }
})

module.exports=router