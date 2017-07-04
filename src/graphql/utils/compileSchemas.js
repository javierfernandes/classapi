import _ from 'lodash'
import path from 'path'
import winston from 'winston'
import { loadTextFiles, requireFiles } from '../../utils/io'
import { makeExecutableSchema } from 'graphql-tools'
import GraphQLDate from 'graphql-custom-datetype'
import GraphQLJSON from 'graphql-type-json'

const baseFolder = path.join(__dirname, '../')
const queriesFolder = 'queries'
const typesFolder = 'types'
const mutationsFolder = 'mutations'
const resolversFolder = 'resolvers'
const customScalars = [GraphQLDate, GraphQLJSON]

const loadGraphQLFiles = folder => loadTextFiles(baseFolder, '[GraphQL]')(folder, '.graphql')

const loadSchema = () => `
  type Query {
    ${loadGraphQLFiles(queriesFolder).join('\n')}
  }

  ${customScalars.map(s => `scalar ${s.name}`).join('\n')}

  ${loadGraphQLFiles(typesFolder).join('\n')}
  type Mutation {
    ${loadGraphQLFiles(mutationsFolder).join('\n')}
  }

  schema {
    query: Query
    mutation: Mutation
  }
`

const loadResolvers = () => {
  const moduleResolvers = requireFiles(path.join(baseFolder, resolversFolder), '.js', '[GraphQL]')
  return moduleResolvers.reduce((resolvers, module) => _.merge(resolvers, module), {})
}

const scalarResolvers = () => customScalars.reduce((result, scalar) => _.merge(result, {
  [scalar.name]: scalar
}), {})

export const mergeSchemas = () => {
  winston.log('info', 'Merging schemas files')

  return {
    schema: loadSchema(),
    resolvers: {
      ...loadResolvers(),
      ...scalarResolvers()
    }
  }
}

export const compileSchemas = () => {
  const schema = mergeSchemas()
  return makeExecutableSchema({
    typeDefs: schema.schema,
    resolvers: schema.resolvers,
    logger: { log: e => winston.log('error', `[GraphQL] Error: ${e}`) }
  })
}

export default mergeSchemas
