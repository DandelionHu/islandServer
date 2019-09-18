const {LinValidator,Rule}=require('../../core/lin-validator-v2')
const {User}=require('../models/user')
const {LoginType}=require('../lib/enum')

//校验正整数
class PositiveIntegerValidator extends LinValidator{
    constructor(){
        super()
        this.id=[
            new Rule('isInt','需要是正整数',{min:1})  //正整数，最小值为1  isInt是validator第三方库
        ]
    }
}
//注册校验
class RegisterValidator extends LinValidator{
    constructor(){
        super()
        this.email=[
            new Rule('isEmail','不符合Email规范')
        ]
        this.password1=[
            //校验长度
            new Rule('isLength','密码至少6个字符，最多32个字符',{
                min:6,
                max:32
            }),
            //字符范围 特殊字符 正则表达式
            new Rule('matches','密码不符合规范','^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ]
        this.password2=this.password1
        this.nickname=[
            new Rule('isLength','昵称不符合长度规范',{
                min:4,
                max:32
            })
        ]
    }
    //自定义方法校验密码相同
    validatePassword(vals){
        const psw1=vals.body.password1
        const psw2=vals.body.password2
        if(psw1!==psw2){
            throw new Error('两个密码必须相同')
        }
    }
    //自定义方法校验email是否重复
    async validateEmail(vals){
        const emailVal=vals.body.email
        const userOne=await User.findOne({
            where:{
                email:emailVal
            } //查询条件
        }) //查询一个满足条件的数据  异步
        if(userOne){
            //查到了
            throw new Error('email已经存在')
        }
    }
}
//token校验器
class TokenValidator extends LinValidator{
    constructor(){
        super()
        this.account=[
            //手机号登录 邮箱登录  账号登录
            new Rule('isLength','不符合账号规则',{
                min:4,
                max:32
            }) 
        ]
        this.secret=[
            //是必须要传入的吗？
            //web 账号+密码
            //小程序 账号
            //可以传  可以不传
            new Rule('isOptional'), //可传可不传 传了就要验证长度
            new Rule('isLength','至少6个字符',{
                min:6,
                max:128
            })
        ]
    }
    validateLoginType(vals){
        if(!vals.body.type){
            throw new Error('type是必传参数')
        }
        const isType=LoginType.isThisType(vals.body.type)
        if(!isType){
            throw new Error('type参数不合法')
        }
    }
}

module.exports={
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator
}