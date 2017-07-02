import express from 'express'
import packageInfo from '../../package.json'

const router = express.Router()

router.head('/', (req, res) => { res.status(200).send() })
router.get('/', (req, res) => { res.status(200).json({
  api: {
    name: packageInfo.name,
    version: packageInfo.version
  }
})})

export default router
