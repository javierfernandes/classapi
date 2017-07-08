[![Build Status](https://travis-ci.org/javierfernandes/classapi.svg?branch=master)](https://travis-ci.org/javierfernandes/classapi)
[![Dependencies](https://david-dm.org/javierfernandes/classapi.svg)](https://david-dm.org/javierfernandes/classapi.svg)
[![Test Coverage](https://codeclimate.com/github/javierfernandes/classapi/badges/coverage.svg)](https://codeclimate.com/github/javierfernandes/classapi/coverage)
# classapi
[GraphQL](http://graphql.org/) API for Classy

An example GraphQL API for [NodeJS](https://nodejs.org/)

* written in ES6 (with [babel](https://babeljs.io/))
* with a [mongo](http://www.mongodb.com) ([mongoose](http://mongoosejs.com/)) datastore.
* with [expressjs](http://expressjs.com/) as server
* with [mocha](https://mochajs.org/) and [mockgoose](https://github.com/mockgoose/mockgoose) integration tests

# Run

To run you need to have a local **mongodb** running.
Then

```bash
yarn install
yarn start
```

And head to `http://localhost:5001/graphql`

## Schema

The GraphQL schema gets compiled by assembling several files. The intention behind this is to keep the schema as modular as possible.

It follows a folder and file name convention, within `src/graphql`.
This is the basic structure

```bash
graphql/
   ├── mutations   // files defining mutation queries
   ├── queries     // files defining queries
   ├── resolvers   // files to define resolvers for queries/mutations (and type fields)
   ├── types       // files to define types
   └── utils       // utilities scripts to compile the schema, and stuffs
```

Explanation
* **mutations / queries / types:** are defined in `.graphql` files using the graphql schema language. No implementation there
* **resolvers**: `.js` files with code for resolvers (see further sections)

## Types

Types gets "combined/merged" from all files in the `types` folder.
Files can have any name. They just need to be `.graphql` and of course written in that language.

For example
```graphql
type HelloResponse {
  greeting: String
}
```

They can contain any number of types
```graphql
type User {
  _id: String
  name: String
  roles: [Role]
}

enum Role {
  PROFESSOR
  ADMIN
}
```

## Queries

Similar to types. They should be `.grapqhl` files but in this case you need to understand that each file is defining the **body of the ROOT QUERY type**.
There you don't need to define a type but its fields/members, that in this case are queries.

Following the hello example

```graphql
hello: HelloResponse
```

This file defined a single query called hello, which doesn't receive any parameters, and returns a type HelloResponse (which is the type we already defined).

Of course a file can contain many queries
```bash
users: [User]
userByName(name: String!): User
```

## Mutations

Exactly the same as for **queries**: `.graphql` files with any name, specifying 1 or more  mutations.
For example

```graphql
userForgotPassword(name: String!) : User
```

## Resolvers

Resolvers are the actual logic to resolve data from parts of the queries, so this again are any number of files, with any name, but in javascript of course !

They **must have a default export, exporting an object including the fields you want to provide resolvers for**.

For example to resolve a query, as they all are merged into the root **Query** type, you must export and object with this structure

```json
{
  Query: {
     query1() {},
     query2() {},
     // etc
  }
}
```

For our hello example

```js
export default {
  Query: {
    async hello() {
      return {
        greeting: 'hello'
      }
    }
  }
}
```

## Full folder example

Here is an example full tree structure

```bash
graphql/
   ├── mutations
   │   └── Hello.graphql
   ├── queries
   │   ├── Hello.graphql
   │   ├── Subject.graphql
   │   └── User.graphql
   ├── resolvers
   │   ├── Hello.js
   │   ├── Subject.js
   │   └── User.js
   ├── types
   │   ├── Hello.graphql
   │   ├── Subject.graphql
   │   └── User.graphql
   └── utils
       ├── compileSchemas.js
       └── generateSchemaFromMongoose.js
```

