const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    title: { type: String },
    avatar: { type: String },
    banner: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    scores: {
        difficult: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survive: { type: Number },
    },
    skills: [{
        icon: { type: String },
        delay: { type: String },
        cost: { type: String },
        name: { type: String },
        description: { type: String },
        tips: { type: String }
    }],
    item1: [{ type: mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    item2: [{ type: mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    usageTips: { type: String },
    battleTips: { type: String },
    teamTips: { type: String },
    inscriptions: [{ type: mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    skins: [{
        title: { type: String },
        skin: { type: String }
    }],
    partners: [{
        hero: { type: mongoose.SchemaTypes.ObjectId,ref:'Hero'},
        description: { type: String }
    }],
    beRestrained: [{
        hero: { type: mongoose.SchemaTypes.ObjectId,ref:'Hero'},
        description: { type: String }
    }],
    restrain: [{
        hero: { type: mongoose.SchemaTypes.ObjectId,ref:'Hero'},
        description: { type: String }
    }],
})

module.exports = mongoose.model('Hero',schema,'heroes') 