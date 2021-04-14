const express = require('express')
const app = express()

//中间件
//cors 跨域
//express.json() 把前台post提交的数据解析成json格式输入
app.use(require('cors')())
app.use(express.json())

app.set('secret','sdfdgdfgdfgfgewt')

//express.static 托管 加载静态文件服务 
// 1.设置 uploads 为静态文件加载路径
// 2.(__dirname + '/uploads') 托管的文件
/*
    app.use('/static', express.static('public'))
    现在，你就可以通过带有 /static 前缀地址来访问 public 目录中的文件了。
    eg: 'http://localhost:3000/static/images/kitten.jpg' 
 */
app.use('/',express.static(__dirname + '/web'))
app.use('/admin',express.static(__dirname + '/admin'))
app.use('/uploads',express.static(__dirname + '/uploads'))


//引入数据库
require('./plugins/db')(app)
//分类路由：引入admin子路由
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3001,()=>{
    console.log('http://loacalhost:3001');
})