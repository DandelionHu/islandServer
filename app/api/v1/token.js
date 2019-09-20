const Router=require('koa-router')
const {TokenValidator,ParameterException,NotEmptyValidator}=require('@validators/validator')
const {LoginType}=require('../../lib/enum')
const {User}=require('@models/user')
const {generateToken}=require('../../../core/util')
const {Auth}=require('../../../middlewares/auth')
const {WXManager}=require('../../services/wx')
const router=new Router({
    prefix:'/v1/token'  //接口前缀
})
/*
session token 
登录 账号 密码 返回 token jwt令牌可携带数据
令牌的获取 颁布令牌
api权限 公开api  不公开api
token 过期 不合法
**/
/*
业务逻辑
1.写到api中
2.写到model中
3.service 中
**/
//登录
router.post('/login',async(ctx,next)=>{
    const v=await new TokenValidator().validate(ctx) 
    const type=v.get('body.type')
    const account=v.get('body.account')
    const secret=v.get('body.secret')
    let token;
    switch (type) {
        case LoginType.USER_MINI_PROGRAM:
            //处理小程序登录
            token=await WXManager.codeToToken(account)
            break;
        case LoginType.USER_EMAIL:
            //处理email用户登录方式
            token=await emailLogin(account,secret) //异步方法
            break;
        case LoginType.USER_MOBILE:
            //处理手机登录
            break;
        case LoginType.ADMIN_EMAIL:
            //处理管理员登录
            break;
        default:
            throw new ParameterException('没有相应的处理函数')
    }
    //返回token
    ctx.body={
        token
    }
}) 
//校验token接口
router.post('/verify',async(ctx,next)=>{
    const v=await new NotEmptyValidator().validate(ctx)
    const result=Auth.verifyToken(v.get('body.token'))
    ctx.body={
        is_valid:result
    }
})
//邮箱登录验证 获取token
async function emailLogin(account,secret){
    //比对用户输入的账号和密码是否和数据库的账号密码一致
    const user=await User.verifyEmailPassword(account,secret)
    if(user){
        const token=generateToken(user.id,Auth.USER) //生成token
        return token
    }
}
//小程序登录 
module.exports=router