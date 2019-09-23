const axios=require('axios')
const util=require('util') //node.js帮助包
const { Sequelize,Model,Op}=require('sequelize')
const { sequelizeDB }=require('../../core/db')
const {Favor}=require('./favor')
/*
book 业务表 记录书籍点赞情况
前端 后端(数据整合) 服务端(基础数据)
微服务 开发架构模式
爬虫 必备工具 数据处理和分析 python
**/
class Book extends Model{
    constructor(id){
        super()
        this.id=id
    }
    //获取书籍详情
    async getDatail(){
        const url=util.format(global.config.yushu.detailUrl,this.id)
        const detail=await axios.get(url)
        return detail.data
    }
    //搜素书籍
    static async searchFromYuShu(q,start,count,summary=1){
        //summary=1获取概要

        const url=util.format(global.config.yushu.keywordUrl,encodeURI(q),count,start,summary)
        const result=await axios.get(url)
        return result.data
    }
    //获取喜欢书籍的数量
    static async getMyFavorBookCount(uid){
        //Favor.count 求数量
        const count = Favor.count({
            where:{
                uid,
                type:400
            }
        })
        return count
    }
}
Book.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },//记录微服务里面的id
    fav_nums:{
        type:Sequelize.INTEGER,
        defaultValue:0
    }, //点赞情况
},{
    sequelize:sequelizeDB,
    tableName:'book'  //表名
})

module.exports={
    Book
}