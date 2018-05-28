module.exports.getTime = function(dateString = '') {
  const now = dateString ? new Date(dateString) : new Date()
  const yyyy = now.getFullYear()
  let dd = now.getDate()
  let mm = now.getMonth() + 1
  let mins = now.getMinutes()
  let hours = now.getHours()

  if(mm < 10) {
    mm = '0' + mm
  }

  if(dd < 10) {
    dd = '0' + dd
  }

  if(hours < 10) {
    hours = '0' + hours
  }

  if (mins < 10) {
    mins = '0' + mins
  }

  return `${dd}.${mm}.${yyyy} ${hours}:${mins}`
}

module.exports.composeContent = function (tweets) {
  if (tweets.length === 0)
    return `--- Nothing new this time (${this.getTime()}).`

  let content = `== New report (from ${this.getTime()} (${tweets.length} tweets)):\n\n`

  tweets.forEach((tweet) => {
    const from = this.getTime(tweet.created_at)

    content += `********* New Tweet *********\n
              Status: ${tweet.text} \n
              By: ${tweet.user.name}\n
              From: ${from}\n\n`
  })
  return content
}
