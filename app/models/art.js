const { Op}=require('sequelize')
const {Movie,Music,Sentence}=require('./classic')
class Art{
    //查询movie music sentence表里面的具体数据
    static async getData(art_id,type,useScope=true){
        const finder={
            where:{
                id:art_id
            }
        }
        let art=null 
        const scope=useScope?'bh':null
        switch (type) {
            case 100:
                //movie 表
                art= await Movie.scope(scope).findOne(finder)
                break;
            case 200:
                //music 表
                art= await Music.scope(scope).findOne(finder)
                break;
            case 300:
                //sentence 表
                art= await Sentence.scope(scope).findOne(finder)
                break;
            case 400:
                //书籍 表

                break;
            default:
                break;
        }
        return art
    }
    //查询多个数据
    static async getList(artInfoList){
        // 传ids 多个id
        const artInfoObj={
            100:[],
            200:[],
            300:[]
        }
        /*
        for in总是得到对像的key或数组,字符串的下标,而for of和forEach一样,是直接得到值
        结果for of更适合遍历数组   所以for in更适合遍历对象
        **/
        for(let artInfo of artInfoList){
            //遍历 artInfoList 找到对应的ids
            artInfoObj[artInfo.type].push(artInfo.art_id)
        }
        const artsArr=[]
        for(let key in artInfoObj){
            const ids=artInfoObj[key]
            if(ids.length===0){
                continue
            }
            const arts=await Art._getListByType(ids,parseInt(key)) //转化可以为int
            artsArr=artsArr.concat(arts) //拼接数组
        }
        //二维数组 展开 flatten  lodash里面的方法
        return artsArr
    }
    static async _getListByType(ids,type){
        //in 查询
        const finder={
            where:{
                id:{
                    [Op.in]:ids
                }
            }
        }
        let arts=[]
        const scope='bh'
        switch (type) {
            case 100:
                //movie 表
                arts= await Movie.scope(scope).findAll(finder)
                break;
            case 200:
                //music 表
                arts= await Music.scope(scope).findAll(finder)
                break;
            case 300:
                //sentence 表
                arts= await Sentence.scope(scope).findAll(finder)
                break;
            default:
                break;
        }
        return arts
    }
}

module.exports={
    Art
}