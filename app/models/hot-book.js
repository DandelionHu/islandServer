const { Sequelize,Model,Op}=require('sequelize')
const { sequelizeDB }=require('../../core/db')
const {Favor}=require('./favor')
/*
图书基础数据 做成服务
公用性  多个项目用 公开
微服务 
node.js 中间层
保存部分数据，提高获取数据速度
**/
class HotBook extends Model{
    //获取热门书籍
    static async getAll(){
        //按index排序 获取所有数据信息
        const books=await HotBook.findAll({
            order:[
                'index'
            ]
        })
        //每个书籍用户点赞数量
        const ids=[] //所有书籍id
        // forEach 不能用async await
        books.forEach((book)=>{
            ids.push(book.id)
        })
        // 查到所有书籍id 去favor表查询所有用户点赞情况，做统计，就是该书籍的点赞情况,遍历查询单个书籍的记录，对应就是点赞数
        const favors=await Favor.findAll({
            where:{
                art_id:{
                    [Op.in]:ids,
                },
                type:400
            },
            group:['art_id'], //通过art_id分组
            attributes:['art_id',[Sequelize.fn('COUNT','*'),'count']] //查询出来的字段art_id count  Sequelize.fn('COUNT') 对查询出来的数据求值 SUM求和
        }) 
        /*
        {
            art_id1:[record1,record2],
            art_id2:[record1,record2]
        }
        {
            art_id1:count,
            art_id2:count
        }
        **/
        books.forEach(book=>{
            HotBook._getEachBookStatus(book,favors)
        })
        return books
    }
    //合并两个数组的数据结构
    static _getEachBookStatus(book,favors){
        let count=0
        favors.forEach(favor=>{
            if(book.id===favor.art_id){
                count=favor.get('count')
            }
        })
        book.setDataValue('fav_nums',count)
        return book
    }
}
HotBook.init({
    index:Sequelize.INTEGER, //排序
    status:Sequelize.INTEGER, //状态
    image:Sequelize.STRING, //图书封面
    author:Sequelize.STRING, //作者
    title:Sequelize.STRING // 标题
},{
    sequelize:sequelizeDB,
    tableName:'hot_book'  //表名
})

module.exports={
    HotBook
}