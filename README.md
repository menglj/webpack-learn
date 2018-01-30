# webpack中引入jquery,bootstrap,以及第三方插件的使用

------

**使用的webpack版本是 3.10.0**

demo的目录结构:

    dist     
      |--    //用来存放打包后的文件   
    src 
      |--asset  //存在需要打包的插件   
      |--page  //存放入口文件以及模板文件   


开始demo之前的一些准备:

**

1.创建一个目录my_demo,进入当前目录下,初始化一个package.json
-----------------------------------------



> **npm init** 




2.安装我们的webpack工具,为了方便，我全局安装.
---------------------------



>  ***npm install --save--dev  webpack***    //本地安装

>  ***npm install -g  webpack***      //全局安装

-------------------

3.安装我们就接下来用到的依赖模块,loader,以及插件
-----------------------------



下述模块loader的主要作用是用于把es6,es7编写的源码转换成让浏览器识别的代码

> ***npm install --save--dev  babel-core  babel-loader* *babel-preset-env***
> 


处理样式的loader 将模块的导出作为样式添加到 DOM 中

> ***npm install --save--dev css-loader style-loader <br>***


处理文件字体的,图片路径的loader


> ***npm install --save--dev file-loader url-loader*** 


压缩用到的插件

> ***npm install --save--dev uglify-es uglifyjs-webpack-plugin  <br>***


暴露全局的expose-loader  ,用来处理jquery插件   

> ***npm install --save--dev expose-loader   <br>***


----------


准备工作做好后, 开始配置我们的webpack.config.js
---------------------------------

 **期间我遇到的错误:**
 
 

>  **一开始打包的boostrap遇到的问题,出现一大堆关于boostrap引入字体，图片，等等的一些错误,原因:配置中没有加入处理图片的loader.**


webconfig添加如下:

    module:{
      rules:[
        //处理图片  <br>
       {
         test: /\.(png|svg|jpg|gif)$/,
         use: ['file-loader']
        },
         //处理字体  <br>
        {
           test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                      'file-loader'
              ]
      }
     ]
    }

主入口文件文件:main.js

    require("../asset/bootstrap/css/bootstrap.css");
    require("../asset/bootstrap/fonts/glyphicons-halflings-regular.eot");
    require("../asset/bootstrap/fonts/glyphicons-halflings-regular.svg");
    require("../asset/bootstrap/fonts/glyphicons-halflings-regular.ttf");
    require("../asset/bootstrap/fonts/glyphicons-halflings-regular.woff");
    require("../asset/bootstrap/fonts/glyphicons-halflings-regular.woff2");

测试文件test.html

    <ul class="nav nav-pills">
        <li role="presentation" class="active"><a href="#">Home</a></li>
        <li role="presentation"><a href="#">Profile</a></li>
        <li role="presentation"><a href="#">Messages</a></li>
    </ul>
    

打开浏览器即可看到熟悉的bootstrap样式




 
 









------

## **webpack中打包jquery**  

**主入口文件引入main.js** 

         require("../asset/jquery.js");


**注意 ：**

    如果直接打包,不用loader处理或者插件处理,会出现$ is not undefinded，因为打包后，并没有把$,jquery暴露出来，处于打包后自己的作用域中。
    
**解决方案**

我在此处用expose-loader解决这个问题,还有其它方案，具体看[官方文档][1]

在配置文件中的module.rules 中设置如下:

> 解释如下：用expose-loader暴露我们的jquery全局变量,jQuery,$.

 

     {          
                 //jquery.js的路径
                test: require.resolve('./src/asset/jquery.js'),                 
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'       
                },{
                    loader: 'expose-loader',
                    options: '$'
                }]
    }
  
  **测试界面添加 test.html**
  


        <script>
            $(function(){
            alert('a');
            })
       </script>


**结果**:webpack后，打开test.html 如期弹出 a.皆大欢喜^o^

> **本以为这样引入jQuery第三方插件没问题,但后期引入jquery-ui时又遇到了问题,报错not resolve jquery 云云....**;


**打包jquery第三方插件**
-------------

> ***测试的插件***
>       **1.jquery-ul测试;
>        2.日期组件;**
> 
> *测试UI组件的时候,出现出现juery模块没有找到的问题, 可能猜测：是我用测试的jquery-ul插件不是最新的*

