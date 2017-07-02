/*
 * export a list of features of the app
 * A feature is a object with the form
 *
 * {
 *    setup(app) : Promise,
 *    teardown(app) : Promise
 * }
 *
 * They are called on app init and shutdown
 *
 * ADD HERE all files from ./config
 */

import express from './express'
import mongo from './mongoose'
import winston from 'winston'
// import auth from './auth'
import routes from './routes'

const features = [express, mongo] // , auth]

const doWithFeatures = async (fn) => {
  await Promise.all(features.map(f => fn(f)))
  return fn(routes)
}

export const teardown = (app) => doWithFeatures(f => f.teardown(app))
export const setup = (app) => doWithFeatures(f => f.setup(app))


