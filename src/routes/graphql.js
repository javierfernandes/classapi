import { Router } from 'express'
import graphqlHTTP from 'express-graphql'
import { compileSchemas } from '../graphql/utils/compileSchemas'

const router = Router()
const schema = compileSchemas()
// express middleware
router.use('/', graphqlHTTP(() => ({ schema, graphiql: true })))

export default router
