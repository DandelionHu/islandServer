const basicAuth=require('basic-auth')
const jwt=require('jsonwebtoken')
const {Forbbiden}=require('../core/http-exception')

// 判断token是否合法中间件
class Auth{
    constructor(level){
        //权限分级
        Auth.USER=8
        Auth.ADMIN=16
        Auth.SUPER_ADMIN=32
        //level  接口传的权限值
        this.level=level || 1
    }
    //属性 返回一个函数
    get m(){
        return async(ctx,next)=>{
            //token 检测 不合法抛出异常 合法执行下一个中间件
            //token 传递方式 body header
            const userToken=basicAuth(ctx.req) //解析token
            //ctx.req 是源生node.js 的request
            //ctx.request koa 封装的request

            let errMsg='token不合法';
            if(!userToken || !userToken.name){
                throw new Forbbiden(errMsg)
            }
            try {
                //验证token是否合法 取出token带的信息
                var decode= jwt.verify(userToken.name,global.config.security.secretKey)
            } catch (error) {
                //token 不合法 token过期
                if(error.name='TokenExpiredError'){
                    errMsg='token已过期'
                }
                throw new Forbbiden(errMsg)
            }
            //权限控制
            if(decode.scope<this.level){
                //token 携带的权限值小于接口的权限值
                errMsg='权限不足'
                throw new Forbbiden(errMsg)
            }

            //获取用户id scope权限
            ctx.auth={
                uid:decode.uid,
                scope:decode.scope
            }
            await next()
        }
    }
    //校验令牌
    static verifyToken(token){
        try {
            jwt.verify(token,global.config.security.secretKey)
            return true
        } catch (error) {
            return false
        }
    }
}

module.exports={
    Auth
}