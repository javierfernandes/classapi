import fs from 'fs'
import path from 'path'
import winston from 'winston'

export const loadTextFiles = (baseFolder, logPreffix = '') => (folder, regexp) => {
  const absoluteFolder = path.join(baseFolder, folder)
  const files = fs.readdirSync(absoluteFolder).filter(file => file.endsWith(regexp))
  winston.log('info', `${logPreffix} Reading files on ${baseFolder}/${folder}/${regexp} found ${files.length}`)
  return files.map(file => {
    const fileAbs = path.join(absoluteFolder, file)
    winston.log('info', `${logPreffix} loading file ${fileAbs}`)
    return fs.readFileSync(fileAbs, 'utf-8')
  })
}

export const requireFiles = (folder, extension, logPreffix = '') => {
  const files = fs.readdirSync(folder).filter(file => file.endsWith(extension))
  return files.map(file => {
    const fileAbs = path.join(folder, file)
    winston.log('info', `${logPreffix} loading ${fileAbs}`)
    return require(fileAbs).default
  })
}
