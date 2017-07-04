import mongoose from 'mongoose'

const User = mongoose.model('User')

export default {
  Query: {
    async hello() {
      return {
        greeting: 'hello'
      }
    },
    async users() {
      return User.find({})
    }
  }
}

