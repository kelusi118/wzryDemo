module.exports = app =>{
    const express = require('express')
    const router = express.Router()

    const Category = require('../../models/Category')
    //增
    router.post('/categories',async(req,res)=>{
        //创建分类数据
        const model = await Category.create(req.body)
        res.send(model)
    })
    //改
    router.put('/categories/:id',async(req,res)=>{
        //更新分类数据
        const model = await Category.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    //删
    router.delete('/categories/:id',async(req,res)=>{
        //删除分类数据
        await Category.findByIdAndDelete(req.params.id,req.body)
        res.send({
          success: true
        })
    })
    //查
    router.get('/categories',async(req,res)=>{
        //同一个接口find查找数据
        const items = await Category.find().populate('parent').limit(10)
        res.send(items)
    })
    //查详情页
    router.get('/categories/:id',async(req,res)=>{
        //同一个接口find查找数据
        const model = await Category.findById(req.params.id)
        res.send(model)
    })


    //将子路由挂载到app上  实现多级路由
    app.use('/admin/api',router)
}