module.exports = options =>{
    return async(req,res,next)=>{
        const assert = require('http-assert')
        const jwt = require('jsonwebtoken')
        const AdminUser = require('../models/AdminUser')

        //服务端校验jsonwebtoken - 检验客户端携带的token ID和数据库 一致即可展开后续操作
        const token = String(req.headers.authorization || '').split(' ').pop()
        //console.log(token);
        assert(token,401,'请先登录')
        //console.log(req);
        const { id } = jwt.verify(token,req.app.get('secret'))
        assert( id,401,'请先登录')
        req.user = await AdminUser.findById(id)
        //如果不存在 抛出错误信息 http-assert 
        //http-assert assert('确保存在的xx','错误代码','message')
        assert(req.user,401,'请先登录')
        next()
    }
}