import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'

import router from './routes'

const app = express()

// View engine setup
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'hbs')

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../public')))

// Routes
app.use('/', router)

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
    .render('error', {
      message: err.message
    })
})

export default app
