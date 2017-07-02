import winston from 'winston'

import index from '../routes/index'

class RoutesFeature {

  setup(app) {
    app.use('/', index)

    // errors
    app.use(::this.logErrors)
    app.use(::this.errorHandler)
  }
  teardown() {}

  logErrors(err, req, res, next) {
    // eslint no-console: 0
    winston.log('error', err.stack)
    next(err)
  }

  errorHandler(err, req, res) {
    res.status(500)
    res.json({
      status: 'error',
      error: err.message || err
    })
  }

}

export default new RoutesFeature()

