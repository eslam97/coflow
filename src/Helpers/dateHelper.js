import Vue from 'vue'

Vue.prototype.$dataTime = function (allDateDetails) {
  var onlyDate = allDateDetails.substring(0, 10)
  var time = allDateDetails.substring(11, 19)
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/)
  // console.log(time)
  if (time.length > 1) {
    time = time.slice(1)
    time[0] = Number(time[0])
    time[5] = +time[0] < 12 ? 'AM' : 'PM'
    time[0] = +time[0] % 12 || 12
  }
  time.splice(3, 1, ' ')
  return onlyDate + '\n' + time.join('')// return adjusted time or original string
}
Vue.prototype.$timeConvertWhatsapp = function (allDateDetails) {
  var onlyDate = allDateDetails.substring(0, 10)
  var time = allDateDetails.substring(11, 19)
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/)
  // console.log(time)
  if (time.length > 1) {
    time = time.slice(1)
    time[0] = Number(time[0]) + 2
    time[5] = +time[0] < 12 ? 'AM' : 'PM'
    time[0] = +time[0] % 12 || 12
  }
  time.splice(3, 1, ' ')
  return onlyDate + '\n' + time.join('')// return adjusted time or original string
}
Vue.prototype.$timeConvertBackEnd = function (allDateDetails) {
  var onlyDate = allDateDetails.substring(0, 10)
  var time1 = allDateDetails.substring(11)
  time1 = time1.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/)
  if (time1.length > 1) {
    time1 = time1.slice(1)
    time1[0] = Number(time1[0])
    time1[5] = +time1[0] < 12 ? 'AM' : 'PM'
    time1[0] = +time1[0] % 12 || 12
  }
  time1.splice(3, 1, ' ')
  return onlyDate + '\n' + time1.join('')// return adjusted time or original string
}
