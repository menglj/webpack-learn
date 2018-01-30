require("../asset/bootstrap/css/bootstrap.css");
require("../asset/bootstrap/fonts/glyphicons-halflings-regular.eot");
require("../asset/bootstrap/fonts/glyphicons-halflings-regular.svg");
require("../asset/bootstrap/fonts/glyphicons-halflings-regular.ttf");
require("../asset/bootstrap/fonts/glyphicons-halflings-regular.woff");
require("../asset/bootstrap/fonts/glyphicons-halflings-regular.woff2");



//使用expose-loader处理jquery.js  //暴露出全局的$,以供页面使用
require("../asset/jquery.js");
require("../asset/bootstrap/js/bootstrap.js");

//引入jquery-ui
require("../asset/bootstrap-datetimepicker/jquery-ui.min.css");
require("../asset/bootstrap-datetimepicker/jquery-ui.min.js");



 //引入日期插件
 require("../asset/bootstrap-datetimepicker/bootstrap-datetimepicker.min.css");
 require("../asset/bootstrap-datetimepicker/bootstrap-datetimepicker.js");
 require("../asset/bootstrap-datetimepicker/bootstrap-datetimepicker.zh-CN.js");
 
 
 



//测试弹出框
//暴露出 swal
 require("../asset/sweetalert2/sweetalert2.min.js");
 require("../asset/sweetalert2/sweetalert2.min.css");



// //测试bind.js   
// //暴露bind接口出来,bind.js其实要用common.js的规范来写;


// require("./dist/gen/bind.js");
// require("./dist/gen/bind.css");


//两种方式配置
/****
 * 
 * 一种在webpack.config.js中配置 
 * 一张在入口文件引入时配置  require("expose-loader?暴露名!./file.js")
 */

 













