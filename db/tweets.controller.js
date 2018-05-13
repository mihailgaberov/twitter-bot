const mongoose = require('mongoose');
const Tweet = mongoose.model('Tweet')

const fetchTweets = function () {
  return Tweet.find({})
    .then((tweets) => {
      return tweets
    })
    .catch((err) => console.log('Fetching tweets failed: ', err))
}

const recordTweet = function ({ id_str, text, user }) {
  const tweet = new Tweet({
    id_str: id_str,
    status: text,
    author: user.name
  })

  tweet.save()
    .then((tweet) => console.log('Tweet recorded: ', tweet))
    .catch((err) => console.log('Tweet recording failed: ', err))
}

const clearCollection = function () {
  return Tweet.remove({})
    .then(() => console.log('Collection cleared.'))
    .catch((err) => console.log('Clearing collection failed: ', err))
}

module.exports.recordUniqueTweets = function (tweets) {
  clearCollection()

  tweets.forEach((tweet) => {
    recordTweet(tweet)
  })
}

module.exports.getUniqueTweets = function (latestTweets) {
  return fetchTweets()
    .then((recordedTweets) => {
      return latestTweets.filter((newTweet) => recordedTweets.find((recorderTweet) => recorderTweet.id_str !== newTweet.id_str) === undefined)
    })
}