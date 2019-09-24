require('module-alias/register')  //使用别名必须要加
//引入包
const Koa=require('koa')
const bodyparser=require('koa-bodyparser')
const static=require('koa-static')
const path=require('path')
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
/*
静态资源 消耗流量
1.网站目录
2.静态资源服务器，微服务，带宽足够
3.云服务 oss 贵 ECS RDS OSS  CDN
js  css  html  vue/react SEO差 后台管理系统CMS WebApp
动态nuxt ssr 模板渲染 SEO好
**/
app.use(static(path.join(__dirname,'./static')))
//http://localhost:3000/images/movie.png

//初始化
InitManager.initCore(app)



//监听端口
app.listen(3000)