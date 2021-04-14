const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    icon: { type: String },
    attackbonus: { type: String },
    spellbonus:{ type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId,ref:'Category'}]
})

module.exports = mongoose.model('Item',schema) 