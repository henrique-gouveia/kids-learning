require('dotenv').config()

const app = require('express')()
const consign = require('consign')
const db = require('./config/db')

app.db = db

consign()
    .then('./config/middlewares.js')
    .then('./assertions.js')
    .then('./resources')
    .then('./config/routes.js')
    .into(app)

app.get('/', (req, res) => res.send('Kids Api is Running...'));

app.listen(process.env.PORT || 3000, () => {
    console.log('Kids Api is Running...')
})
