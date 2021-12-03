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

app.listen(3000, () => {
  console.log('Kids Api is Running...')
})