**解决:**
   


      webpack.config.js  下配置
      
      externals: {
        jquery: "jQuery"          //如果要全局引用jQuery，不管你的jQuery有没有支持模块化，用externals就对了。
      }
    
      配合expose-loader使用; 浏览器控制台和shell界面不报错



 主入口文件main.js
 

    require("../asset/bootstrap/css/bootstrap.css");
    require("../asset/bootstrap/fonts/glyphicons-halflings-regular.eot");
    require("../asset/bootstrap/fonts/glyphicons-halflings-regular.svg");
    require("../asset/bootstrap/fonts/glyphicons-halflings-regular.ttf");
    require("../asset/bootstrap/fonts/glyphicons-halflings-regular.woff");
    require("../asset/bootstrap/fonts/glyphicons-halflings-regular.woff2")

    require("../asset/jquery.js");
    require("../asset/bootstrap/js/bootstrap.js");
    
    //引入jquery-ui
    require("../asset/bootstrap-datetimepicker/jquery-ui.min.css");
    require("../asset/bootstrap-datetimepicker/jquery-ui.min.js");
    
    //引入日期插件
    require("../asset/bootstrap-datetimepicker/bootstrap-datetimepicker.min.css");
    require("../asset/bootstrap-datetimepicker/bootstrap-datetimepicker.js");
    require("../asset/bootstrap-datetimepicker/bootstrap-datetimepicker.zh-CN.js");
    


 
 
//测试界面如下:test.html

    测试界面如下:
         <!DOCTYPE html>
            <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <meta http-equiv="X-UA-Compatible" content="ie=edge">
                  <title>Document</title>
                  <style>
                    #toggle {
                    width: 100px;
                    height: 100px;
                    background: #ccc;
                  }
                  </style>
                    </head>
                    <body>
                        <ul class="nav nav-pills">
                            <li role="presentation" class="active"><a href="#">Home</a></li>
                            <li role="presentation"><a href="#">Profile</a></li>
                            <li role="presentation"><a href="#">Messages</a></li>
                        </ul>
                        <div id="toggle"></div>

                            <form class="form-inline">
                                <div class="form-group">
                                    <label>时间：</label>
                                    <div class="input-group date form_datetime_day">
                                      <input type="text" class="form-control" id="start_date">
                                            <span class="input-group-addon">
                                                <span class="glyphicon glyphicon-calendar"></span>
                                            </span>
                                          </div>                                                               
                                </div>                          
                              </form>
          <script src="bundle.js"></script>
          <!-- <script src="../src/asset/bootstrap-datetimepicker/bootstrap-datetimepicker.min.js"></script> -->
          <script>
            $(function(){   
              $( document ).click(function() {
                 $( "#toggle" ).toggle( "blind" );
              });
               
                   $('.form_datetime_day').datetimepicker({  
                      language: 'zh-CN',
                      format: 'yyyy-mm-dd hh:ii:ss',
                      autoclose: true, 
                      todayBtn: true,
                      showClear:true,
                      startView: 'month',
                      minView:'month',
                      maxView:'decade',
                      toolbarPlacement:'bottom',
                      showTodayButton:false,
                      icons:{today:'glyphicon glyphicon-time'},
                      todayBtn:'linked'
        		      });	
              console.log(jquery);
            })
          </script>
        </body>
    </html>
    
 

> 测试日期组件的时候，遇到打包成功，但是浏览器控制台报错:出现  $().datepicker() is not a function.....经过排查,换了个新版本的boostrap-datepicker.js然后打包成功了.
猜测:1.可能是源文件的boostrap-datepicke.js下载了被作了改动,
       2.可能是旧版本问题

 **最后wepack,jQuery-ui中的方法正常使用;**
 

打包第三方插件
-------
使用expose-loader 
测试插件 : sweetalert2 
如果一开始直接引入
main.js

    //测试弹出框
    require("../asset/sweetalert2/sweetalert2.min.js");
    require("../asset/sweetalert2/sweetalert2.min.css");

test.html
  

    <script>
      swal("hello world");
    </script>

**然后直接webpack，shell控制台没有红色出现,问题是打开测试页面后，没有要的弹出框，浏览器下还包swal is not undefined.....,原因是swal全局并没有暴露出来**

**解决:**

    {             
               // 这里是引入插件的路径
                test: require.resolve('./src/asset/sweetalert2/sweetalert2.min.js'),   
                use: [{
                    loader: 'expose-loader',    
                    options: 'swal'    //暴露的变量 ，设置为swal
                }]
  }
  
 **最后webpack,打开测试界面弹出熟悉的弹出框 hello word**
 





