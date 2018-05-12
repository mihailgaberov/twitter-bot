const Tweet = require('./tweets.model')

module.exports.saveTweets = function() {
  const tweet = new Tweet({
    id_str: '12312312312',
    status: 'test status a lanalabalbala bala.',
    author: 'Mihail Gaberov'
  })

  tweet.save()
    .then(() => console.log('>>> success'))
    .catch((err)=> console.log('>>>error: ', err))
}