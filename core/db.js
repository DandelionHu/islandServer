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
        paranoid:true,
        createdAt:'created_at',//重命名创建时间
        updatedAt:'updated_at',//重命名更新时间
        deletedAt:'deleted_at',//重命名删除时间
        underscored:true,
        freezeTableName:true,
        scopes:{
            bh:{
                attributes:{
                    exclude:['created_at','updated_at','deleted_at'] //查询时不返回这些字段
                }
            }
        }
    }
})

sequelizeDB.sync({
    // force:true    //每次数据库都清空
})

module.exports={
    sequelizeDB
}