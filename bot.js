const Twit = require('twit')
const config = require('./config')
const helpers = require('./helpers')

require('./db/db')
const db = require('./db/tweets.controller')

const Twitter = new Twit(config)

const sendDirectMessage = function () {
  const params = {
    q: '#js OR #JavaScript OR #react OR #reactjs OR #nodejs OR #Nodejs OR #GraphQL, -filter:retweets',
    result_type: 'recent',
    lang: 'en'
  }

  Twitter.get('search/tweets', params, function (err, data) {
    if (!err) {
      db.getUniqueTweets(data.statuses).then((tweets) => {
        db.recordUniqueTweets(tweets)
      })
    } else {
      console.log('Something went wrong while searching.')
    }
  })
}

sendDirectMessage()
