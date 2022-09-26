import Api from '@/axios'

export default {
  getActivationDetails (id) {
    return Api().get(`providers/${id}`)
  },
  addNewProfile (payload) {
    return Api().post('providers', payload)
  },
  editProfile (id, payload) {
    return Api().post(`providers/${id}`, payload)
  },
  changeProfileCanLogin (id, payload) {
    return Api().post(`can-login/${id}`, payload)
  }
}
