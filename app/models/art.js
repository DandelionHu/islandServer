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
    static async getList(artInfoList,useScope=true){
        // 传ids 多个id
        const artInfoObj={
            100:[],
            200:[],
            300:[]
        }
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
            const arts=await Art._getListByType(ids,parseInt(key))
            artsArr=artsArr.concat(arts) //拼接数组
        }
        return artsArr
    }
    static async _getListByType(ids,type){
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
                arts= await Movie.scope(scope).findOne(finder)
                break;
            case 200:
                //music 表
                arts= await Music.scope(scope).findOne(finder)
                break;
            case 300:
                //sentence 表
                arts= await Sentence.scope(scope).findOne(finder)
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