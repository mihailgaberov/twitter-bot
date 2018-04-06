const Twit = require('twit')
const config = require('./config')

const Twitter = new Twit(config)

const sendDirectMessage = function () {
  const params = {
    q: '#js, #javascript, #JavaScript, #JS, #Javascript, #react, #reactjs, #nodejs, #Nodejs',
    result_type: 'recent',
    lang: 'en'
  }
  Twitter.get('search/tweets', params, function (err, data) {
    if (!err) {
      const tweetId = data.statuses[0].id_str
      const createdAt = data.statuses[0].created_at
      const source = data.statuses[0].source
      const tweetText = data.statuses[0].text
      const userThatTweeted = data.statuses[0].user.name
      const userDescription = data.statuses[0].user.description
      const userFollowersCount = data.statuses[0].user.followers_count
      const userFriendsCount = data.statuses[0].user.friends_count
      const userStatusesCount = data.statuses[0].user.statuses_count

      Twitter.post('direct_messages/events/new', {
        event: {
          'type': 'message_create',
          'message_create': {
            'target': {
              'recipient_id': '390602997'
            },
            'message_data': {
              'text': `Tweet ID: ${tweetId}
              Created at: ${createdAt}
              Source: ${source}
              Content: ${tweetText}
              By: ${userThatTweeted}
              With desc: ${userDescription}
              With ${userFollowersCount} followers
              And ${userFriendsCount} friends
              Tweeted so far ${userStatusesCount} statuses.`,
            }
          }
        }
      }, function (err, response) {
        if (response) {
          console.log('Message sent. Response: ', response)
        }
        if (err) {
          console.log('Something went wrong while sending message. Error: ', err)
        }
      })
    } else {
      console.log('Something went wrong while searching.')
    }
  })
}

sendDirectMessage()
