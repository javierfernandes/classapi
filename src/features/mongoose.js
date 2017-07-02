import mongoose from 'mongoose'

mongoose.Promise = global.Promise

// this is to trigger model loading
export * from '../models/all'

class MongooseFeature {
  setup(app) {
    // mongoose.set('debug', true)
    return mongoose.connect(app.config.mongo.url, app.config.options || {})
  }
  teardown() {
    return mongoose.connection._closeCalled ?
        Promise.resolve()
        : mongoose.connection.close()
  }
}

export default new MongooseFeature()

