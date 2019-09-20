require('module-alias/register')  //使用别名必须要加
//引入包
const Koa=require('koa')
const bodyparser=require('koa-bodyparser')
//引入文件
const InitManager=require('./core/init')
const catchError=require('./middlewares/exception')

// require('./app/models/user')
// require('./app/models/classic')
// require('./app/models/flow')

const app=new Koa()

//注册bodyparser
app.use(bodyparser())
//注册异常中间件
app.use(catchError)

//初始化
InitManager.initCore(app)



//监听端口
app.listen(3000)