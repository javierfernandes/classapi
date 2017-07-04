import { getSchema } from '@risingstack/graffiti-mongoose';
import mongoose from 'mongoose'
import '../../models/all'
import fs from 'fs'
import path from 'path'
import { printSchema } from 'graphql'

const options = {
  mutation: false,
  allowMongoIDMutation: false
}
const models = mongoose.modelNames().map(name => mongoose.model(name))
const schema = getSchema(models, options)

// save to file
fs.writeFileSync(
  path.join(__dirname, './schema-mongoose.graphql'),
  printSchema(schema)
)