const { Sequelize,Model,Op}=require('sequelize')
const { sequelizeDB }=require('../../core/db')
const {Art}=require('./art')
const {LikeError,DislikeError,NotFound}=require('../../core/http-exception')

//Favor 模型  业务表
/*
用户是否对某个期刊是否点过赞
**/
class Favor extends Model{
    //点赞
    static async like(art_id,type,uid){
        //先查询favor表是否有数据，如果没有再把数据添加到表里，
        //然后查询实体表对应的数据把点赞数加一
        //数据库事务 多步骤保证数据一致性 ACID 原子性 一致性 隔离性 持久性
        const favor= await Favor.findOne({
            where:{
                art_id,
                type,
                uid
            }
        })
        if(favor){
            //如果查到了，代表该用户已经点过赞了
            throw new LikeError()
        }
        return sequelizeDB.transaction(async (t)=>{
            //添加
            await Favor.create({
                art_id,
                type,
                uid
            },{transaction:t})
            //查询art_id的具体数据 用户点赞的是那个期刊
            const art=await Art.getData(art_id,type,false)
            //加一操作
            await art.increment('fav_nums',{by:1,transaction:t})
        })

    }
    //取消点赞
    static async dislike(art_id,type,uid){
        //先查询favor表是否有数据，如果有数据就删除，
        //然后查询实体表对应的数据把点赞数减一
        const favor= await Favor.findOne({
            where:{
                art_id,
                type,
                uid
            }
        })
        if(!favor){
            //如果没查到了，代表该用户已经取消点赞了
            throw new DislikeError()
        }
        return sequelizeDB.transaction(async (t)=>{
            //删除
            await favor.destroy({
                force:true, //false软删除  Favor 表 favor具体记录
                transaction:t
            })
            //查询art_id的具体数据 用户点赞的是那个期刊
            const art=await Art.getData(art_id,type,false)
            //减一操作
            await art.decrement('fav_nums',{by:1,transaction:t})
        })
    }
    //查询用户点赞情况
    static async userLikeIt(art_id,type,uid){
        const favor= await Favor.findOne({
            where:{
                art_id,
                type,
                uid
            }
        })
        if(favor){
            //查到了 点赞了
            return true
        }
        return false
    }
    //查询用户点赞的期刊 不包括书籍
    static async getMyClassicFavors(uid){
        //查询用户点赞过的所有期刊
        //查询用户点赞的期刊id和type 根据id type 获取具体模型
        const fovers=await Favor.findAll({
            where:{
                uid,
                type:{ //type 不等于400
                    [Op.not]:400
                }
            }
        })
        if(!fovers){
            throw new NotFound()
        }
        //循环查询数据库 查询次数不可控 非常危险要避免
        return await Art.getList(fovers)
    }
}
Favor.init({
    uid:Sequelize.INTEGER,
    art_id:Sequelize.INTEGER,//关联 movie music sentence的id  外键
    type:Sequelize.INTEGER //movie music sentence 模型的type  100:movie  200:music 300:sentence
},{
    sequelize:sequelizeDB,
    tableName:'favor'  //表名
})


module.exports={
    Favor
}