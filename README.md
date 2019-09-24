islandServer项目说明
======
简介
------
### 书籍小程序node服务端，该项目使用了koa框架，以及koa-bodyparser、koa-router、koa-static等第三方库构建而成；主要封装了全局异常处理中间件、全局验证token权限中间件、引用第三方库lin-validator封装验证器validator.js、统一初始化路由init.js、统一封装http错误类http-exception.js、使用sequelize链接mysql数据库db.js、使用jsonwebtoken生成token、bcryptjs加密密码等功能。
------
目录文件说明
------
1. app.js 入口文件
2. app 业务文件
   - api 接口
       - v1 v2用来区分版本
   - lib  工具库
   - models 数据模型
   - service  service层 微信接口
   - validators 验证器
3. core  核心方法
    - db.js 链接数据库
    - http-exception.js 统一封装异常错误类
    - init.js 初始化加载文件
    - lin-validator.js 第三方验证器包
    - util.js 工具
4. middlewares 中间件
    - auth.js 接口统一处理token中间件
    - exception.js 全局统一异常处理中间件
5. config 配置文件
6. island-mini-test API接口测试代码
7. testPro 测试方法文件夹
8. island-mini 小程序端代码
9. read.js  测试入口文件
10. static 静态资源