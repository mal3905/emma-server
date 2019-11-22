require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const itemsRouter = require('./items/items-router')
const categoryRouter = require('./category/category-router')
const authRouter = require('./auth/auth-router')


const app = express()

const morganOption = (NODE_ENV === 'production')   //ternary statement if/then, else
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use('/api/items', itemsRouter)
app.use('/api/category', categoryRouter)
app.use('/api/auth', authRouter)


app.get('/', (req, res) => {
  res.send('its working!')
})

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: 'Server error' }
  } else {
    console.error(error)
    response = { error: error.message, object: error }
  }
  res.status(500).json(response)
})

module.exports = app
