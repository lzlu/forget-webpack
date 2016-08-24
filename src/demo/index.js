import a from './demo.xtpl';

import Xtemplate from 'xtemplate/lib/runtime';
//模版引擎使用例子

var s = new Xtemplate(a).render({
  name:"HELLO WORLD"
});
$("#test").html(s);

