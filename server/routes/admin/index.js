/* rest CRUD 后台接口 */
module.exports = app =>{
    const express = require('express')
    // 创建express 的子路由, 分模块存储接口
    const router = express.Router({
     //保留来自父路由器的req.params值。如果父对象和子对象具有冲突的参数名，则以子对象的值为准。
      mergeParams: true 
    })
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')

    //CRUD增删改查
    //1.创建资源
    router.post('/',async(req,res)=>{
        //创建分类数据
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    //2.修改资源
    router.put('/:id',async(req,res)=>{
        //更新分类数据
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    //3.删除资源
    router.delete('/:id',async(req,res)=>{
        //删除分类数据
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
          success: true
        })
    })
    //4.资料列表
    // 分页列表+搜索
    router.get('/',async(req,res,next)=>{
        //console.log(req.query)
        //有分页参数的处理
        if(!(req.query.pageSize||req.query.currentPage)) return next();
        const pageCurrent = Number(req.query.currentPage)
        const pageSize = Number(req.query.pageSize)
        const skipNum = (pageCurrent - 1) * pageSize
        const totalNum = await req.Model.countDocuments()
        let data
        if(req.query.queryData){
            data = await req.Model.find({name:req.query.queryData}).skip(skipNum).limit(pageSize).populate('categories')
        } else {
            data = await req.Model.find().skip(skipNum).limit(pageSize).populate('categories')
        }
        //console.log(data)
        res.send({
            totalNum,
            data
        })
    },async(req,res)=>{
        const queryOptions = {}
        //分类数据的处理
        if(req.Model.modelName === 'Category'){
            //顶级分类parent
            const parents = await req.Model.find().where({
                parent: null
            }).lean()
            //二级分类
            //每个顶级分类下的children [{name:'xx',children:[{..}..]}] 
            //每个children都有关联parent[Category]
            for(let i = 0;i < parents.length; i++){         
                parents[i].children = await req.Model.aggregate([
                    {$match: {parent: parents[i]._id} },
                    {
                      $lookup: {
                        from: 'categories',//从Category模型中查找
                        localField: '_id', //查询关联字段
                        foreignField: 'parent',//category中关联字段
                        as: 'children'
                      }
                    }
                ])

                //三级分类 parents[i].children[j].children
                const length = parents[i].children.length 
                for(let j=0;j < length;j++){
                    //console.log(parents[i].children[j]);
                    //console.log((parents[i].children)[j]);
                    (parents[i].children)[j].children =  await req.Model.aggregate([
                        {$match: {parent: (parents[i].children)[j]._id} },
                        {
                            $lookup: {
                                from: 'categories',
                                localField: '_id', 
                                foreignField: 'parent',
                                as: 'children'
                            }
                        }
                    ])
                }
            }
            return res.send(parents)
        }

        if(req.Model.modelName === 'Article'){
            queryOptions.populate = 'categories'
        }

        if (req.Model.modelName === 'Hero') {
            if (req.query.queryData) {
              const items = await Hero.find({ name: req.query.query })
              res.send(items)
            } else {
              const items = await req.Model.find().setOptions(queryOptions)
              return res.send(items)
            }
          }

        if(req.Model.modelName === 'Video'){
            queryOptions.populate = 'categories'
        }
        
        if(req.Model.modelName === 'Ad'){
            queryOptions.populate = 'categories'
        }

        const items = await req.Model.find().setOptions(queryOptions)
        res.send(items)
    })
    //5.资源详情
    router.get('/:id',async(req,res)=>{
        //同一个接口find查找数据
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    //登录校验中间件（登陆权限）
    const authMiddleware = require('../../middleware/auth')()
    //资源模型中间件
    const resourceMiddleware = require('../../middleware/resource')()
    
    //将子路由挂载到app上  实现多级路由
    //:resource 动态路由 
    app.use('/admin/api/rest/:resource',authMiddleware,resourceMiddleware,router)

    //文件上传的路由
    //multer nodejs中间件 用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件
    const multer = require('multer')
    //__dirname 绝对地址 当前文件所在的文件夹admin  从./根目录开始
    const upload = multer({dest:__dirname + '/../../uploads'})
    //single() 单个文件上传
    //multer的single()中的参数必须是表单上传字段的filename的值。
    app.post('/admin/api/upload',authMiddleware,upload.single('file'),async(req,res)=>{
      //multer 中间件把file 挂载到req上去了 一定要有upload这个中间件
      const file = req.file
      file.url = `http://localhost:3001/uploads/${file.filename}`
      res.send(file) 
    })

    //登录校验
    app.post('/admin/api/login',async(req,res)=>{
        //1.根据用户名找用户
        const { username, password } = req.body
        const user = await AdminUser.findOne({
            username
        }).select('+password')
        //console.log(req.body,AdminUser,user);
        //console.log(password,user.password)
        assert(user,422,'用户不存在')
        /* if(!user){
            return res.status(422).send({
                message:'用户不存在' 
            })
        } */
        //2.校验密码
        /*  const isValid = require('bcrypt').compareSync(password,user.password)
         //console.log(isValid);
         assert(isValid,422,'密码错误') */
         /* if(!isValid){
            return res.status(422).send({
                message:'密码错误' 
            })
        } */
        //3.返回token
        //jsonwebtoken web验证
        //.sign({要加密的数据},随机数) 生成token 
        const token = jwt.sign({id: user._id},app.get('secret'))
        res.send({token}) 
    })  

    //捕获异常---统一进行错误处理函数
    app.use(async(err,req,res,next)=>{
        console.log(err);
        res.status(err.statusCode || 500).send({
            message: err.message 
        })
        await next()
    })
}