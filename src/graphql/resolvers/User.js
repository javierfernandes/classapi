import mongoose from 'mongoose'

const User = mongoose.model('User')

export default {
  Query: {
    async users() {
      return User.find({})
    }
  }
}

