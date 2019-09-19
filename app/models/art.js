const {Movie,Music,Sentence}=require('./classic')
class Art{
    static async getData(art_id,type){
        const finder={
            where:{
                id:art_id
            }
        }
        let art=null 
        switch (type) {
            case 100:
                //movie 表
                art= await Movie.findOne(finder)
                break;
            case 200:
                //music 表
                art= await Music.findOne(finder)
                break;
            case 300:
                //sentence 表
                art= await Sentence.findOne(finder)
                break;
            case 400:
                //书籍 表

                break;
            default:
                break;
        }
        return art
    }
}

module.exports={
    Art
}