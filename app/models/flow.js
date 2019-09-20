const { Sequelize,Model }=require('sequelize')
const { sequelizeDB }=require('../../core/db')

//Flow 模型
class Flow extends Model{
    //获取最新期刊
    static async getLatestNew(){
        //flow表找到index最大的值表示最新期刊
        //对index进行排序，取最后一条记录
        //正序排序 倒序排序
        const flow=await Flow.findOne({
            order:[
                ['index','DESC']  //取flow表中index 倒序排序  findone取倒序排序中第一个
            ]
        })
        return flow
    }
    //获取当前期的下一期 或上一期
    static async getLatestNextOrPrev(index){
        //拿到当前期号查询
        const flow=await Flow.findOne({
            where:{
                index
            }
        })
        return flow
    }
    //查询期刊index
    static async getLatestIndex(art_id,type){
        const flow=await Flow.findOne({
            where:{
                art_id,
                type
            }
        })
        return flow
    }
}
Flow.init({
    index:Sequelize.INTEGER,
    status:Sequelize.INTEGER,
    art_id:Sequelize.INTEGER,//关联 movie music sentence的id  外键
    type:Sequelize.INTEGER //movie music sentence 模型的type  100:movie  200:music 300:sentence
},{
    sequelize:sequelizeDB,
    tableName:'flow'  //表名
})


module.exports={
    Flow
}