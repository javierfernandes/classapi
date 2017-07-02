import * as checks from './config/checks'
import winston from 'winston'

import fs from 'fs'

export function isTest() {
  return process.env.NODE_ENV === 'test'
}

const envCode = process.env.NODE_ENV

let fileName = envCode ? `${envCode}.json` : 'prod.json'
winston.log('warn', ` ******* USING CONFIG: ${fileName}`)

if (!fs.existsSync(`${__dirname}/${fileName}`)) {
  winston.log('warn', ` ******* CONFIG: ${fileName} DOES NOT EXIST ! Defaulting to prod.json`)
  fileName = 'prod.json'
}

const json = require(`../config/${fileName}`)

winston.log('info', 'Checking configuration...')
Object.keys(checks).forEach(check => checks[check](json))

export default json

