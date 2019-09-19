const { Sequelize,Model }=require('sequelize')
const { sequelizeDB }=require('../../core/db')

//Flow 模型
class Flow extends Model{

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