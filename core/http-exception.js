//http 错误类
class HttpException extends Error{
    constructor(msg='服务器异常',code=400,errorCode=10000){
        super()
        this.msg=msg
        this.code=code
        this.errorCode=errorCode
    }
}
// 400 错误类
class ParameterException extends HttpException{
    constructor(msg='参数错误',errorCode=10000){
        super()
        this.code=400
        this.msg=msg
        this.errorCode=errorCode
    }
}
//200 success 抛出信息 操作成功
class Success extends HttpException{
    constructor(msg='ok',errorCode=0){
        super()
        this.code=201
        this.msg=msg
        this.errorCode=errorCode
    }
}
//404 找不到资源
class NotFound extends HttpException{
    constructor(msg='资源未找到',errorCode=10000){
        super()
        this.code=404
        this.msg=msg
        this.errorCode=errorCode
    }
}
//401 授权失败
class AuthFailed extends HttpException{
    constructor(msg='授权失败',errorCode=10004){
        super()
        this.code=401
        this.msg=msg
        this.errorCode=errorCode
    }
}
module.exports={
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthFailed
}