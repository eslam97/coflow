import Api from '@/axios'

export default {
  getProfileData () {
    return Api().get('profile')
  },
  changeStatus (payload) {
    return Api().post('update-status', payload)
  },
  addImage (payload) {
    return Api().post('new-media', payload)
  },
  removeImage (id) {
    return Api().get(`remove-media/${id}`)
  },
  changePassword (payload) {
    return Api().post('change-password', payload)
  }
}
