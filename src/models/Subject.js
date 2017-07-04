import mongoose from 'mongoose'
import { refTo } from '../utils/mongoose-utils'

const Schema = mongoose.Schema

const schema = Schema({
  createdBy: refTo('User'),
  name: { type: String, unique: true, required: true }
})

const Subject = mongoose.model('Subject', schema)
export default Subject