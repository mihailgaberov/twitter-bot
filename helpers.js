function getCurrentTime() {
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

exports.getCurrentTime = getCurrentTime