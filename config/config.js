module.exports={
    //默认是开发环境  生产环境prod
    environment:'dev',
    datebase:{
        dbName:'island',
        host:'localhost',
        port:3306,
        user:'root',
        password:'123456'
    },
    security:{
        secretKey:'abcdef', //token key
        expiresIn:60*60 //过期时间 1小时
    }
}