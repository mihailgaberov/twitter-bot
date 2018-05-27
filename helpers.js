module.exports.getCurrentTime = function() {
  const now = new Date()
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
    return `--- Nothing new this time (${this.getCurrentTime()}).`

  let content = `== New report (from ${this.getCurrentTime()} (${tweets.length} tweets)) ==\n`

  tweets.forEach((tweet) => {
    content += `*** New Tweet*******\n
              Status: ${tweet.text} \n
              By: ${tweet.user.name}\n
              From: ${tweet.created_at}\n\n`
  })

  return content
}