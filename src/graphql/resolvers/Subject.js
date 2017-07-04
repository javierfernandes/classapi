import mongoose from 'mongoose'

const Subject = mongoose.model('Subject')

export default {
  Query: {
    async subjects() {
      // only fetch createdBy if queried ?
      return Subject.find({}).populate('createdBy')
    }
  }
}

