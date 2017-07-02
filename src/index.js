import serverFactory from './server'

(async function () {

  const config = require('./config.js').default
  const port = process.env.PORT || config.express.port || 3001;

  const app = await serverFactory()

  app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Server running on port ${port}`)
  })

}())

