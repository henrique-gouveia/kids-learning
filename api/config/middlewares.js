const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
    app.use(express.urlencoded({ extended: true }))
    app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
}
