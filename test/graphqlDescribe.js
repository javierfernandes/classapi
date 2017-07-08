import { graphql } from 'graphql'
import mongoose from 'mongoose'
import { Mockgoose } from 'mockgoose'
import '../src/models/all'
import { expect } from 'chai'
import { compileSchemas } from '../src/graphql/utils/compileSchemas'

const mockgoose = new Mockgoose(mongoose)

const internalDescribeQL = (describeFn) => (title, body) => {
  describeFn(title, () => {
    let schema

    before(async () => {
      await mockgoose.prepareStorage()
      await mongoose.connect('mongodb://example.com/TestingDB')
      schema = compileSchemas()
    });

    after(done => {
      mongoose.disconnect(done)
    })

    afterEach(() => mockgoose.helper.reset())

    const expectQueryResult = async (query, expected) => {
      expect(await graphql(schema, query)).to.deep.equal({
        data: expected
      })
    }

    body(expectQueryResult, schema)
  })
}

export const describeGQL = internalDescribeQL(describe)
describeGQL.only = internalDescribeQL(describe.only)
describeGQL.skip = internalDescribeQL(describe.skip)


