const Router=require('koa-router')
const {Success}=require('../../../core/http-exception')
const {RegisterValidator}=require('../../validators/validator')
const {User}=require('../../models/user')
const router=new Router({
    prefix:'/v1/user'  //接口前缀
})

//注册 新增数据 post  查询数据get  更新数据put  删除数据delete

router.post('/register',async(ctx,next)=>{
    //如果验证器用中间件书写，只能实例化一次，并发时候会出现数据错乱，
    //写在内部可以实例化多次，每个请求都有自己的验证器对象，独立的
    /*
    思维路径
    1.接收什么参数 email password1 password2 nickname
    2.校验 LinValidator
    **/
   const v=await new RegisterValidator().validate(ctx)  //验证器里面有异步操作
   //数据库操作
   const user={
        email:v.get('body.email'),
        password:v.get('body.password2'),
        nickname:v.get('body.nickname')
   }
   await User.create(user)  //操作数据库是异步的
   //抛出成功消息
   throw new Success()
}) 



module.exports=router