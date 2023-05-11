import Api from '@/axios'

export default {
  makeBusinessRequest (payload) {
    return Api().post('register', payload)
  },
  login (payload) {
    return Api().post('login', payload)
  },
  getData () {
    return Api().get('all-data')
  },
  forgetPassword (payload) {
    return Api().post('forgetPassword', payload)
  },
  sendFirebase (payload) {
    return Api().post('fcm-token', { token: payload })
  }
}
