
/**
 * 封装了两个方法 
 * mdToHtml .md格式转.html格式
 * htmlToMd .html格式转.md格式
 * 依赖‘marked’包
 * Integer.MAX_VALUE=2147483647（string 理论长度）
 * 
 */
const marked = require('marked');
const fs = require('fs');

module.exports = {
    "toHTML":function(str){
        return marked(str+"")
    },
    "toMD":function(str){
        
    }
}



