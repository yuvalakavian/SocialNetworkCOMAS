const mainRouter = require('./routes/main')

const express = require('express')

const app = express()

app.use(express.static('public'))

app.use('/', mainRouter)

app.listen(8800)