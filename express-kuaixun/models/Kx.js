const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    id: {type: String, required: true},
    title: {type: String, required: true},
    time: {type: String, required: true}
})

module.exports = mongoose.model('news', schema)