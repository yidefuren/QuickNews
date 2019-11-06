module.exports = app => {
    const mongoose = require('mongoose')
    const monggoURL = require('../config/keys').monggoUrl
    mongoose.connect(monggoURL, {useNewUrlParser: true}).then(() => {
        console.log('monggodb连接成功')
    }).catch(err => {
        throw err
        console.log(err)
    })
}