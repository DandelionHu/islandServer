const Router=require('koa-router')
const router=new Router()
const {ParameterException}=require('../../../core/http-exception')
const {PositiveIntegerValidator}=require('../../validators/validator')

//测试接口
router.post('/v1/:id/classic/test',async(ctx,next)=>{
    const path=ctx.param  //获取路径里的参数
    const query=ctx.request.query //获取？号后面的参数
    const headers=ctx.request.header //获取header里面的参数
    const body=ctx.request.body
    //校验
    const v=new PositiveIntegerValidator().validate(ctx) //传入ctx 会自动找到id进行校验
    const id=v.get('path.id') //lin-validator 提供的获取参数的方法，id转换成数字类型

    //面向切面编程
    //监听错误
    //输出一段有意义的提示信息
    if(true){
        //简单写法
        /*
        const error=new Error('错误信息')
        error.errorCode=10001
        error.requestUrl=`${ctx.method} ${ctx.path}`
        error.status=400 
        **/
        //封装写法 400异常类
        const error=new ParameterException()
        throw error
    } 
    //抛出异常之后后面的代码不会执行
    ctx.body={
        path:'classic'
    }
})

module.exports=router