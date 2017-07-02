import express from 'express'
import winston from 'winston'
import * as features from './features/features'

/* eslint no-console: 0 */
export default async function start(config) {

  winston.remove(winston.transports.Console)
  winston.add(winston.transports.Console, { timestamp: true })

  try {
    winston.log('info', 'Starting ...')
    const app = express()

    app.config = config || require('./config.js').default

    app.shutdown = () => features.teardown(app)

    await features.setup(app)

    winston.log('info', 'Started fine !!!')
    winston.log('info', `Using log level ${app.config.log.level}`)
    winston.level = app.config.log.level
    return app
  } catch (err) {
    console.error('Error while starting server', err.message, err.stack)
    throw new Error(`Error while starting server: ${err.message}`, err)
  }
}


