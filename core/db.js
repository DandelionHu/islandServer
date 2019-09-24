const {Sequelize,Model}=require('sequelize')
const {unset,clone,isArray}=require('lodash')
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
// 序列化时不返回时间字段
Model.prototype.toJSON=function(){
    //浅拷贝
    let data=clone(this.dataValues) //dataValues 里面的值不受get影响

    unset(data,'updated_at')
    unset(data,'created_at')
    unset(data,'deleted_at')

    // exclude 模型上要删除的字段 
    //是个数组，遍历删除
    if(isArray(this.exclude)){
        //判断数组
        this.exclude.forEach((value)=>{
            unset(data,value)
        })
    }

    for(key in data){
        //判断是不是image
        if(key==='image'){
            //判断image路径是不是http开头
            if(!data[key].startsWith('http'))
                data[key]=global.config.host+data[key]
        }
    }

    return data
}
 

module.exports={
    sequelizeDB
}