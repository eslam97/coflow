import Api from '@/axios'

export default {
  filterForSendNotifications (payload) {
    return Api().post('users', payload)
  }
}
