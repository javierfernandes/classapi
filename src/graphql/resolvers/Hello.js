export default {
  Query: {
    async users() {
      return User.find({})
    }
  }
}

