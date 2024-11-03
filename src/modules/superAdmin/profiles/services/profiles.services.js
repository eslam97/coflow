import Api from '@/axios'

export default {
  getActivationDetails (id) {
    return Api().get(`facilities/${id}`)
  },
  addNewProfile (payload) {
    return Api().post('facilities', payload)
  },
  editProfile (id, payload) {
    return Api().post(`facilities/${id}`, payload)
  },
  changeProfileCanLogin (id, payload) {
    return Api().post(`can-login/${id}`, payload)
  },
  editProfileNote (id, payload) {
    return Api().post(`edit-notes/${id}`, payload)
  }
}
