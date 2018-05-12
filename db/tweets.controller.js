const mongoose = require('mongoose');
const Tweet = mongoose.model('Tweet')

module.exports.saveTweet = function () {
  const tweet = new Tweet({
    id_str: '333344444444444',
    status: 'Bla bla bla.',
    author: 'Mihail Gaberov'
  })

  tweet.save()
    .then((tweet) => console.log('Tweet recorded: ', tweet))
    .catch((err) => console.log('Tweet recording failed: ', err))
}

module.exports.fetchTweets = function () {
  return Tweet.find({})
    .then((tweets) => {
      return tweets
    })
    .catch((err) => console.log('Fetching tweets failed: ', err))
}