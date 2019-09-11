const Router=require('koa-router')  //路由
const requireDirectory=require('require-directory') //批量导入
//初始化类
class InitManager{
    static initCore(app){
        //入口方法
        InitManager.app=app
        InitManager.initLoadRouters()
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
}

module.exports=InitManager