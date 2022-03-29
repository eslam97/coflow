import Pusher from 'pusher-js'

// Pusher.logToConsole = true

var pusher = new Pusher('95bfc05a0f46cec8d241', {
  cluster: 'eu',
  encrypted: true
})
var channel = pusher.subscribe(`user_${JSON.parse(localStorage.getItem('user_info')).id}`)
var channelLog = pusher.subscribe(`log_${JSON.parse(localStorage.getItem('default_project')).id}`)

export default { channel, channelLog }
