//遍历src下有几个文件夹。并用数组返回
var fs = require('fs');
var paths = fs.readdirSync(__dirname+'/src');
paths.forEach((e,i) => {
  if((/^\B\S+/gi).test(e)){
    paths.splice(i,1);
  }
})
module.exports = paths;