import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { enumOf } from '../utils/mongoose-utils'

const SALT_WORK_FACTOR = 10

const Schema = mongoose.Schema

export const Roles = {
  PROFESSOR: 'PROFESSOR',
  ADMIN: 'ADMIN'
}

const schema = Schema({
  created_at: { type: Date, default: Date.now },
  name: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [enumOf(Roles)]
})

// password encryption
schema.pre('save', function(next) {
  const user = this

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error)

      user.password = hash
      return next()
    })
  })
})

schema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err)
      return resolve(isMatch)
    })
  })
}

const User = mongoose.model('User', schema)

export default User