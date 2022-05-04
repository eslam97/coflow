import Api from '@/axios'

export default {
  makeBusinessRequest (payload) {
    return Api().post('register', payload)
  },
  login (payload) {
    return Api().post('login', payload)
  }
}
