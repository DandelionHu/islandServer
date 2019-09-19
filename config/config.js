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
    },
    wx:{
        appid:'wx85219bfb57316fdd',
        appsecret:'d8aa5cbdd363b8045d9af1ced4ee6bf7',
        loginUrl:'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    }
}