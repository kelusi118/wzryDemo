const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    parent: { type: mongoose.SchemaTypes.ObjectId,ref:'Category'}
})

//虚拟字段 'children'
/* schema.virtual('children',{
    localField: '_id',      //内键
    foreignField: 'parent', //关联父键
    justOne: false,
    ref:'Category' //父键 
}) */

schema.virtual('newsList',{
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref:'Article'
})

module.exports = mongoose.model('Category',schema) 