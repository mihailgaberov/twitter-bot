const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  id_str: {
    type: String,
    unique: true,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  created_at: {
    type: String,
    required: true
  }
})
mongoose.model('Tweet', tweetSchema)