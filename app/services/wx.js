const axios=require('axios')
const util=require('util') //node.js帮助包
const {AuthFailed}=require('../../core/http-exception')
const {User}=require('../models/user')
const {generateToken}=require('../../core/util')
const {Auth}=require('../../middlewares/auth')
class WXManager{
    //使用微信code获取openid添加到数据库返回token
    static async codeToToken(code){
        // code 发送到微信服务端获取appid
        // appid appsecret url
        const appid=global.config.wx.appid
        const appsecret=global.config.wx.appsecret
        const loginUrl=global.config.wx.loginUrl
        //node 帮助包
        const url=util.format(loginUrl,appid,appsecret,code) //格式化字符串
        const result=await axios.get(url)
        if(result.status!=200){
            throw new AuthFailed('openid获取失败')
        }
        if(result.data.errcode){
            //如果有errcode 代表报错
            throw new AuthFailed('openid获取失败:'+result.data.errmsg  )
        }

        const openid=result.data.openid
        let user=await User.getUserByOpenid(openid)
        if(!user){
            //user不存在 添加openid
            user=User.registerByOpenid(openid)
        }
        //返回token
        return generateToken(user.id,Auth.USER)
    }
}

module.exports={
    WXManager
}