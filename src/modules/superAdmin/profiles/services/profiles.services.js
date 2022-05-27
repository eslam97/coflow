import Api from '@/axios'

export default {
  getActivationDetails (id) {
    return Api().get(`providers/${id}`)
  },
  addNewProfile (payload) {
    return Api().post('providers', payload)
  },
  changeProfileCanLogin (id, payload) {
    return Api().post(`providers/${id}`, payload)
  }
}
