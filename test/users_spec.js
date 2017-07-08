import mongoose from 'mongoose'

import { describeGQL } from './graphqlDescribe'

const User = mongoose.model('User')

describeGQL('Users', expectQueryResult => {

  describe('query users()', () => {
    const patoruzu = {
      _id: '583ecdb6923dee586e8ddb21',
      name: 'Patoruzu',
      password: 'sarlanga'
    }
    const isidoro = {
      _id: '583ecdb6923dee586e8ddb22',
      name: 'Isidorito',
      password: 'sarlonga'
    }

    it('with a single one returns an array of one', async () => {
      await User.insertMany([patoruzu])

      await expectQueryResult(
        `query users {
          users {
            name
          }
        }`,
        {
          users: [
            { name: 'Patoruzu' }
          ]
        })
    })

    it('with 2 users only getting name', async () => {
      await User.insertMany([patoruzu, isidoro])

      await expectQueryResult(
        `query users {
          users {
            name
          }
        }`,
        {
          users: [
            { name: 'Patoruzu' },
            { name: 'Isidorito' }
          ]
        })
    })

  })

})