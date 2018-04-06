const twit = require('twit')
const config = require('./config')

const Twitter = new twit(config)

const sendDirectMessage = function () {
  const params = {
    q: '#js, #javascript, #JavaScript, #JS, #Javascript, #react, #reactjs, #nodejs, #Nodejs',
    result_type: 'recent',
    lang: 'en'
  }
  Twitter.get('search/tweets', params, function (err, data) {
    if (!err) {
      const tweetId = data.statuses[0].id_str

      Twitter.post('direct_messages/events/new', {
        event: {
          'type': 'message_create',
          'message_create': {
            'target': {
              'recipient_id': '390602997'
            },
            'message_data': {
              'text': 'Tweet with ID: ' + tweetId,
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
// every 60 minutes
setInterval(sendDirectMessage, 3600000)
