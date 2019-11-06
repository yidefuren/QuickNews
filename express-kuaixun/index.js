const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const passport = require('passport')
app.use(require('cors')())

const PORT = process.env.PORT || 5000

require('./plugins/db')(app)
require('./routes/api')(app)
require('./routes/admin')(app)

app.use(passport.initialize())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

require('./config/passport')(passport)

app.listen(PORT, () => {
    console.log(`服务器正在运行http://127.0.0.1:${PORT}`)
})