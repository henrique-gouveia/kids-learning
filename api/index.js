require('dotenv').config()

const app = require('express')()
const consign = require('consign')

const db = require('./config/db')
const multer = require('./config/multer')
const storage = require('./config/storage')

app.db = db
app.multer = multer
app.storage = storage

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./assertions.js')
    .then('./resources')
    .then('./config/routes.js')
    .into(app)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`KidsLearning Api is Running on port ${port}...`)
})
