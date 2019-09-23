const Router=require('koa-router')
const {PositiveIntegerValidator,SearchValidator,AddShortCommentValidator}=require('@validators/validator')
const {Book}=require('@models/book')
const {Comment}=require('@models/book-comment')
const {Favor}=require('@models/favor')
const {Success}=require('../../../core/http-exception')
const {Auth}=require('../../../middlewares/auth')
const router=new Router({
    prefix:'/v1/book'  //接口前缀
})
const {HotBook}=require('@models/hot-book')
//获取热门书籍 点赞数 是否喜欢
router.get('/hot_list',async(ctx,next)=>{
    const hotBook=await HotBook.getAll()
    ctx.body={
        books:hotBook
    }
})
//获取书籍详情信息
router.get('/:id/detail',async(ctx,next)=>{
    const v=await new PositiveIntegerValidator().validate(ctx)
    const id=v.get('path.id')
    const detail= await new Book(id).getDatail()
    ctx.body=detail
})
//搜索书籍
router.get('/search',async(ctx,next)=>{
    const v=await new SearchValidator().validate(ctx)
    const start=v.get('query.start')
    const q=v.get('query.q')
    const count=v.get('query.count')
    const book = await Book.searchFromYuShu(q,start,count)
    ctx.body=book
})
//获取用户喜欢书籍的数量
router.get('/favor/count',new Auth().m,async(ctx,next)=>{
    const uid=ctx.auth.uid
    const count=await Book.getMyFavorBookCount(uid)
    ctx.body={
        count
    }
})
//获取具体书籍点赞情况 用户是否点赞
router.get('/:book_id/favor',new Auth().m,async(ctx,next)=>{
    const v=await new PositiveIntegerValidator().validate(ctx,{
        id:'book_id'
    })
    const uid=ctx.auth.uid
    const bookId=v.get('path.book_id')
    const favor=await Favor.getBookFavor(uid,bookId)
    ctx.body=favor
})
//书籍增加短评
router.post('/add/short_comment',new Auth().m,async(ctx,next)=>{
     const v=await new AddShortCommentValidator().validate(ctx,{
         id:'book_id'
     })
     const bookId=v.get('body.book_id')
     const content=v.get('body.content')
     await Comment.addComment(bookId,content)
     throw new Success()
})
//获取书籍短评
router.get('/:book_id/short_comment',new Auth().m,async(ctx,next)=>{
    const v=await new PositiveIntegerValidator().validate(ctx,{
        id:'book_id'
    })
    const bookId=v.get('path.book_id')
    const comments=await Comment.getComments(bookId)
    ctx.body=comments
})
//热搜关键字
router.get('/hot_keyword',async(ctx,next)=>{
    ctx.body={
        'hot':[
            '哈利波特',
            '韩寒',
            '金庸'
        ]
    }
    /*
    搜索次数最多
    一部分参考算法 一部分人工编辑
    编辑热门关键字
    **/
})
module.exports=router   