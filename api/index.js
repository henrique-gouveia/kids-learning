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
    .then('./config/middlewares.js')
    .then('./assertions.js')
    .then('./resources')
    .then('./config/routes.js')
    .into(app)

app.listen(process.env.PORT || 3000, () => {
    console.log('Kids Api is Running...')
})
