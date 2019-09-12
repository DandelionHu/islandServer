const {HttpException}=require('../core/http-exception')
 //全局异常处理中间件
 const catchError =async(ctx,next)=>{
     try {
         await next()
     } catch (error) {
         //error 堆栈调用信息
         //error 简化 清晰明了的信息 给前端
         //HTTP status code 2xx  4xx  5xx
         //message error_code 详细错误码 10001  request_url 当前请求的url
         //已知型错误 可判断出，处理错误，明确提示
         //未知型错误 程序潜在错误
         //简单写法
        /*if(error.errorCode){
            //已知异常
            ctx.body={
                msg:error.message,
                errorCode:error.errorCode,
                requestUrl:error.requestUrl
            }
            ctx.status=error.status
        }**/

        //开发环境 需要在终端查看异常信息   生成环境不需要
        if(global.config.environment=='dev'){
            throw error  //抛出异常，可以在终端查看异常信息
        }

        //封装写法
        if(error instanceof HttpException){
            ctx.body={
                msg:error.msg,
                errorCode:error.errorCode,
                requestUrl:`${ctx.method} ${ctx.path}`
            }
            ctx.status=error.code
        }else{
            //未知异常
            ctx.body={
                msg:'服务器错误',
                errorCode:999,
                requestUrl:`${ctx.method} ${ctx.path}`
            }
            ctx.status=500
        }
     }
 }

 module.exports=catchError