module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const KxModel = require('../../models/Kx')

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


    router.get('/Kx/:id', async (req, res) => {
        const model = await KxModel.findById(req.params.id)
        res.send(model)
    })

    app.use('/api', router)
}