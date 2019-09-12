const Router=require('koa-router')  //路由
const requireDirectory=require('require-directory') //批量导入
//初始化类
class InitManager{
    static initCore(app){
        //入口方法
        InitManager.app=app
        //初始化所有路由
        InitManager.initLoadRouters()
        //初始化config
        InitManager.loadConfig()  
    }
    //初始化所有路由
    static initLoadRouters(){
        //导入api下面的所有模块
        //process.cwd() 获取根目录
        const apiDirectory=`${process.cwd()}/app/api`
        requireDirectory(module,apiDirectory,{
            visit:whenLoadModule
        })
        //导入触发方法
        function whenLoadModule(obj){
            if(obj instanceof Router){
                //注册中间件
                InitManager.app.use(obj.routes())
            }
        }
    }
    //初始化加载配置文件
    static loadConfig(path=''){
        const configPath=path || process.cwd()+'/config/config.js' //cofig.js的绝对路径
        const config=require(configPath)  //导入config
        global.config=config  //config放到全局global对象
    }
}

module.exports=InitManager