const { Sequelize,Model,Op}=require('sequelize')
const { sequelizeDB }=require('../../core/db')


class Comment extends Model{
    //添加短评
    static async addComment(bookId,content){
        //短评加1  相同content 加1
        //查询图书评论是否存在
        const comment=await Comment.findOne({
            where:{
                book_id:bookId,
                content
            }
        })
        if(!comment){
            //没查询到
            await Comment.create({
                book_id:bookId,
                content,
                nums:1
            })
            return
        }
        //已经存在 加一
        await comment.increment('nums',{by:1})
        return
    }
    //获取书籍短评
    static async getComments(bookId){
        const comments=await Comment.scope('bh').findAll({
            where:{
                book_id:bookId
            }
        })
        return comments
    }
}
Comment.init({
    book_id:Sequelize.INTEGER,
    content:Sequelize.STRING(12),
    nums:{
        type:Sequelize.INTEGER,
        defaultValue:0 
    }
},{
    sequelize:sequelizeDB,
    tableName:'comment'  //表名
})

module.exports={
    Comment
}