const {LinValidator,Rule}=require('../../core/lin-validator')

//校验正整数
class PositiveIntegerValidator extends LinValidator{
    constructor(){
        super()
        this.id=[
            new Rule('isInt','需要是正整数',{min:1})  //正整数，最小值为1  isInt是validator第三方库
        ]
    }
}

module.exports={
    PositiveIntegerValidator
}