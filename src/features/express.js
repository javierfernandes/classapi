import methodOverride from 'method-override'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import compression from 'compression'
import expressPromise from 'express-promise'

class ExpressFeature {

  setup(app) {
    this.config = app.config
    this.middlewares(app.config).forEach(m => app.use(m))
  }

  middlewares(config) {
    const m = [
      methodOverride(),
      bodyParser.urlencoded({ extended: 'true' }),
      bodyParser.json(),
      bodyParser.json({ type: 'application/vnd.api+json' }),
      morgan('dev'),
      compression(),
      expressPromise({
        maxPromise: 5000
      }),
      ::this.fillConfig
    ]
    if (config.express.delay) {
      m.push(::this.delayMiddleware)
    }
    return m
  }

  fillConfig(req, res, next) {
    req.config = this.config
    return next()
  }

  delayMiddleware(req, res, next) {
    setTimeout(() => {
      next()
    }, this.config.express.delay)
  }

  teardown() {
  }

}

export default new ExpressFeature()

