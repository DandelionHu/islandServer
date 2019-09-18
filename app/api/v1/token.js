const Router=require('koa-router')
const {TokenValidator}=require('../../validators/validator')
const {LoginType}=require('../../lib/enum')
const {User}=require('../../models/user')
const {ParameterException}=require('../../validators/validator')
const {generateToken}=require('../../../core/util')
const router=new Router({
    prefix:'/v1/token'  //接口前缀
})
/*
session token 
登录 账号 密码 返回 token jwt令牌可携带数据
令牌的获取 颁布令牌
**/

router.post('/',async(ctx,next)=>{
    const v=await new TokenValidator().validate(ctx)
    const type=parseInt(v.get('body.type'))
    const account=v.get('body.account')
    const secret=v.get('body.secret')
    let token;
    switch (type) {
        case LoginType.USER_MINI_PROGRAM:
            //处理小程序登录
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
//邮箱登录验证 获取token
async function emailLogin(account,secret){
    //比对用户输入的账号和密码是否和数据库的账号密码一致
    const user=await User.verifyEmailPassword(account,secret)
    if(user){
        const token=generateToken(user.id,2) //生成token
        return token
    }
}

module.exports=router