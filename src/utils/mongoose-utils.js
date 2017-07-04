import mongoose from 'mongoose'

const Schema = mongoose.Schema

import { propertyValues } from '../utils/object'

export const enumOf = (enumSpec, defValue, type = String) => ({
  type,
  enum: propertyValues(enumSpec),
  ...(defValue && { default: defValue })
})


export const refTo = modelName => ({ type: Schema.Types.ObjectId, ref: modelName })

export const Mixed = Schema.Types.Mixed
