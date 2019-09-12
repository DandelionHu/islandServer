function func1(){
    try {
        func2()
    } catch (error) {
        throw error
    }
}

async function func2(){
    try {
       await func3()
       //await 对promise求值，发现是reject，自己throw抛出了异常，try catch 捕捉异常
    } catch (error) {
        console.log('error')
    }
}

function func3(){
    return new Promise((resolve,reject)=>{
        setTimeout(function () {
            const r=Math.random()
            if(r<0.5){
                reject('error')
            }else{
                resolve()
            }
        })
    })
}

func2()

/*
代码大全2书本-提升代码质量
没有发生异常 正确返回结果
发生了异常
判断出异常 return false null  丢失异常信息
throw new Error
全局异常处理  
promise async await 
**/