const Router=require('koa-router')
const {Auth}=require('../../../middlewares/auth')
const {LikeValidator}=require('@validators/validator')
const {Success}=require('../../../core/http-exception')
const {Favor}=require('@models/favor')
const router=new Router({
    prefix:'/v1/like'  //接口前缀
})
//点赞接口
router.post('/add',new Auth().m,async(ctx,next)=>{
    const v=await new LikeValidator().validate(ctx,{id:'art_id'})
    const art_id=v.get('body.art_id')
    const type=v.get('body.type')
    const uid=ctx.auth.uid
    //点赞
    await Favor.like(art_id,type,uid)
    throw new Success()
})
//取消点赞
router.post('/cancel',new Auth().m,async(ctx,next)=>{
    const v=await new LikeValidator().validate(ctx,{id:'art_id'})
    const art_id=v.get('body.art_id')
    const type=v.get('body.type')
    const uid=ctx.auth.uid
    //取消点赞
    await Favor.dislike(art_id,type,uid)
    throw new Success()
})
module.exports=router