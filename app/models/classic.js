const { Sequelize,Model }=require('sequelize')
const { sequelizeDB }=require('../../core/db')
/*
movie music sentence 三个模型共同的字段
image
title
pubdate 
content
fav_nums
type
**/

const classicFields={
    image:Sequelize.STRING,
    title:Sequelize.STRING,
    pubdate:Sequelize.DATEONLY,
    content:Sequelize.STRING,
    fav_nums:Sequelize.INTEGER,
    status:Sequelize.INTEGER,
    type:Sequelize.TINYINT  
}

//Movie 模型
class Movie extends Model{

}
Movie.init(classicFields,{
    sequelize:sequelizeDB,
    tableName:'movie'  //表名
})
//Music 模型
class Music extends Model{
    
}
const musicFields=Object.assign({url:Sequelize.STRING},classicFields)
Music.init(musicFields,{
    sequelize:sequelizeDB,
    tableName:'music'  //表名
})
//Sentence 模型
class Sentence extends Model{
    
}
Sentence.init(classicFields,{
    sequelize:sequelizeDB,
    tableName:'sentence'  //表名
})

module.exports={
    Movie,
    Music,
    Sentence
}