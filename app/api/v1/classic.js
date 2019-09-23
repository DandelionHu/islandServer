const Router=require('koa-router')
const {ParameterException,LatestError,NotFound}=require('../../../core/http-exception')
const {PositiveIntegerValidator,classicValidator}=require('@validators/validator')
const {Auth}=require('../../../middlewares/auth')
const {Flow}=require('@models/flow')
const {Favor}=require('@models/favor')
const {Art}=require('@models/art')

const router=new Router({
    prefix:'/v1/classic'  //接口前缀
})
//测试接口
router.post('/test',async(ctx,next)=>{
    const path=ctx.param  //获取路径里的参数
    const query=ctx.request.query //获取？号后面的参数
    const headers=ctx.request.header //获取header里面的参数
    const body=ctx.request.body
    //校验
    const v=await new PositiveIntegerValidator().validate(ctx) //传入ctx 会自动找到id进行校验
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
/*
非公开api
检测请求是否有token 并且token是合法非过期
才能真正进入请求，使用中间件的方式统一对token处理  x
**/
/*
权限 分角色 有些角色能访问 有些访问不了
权限分级 scope
8普通用户 16管理员
接口传入权限值
**/
//测试权限接口
router.get('/auth',new Auth(7).m,async(ctx,next)=>{
    ctx.body=ctx.auth.uid    
})
//获取最新期刊
router.get('/latest',new Auth().m,async(ctx,next)=>{
    //获取最新期刊模型
    const flow=await Flow.getLatestNew()
    const art_id=flow.art_id
    const type=flow.type
    const uid=ctx.auth.uid
    const art=await Art.getData(art_id,type) //查询实体表的字段
    // art.index=flow.index //取出flow里面的index给art 这种写法不行 art是个类，返回的是他下面dataValues里面的值
    // art.dataValues.index=flow.index  //直接修改类上面的值 不谨慎
    art.setDataValue('index',flow.index) //设置dataValues的值

    //查询用户是否点赞
    const likeLatest=await Favor.userLikeIt(art_id,type,uid)
    art.setDataValue('like_status',likeLatest)
    //为啥koa会序列化dataValues的值呢？ sequelize模型告诉koa要序列化dataValues
    //序列化
    ctx.body=art
}) 
//获取当前一期的下一期
router.get('/:index/next',new Auth().m,async(ctx,next)=>{
    const v=await new PositiveIntegerValidator().validate(ctx,{id:'index'})
    const index=v.get('path.index')-1
    const uid=ctx.auth.uid
    //获取下一期期刊 减一之后查询期号对应的art_id,type 通过art_id 和 type 获取实体类
    const flow=await Flow.getLatestNextOrPrev(index)
    if(!flow){
        //没查到 没有下一期期刊了
        throw new LatestError('没有下一期期刊了')
    }
    const art_id=flow.art_id
    const type=flow.type
    const art=await Art.getData(art_id,type) //查询实体表的字段
    art.setDataValue('index',index) //设置dataValues的值
    //查询用户是否点赞
    const likeLatest=await Favor.userLikeIt(art_id,type,uid)
    art.setDataValue('like_status',likeLatest)
    ctx.body=art
})
//获取当前一期的上一期
router.get('/:index/previous',new Auth().m,async(ctx,next)=>{
    const v=await new PositiveIntegerValidator().validate(ctx,{id:'index'})
    const index=parseInt(v.get('path.index')+1)
    const uid=ctx.auth.uid
    //获取上一期期刊 加一之后查询期号对应的art_id,type 通过art_id 和 type 获取实体类
    const flow=await Flow.getLatestNextOrPrev(index)
    if(!flow){
        //没查到 没有上一期期刊了
        throw new LatestError('没有上一期期刊了')
    }
    const art_id=flow.art_id
    const type=flow.type
    const art=await Art.getData(art_id,type) //查询实体表的字段
    art.setDataValue('index',index) //设置dataValues的值
    //查询用户是否点赞
    const likeLatest=await Favor.userLikeIt(art_id,type,uid)
    art.setDataValue('like_status',likeLatest)
    ctx.body=art
})
//获取某一期期刊详情
router.get('/:id/:type',new Auth().m,async(ctx,next)=>{
    const v=await new classicValidator().validate(ctx)
    const art_id=v.get('path.id')
    const type=v.get('path.type')
    const uid=ctx.auth.uid
    //查询期刊index
    const flow=await Flow.getLatestIndex(art_id,type)
    if(!flow){
        //没查到 没有该期刊
        throw new LatestError('没有该期刊')
    }
    const art=await Art.getData(art_id,type) //查询实体表的字段
    art.setDataValue('index',flow.index) //设置dataValues的值
    //查询用户是否点赞
    const likeLatest=await Favor.userLikeIt(art_id,type,uid)
    art.setDataValue('like_status',likeLatest)
    ctx.body=art
})
//获取某一期刊的点赞情况 总共点赞数 当前用户是否点赞
router.get('/:type/:id/favor',new Auth().m,async(ctx,next)=>{
    const v=await new classicValidator().validate(ctx)
    const art_id=v.get('path.id')
    const type=v.get('path.type')
    const uid=ctx.auth.uid
    const art=await Art.getData(art_id,type) //查询实体表的字段
    if(!art){
        throw new NotFound()
    }
    //查询用户是否点赞
    const likeLatest=await Favor.userLikeIt(art_id,type,uid)
    ctx.body={
        fav_nums:art.fav_nums,
        like_status:likeLatest,
        id:art_id
    }
})
//获取用户点赞的期刊
router.get('/favor',new Auth().m,async(ctx,next)=>{
    const uid=ctx.auth.uid
    const favors=await Favor.getMyClassicFavors(uid)
    ctx.body=favors
})

module.exports=router 