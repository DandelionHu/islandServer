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

module.exports={
    HttpException,
    ParameterException
}