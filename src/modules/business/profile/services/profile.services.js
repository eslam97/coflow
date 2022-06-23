import Api from '@/axios'

export default {
  getProfileData () {
    return Api().get('profile')
  },
  changeStatus (payload) {
    return Api().post('update-status', payload)
  },
  addImage (payload) {
    return Api().post('provider-image', payload)
  },
  removeImage (id) {
    return Api().get(`remove-provider-image/${id}`)
  }
}
