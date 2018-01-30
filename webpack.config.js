const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry:  __dirname + "/src/page/main.js",//唯一入口文件
  externals: {
    jquery: "jQuery" //如果要全局引用jQuery，不管你的jQuery有没有支持模块化，用externals就对了。
  },
  output: {
    path: __dirname + "/dist",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  },
  module: {
    rules: [ 
             {
                test: require.resolve('./src/asset/jquery.js'),  //jquery.js的路径
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                },{
                    loader: 'expose-loader',
                    options: '$'
                },
                {
                    loader: 'expose-loader',
                    options: 'jquery'
                }]
             },
            
             
             {
                test: require.resolve('./src/asset/sweetalert2/sweetalert2.min.js'),  
                use: [{
                    loader: 'expose-loader',
                    options: 'swal'
                }]
             },


          {
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader"
            },
            exclude: /node_modules/
         },
        //处理css样式
        {
          test: /\.css$/,
        //   use: [
        //       {
        //           loader: "style-loader"
        //       }, {
        //           loader: "css-loader"
        //       }
        //   ]
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
      },
      //处理图片
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      //处理字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
      
    ]
 },
 //添加一个压缩 插件
 plugins: [
    new UglifyJSPlugin(),
    new HtmlWebpackPlugin({
        filename: 'test.html',
        title: '我自定的模板',
        template: './src/page/index_tmp.html', 
        inject:'head'  //设置注入在模板界面的那个位置;
    }),
    new ExtractTextPlugin("style.css"),
    new CleanWebpackPlugin(
      ['dist'],　 //匹配删除的文件  ['dist/main.*.js','dist/manifest.*.js',],　 //匹配删除的文件
      {
          root: __dirname,       　　　　　　　　　　//根目录
          verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
          dry:      false        　　　　　　　　　　//启用删除文件
      }
  )
    // new webpack.ProvidePlugin({
    //     $: 'jquery',
    //     jQuery: 'jquery',
    //     'window.jQuery': 'jquery',
    //     'window.$': 'jquery'
    // })
]

}


