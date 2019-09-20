const bcrypt=require('bcryptjs')
const { Sequelize,Model }=require('sequelize')
const { sequelizeDB }=require('../../core/db')
const { AuthFailed }=require('../../core/http-exception')


class User extends Model{
    //验证账号密码
    static async verifyEmailPassword(email,plainPassword){
        const user=await User.findOne({
            where:{
                email
            }
        })
        if(!user){
            //没查到数据
            throw new AuthFailed('用户不存在')
        }
        //查到用户 对比密码
        const correct=bcrypt.compareSync(plainPassword,user.password)
        if(!correct){
            throw new AuthFailed('密码不正确')
        }
        return user
    }
    //查询openid是否存在
    static async getUserByOpenid(openid){
        const user=await User.findOne({
            where:{
                openid
            }
        })
        return user
    }
    //增加openid
    static async registerByOpenid(openid){
        return await User.create({
            openid
        })
    }
    //增加账号密码
    static async registerByEmail(email,password,nickname){
        //数据库操作
        await User.create({
            email,
            password,
            nickname
        })  //操作数据库是异步的
    }
}
User.init({
    //主键 ：不能重复 不能为空 
    //自动增长id  1  2  3
    //数字类型 查询性能好 , 随机字符串(GUID)查询慢 , 并发id会不会重复
    //即使别人知道用户编号，也无法攻击，接口保护Token 权限
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,  //主键
        autoIncrement:true  //自动增长
    },
    nickname:Sequelize.STRING,
    email:{
        type:Sequelize.STRING(128),
        unique:true  //唯一标识 
    },
    password:{
        type:Sequelize.STRING,
        set(val){ //设计模式 观察着模式 password改变会触发set方法
            //密码加密
            const salt=bcrypt.genSaltSync(10)  //同步方法  10 计算机生成盐的时候花费的成本
            const psw=bcrypt.hashSync(val,salt)  //生成加密后的密码
            this.setDataValue('password',psw) //model 属性操作
        }
    },
    openid:{
        type:Sequelize.STRING(64),
        unique:true  //唯一标识 
    }
},{
    sequelize:sequelizeDB,
    tableName:'user'  //表名
})


module.exports={
    User
}