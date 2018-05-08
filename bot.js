const Twit = require('twit')
const config = require('./config')
const helpers = require('./helpers')

const Twitter = new Twit(config)

const sendDirectMessage = function () {
  const params = {
    q: '#js OR #JavaScript OR #react OR #reactjs OR #nodejs OR #Nodejs, -filter:retweets',
    result_type: 'recent',
    lang: 'en'
  }
  Twitter.get('search/tweets', params, function (err, data) {
    if (!err) {
      let content = `== New report (from ${helpers.getCurrentTime()} (${data.statuses.length} tweets)) ==\n`

      data.statuses.forEach((status) => {
        content += `--- New Tweet:\n
              Status text: ${status.text} \n
              By: ${status.user.name}\n\n`
      })

      Twitter.get('followers/ids', {
        user_id: 982290988562608129,
        screen_name: 'herrklinkerhof3'
      }, function (err, response) {
        if (err) {
          console.log('Something went wrong while getting followers. Error: ', err)
        }

        if (response) {
          response.ids.forEach((id) => {
            Twitter.post('direct_messages/events/new', {
              event: {
                'type': 'message_create',
                'message_create': {
                  'target': {
                    'recipient_id': id
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
          })
        }
      })


    } else {
      console.log('Something went wrong while searching.')
    }
  })
}

sendDirectMessage()
