module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const bodyParser = require('body-parser')
    const bcrypt = require('bcryptjs')
    const jwt = require('jsonwebtoken')
    const KxModel = require('../../models/Kx')
    const UserModel = require('../../models/User')
    const keys = require("../../config/keys")

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: false}));

    router.get('/Kx', async (req, res) => {
        let page = req.query.page || 1
        let pageSize = req.query.pageSize || 10
        page = parseInt(page)
        pageSize = parseInt(pageSize)
        const query = KxModel.find({})
        query.skip((page - 1) * pageSize)
        query.limit(pageSize)
        query.sort({id: -1})
        query.exec(function (err, rs) {
            if (err) throw err
            res.json(rs)
        })
    })

    router.get('/kxCount', async (req, res) => {
        const count = await KxModel.find().count()
        res.json({total: count})
    })

    router.get('/Kx/:id', async (req, res) => {
        const model = await KxModel.findById(req.params.id)
        res.send(model)
    })

    router.post('/Kx', async (req, res) => {
        const model = await KxModel.create(req.body)
        res.send(model)
    })

    router.put('/Kx/:id', async (req, res) => {
        const model = await KxModel.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    router.delete('/Kx/:id', async (req, res) => {
        const model = await KxModel.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    router.get('/regadmin', (req, res) => {

        let name = req.query.name || 'admin'
        let password = req.query.password || '123456'

        const newUser = new UserModel({
            name: name,
            password: password
        })
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                if (err) {
                    throw err
                }
                newUser.password = hash
                newUser.save().then(user => res.json(user)).catch(err => console.log(err))
            });
        });
    })


    router.post('/login', (req, res) => {

        let name = req.body.name || ''
        let password = req.body.password || ''

        if (typeof name == "undefined" || name == null || name == "") {
            return res.status(400).json('账号必填')
        }

        if (typeof password == "undefined" || password == null || password == "") {
            return res.status(400).json('密码必填')
        }

        UserModel.findOne({name}).then(user => {
            if (!user) {
                return res.status(404).json('用户不存在');
            }

            bcrypt.compare(password, user.password).then(isMath => {
                if (isMath) {
                    const rule = {id: user.id, name: user.name}
                    jwt.sign(rule, keys.srcertOrKey, {expiresIn: keys.expiresIn}, (err, token) => {
                        if (err) throw err;

                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    })
                } else {
                    return res.status(400).json('登录失败');
                }
            })

        })


    })

    app.use('/admin/api', router)
}