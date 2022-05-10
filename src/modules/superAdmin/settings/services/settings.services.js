import Api from '@/axios'

export default {
  getProfileSettings () {
    return Api().get('settings')
  },
  updateProfileSettings (payload) {
    return Api().post('settings', payload)
  }
}
