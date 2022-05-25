import Api from '@/axios'

export default {
  getActivationDetails (id) {
    return Api().get(`activations/${id}`)
  },
  activateProvider (id, payload) {
    return Api().post(`activations/${id}`, payload)
  }
}
