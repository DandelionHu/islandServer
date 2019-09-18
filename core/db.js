const Sequelize=require('sequelize')
const {dbName,host,port,user,password}=require('../config/config').datebase
//数据库连接初始化
const sequelizeDB=new Sequelize(dbName,user,password,{
    dialect:'mysql',
    host,
    port,
    logging:true,//sqly语句打印到终端
    timezone:'+08:00',//时区 加8小时
    define:{
        //creat_time  update_time 
        timestamps:true,
        //删除字段是否显示 delete_time
        paranoid:true  
    }
})

sequelizeDB.sync({
    force:true    //每次数据库都清空
})

module.exports={
    sequelizeDB
}