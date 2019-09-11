//引入包
const Koa=require('koa')
const bodyparser=require('koa-bodyparser')
//引入文件
const InitManager=require('./core/init')

const app=new Koa()

//初始化
InitManager.initCore(app)

//注册bodyparser
app.use(bodyparser())

//监听端口
app.listen(3000)