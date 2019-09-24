const obj={
    name:'7yue',
    age:18,
    toJSON:function(){
        return {
            name1:'8yue'
        }
    }
}
// 序列化 把对象变成字符串 序列化之后的值是 toJSON返回的值
console.log(JSON.stringify(obj))