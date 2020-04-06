const Sequelize = require('sequelize');
const MySQLManager = require('../../utils/SQLManager');

const newsComment  = MySQLManager.define('newsComment',{
    //评论内容
    commentText:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    //评论发出者
    from:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    //评论接受者
    to:{
        type:Sequelize.STRING,
        //如果是Null就是单向评论
        allowNull:true,    
    },
    //评论发表时间
    ctime:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    //是否已经删除评论
    isDelete:{
        type:Sequelize.STRING,
        defaultValue:"no",
    }
});

const news = MySQLManager.define('news', {
    //id
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    //标题
    title:{
        type:Sequelize.STRING,
        unique: true,
        allowNull:false,
    },
    //新闻类型
    newsType:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    //发表时间
    ctime:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    //作者
    author:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    //封面图片
    picUrl:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    //新闻内容
    content:{   
        type:Sequelize.STRING(65535),
        allowNull:false,
    },
    //新闻原地址
    url:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    //是否删除
    isDelete:{
        type:Sequelize.STRING,
        defaultValue:"no",
    },
   
});

module.exports.news = news;
module.exports.newsComment = newsComment;