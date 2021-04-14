const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    play: { type: String },
    cover: { type: String },
    video: { type: String },
    url: { type: String },
    date: { type: String },
    duration: { type: String }
},{
    timestamps: true
})

module.exports = mongoose.model('Video',schema) 