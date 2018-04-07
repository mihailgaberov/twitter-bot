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
      let content = `=========== Daily report (${data.statuses.length})=================\n`

      data.statuses.forEach((status) => {
        content += `--------------- New Tweet ---------------\n             
              Created at: ${status.created_at} \n
              Source: ${status.source} \n
              Status text: ${status.text} \n
              By: ${status.user.name} \n
              With desc: ${status.user.description} \n
              With: ${status.user.followers_count} followers \n
              And: ${status.user.friends_count} friends \n
              Tweeted so far: ${status.user.statuses_count} statuses.\n\n`
      })

      Twitter.post('direct_messages/events/new', {
        event: {
          'type': 'message_create',
          'message_create': {
            'target': {
              'recipient_id': '390602997'
            },
            'message_data': {
              'text': content,
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
