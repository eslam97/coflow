import Api from '@/axios'

export default {
  getActivationDetails (id) {
    return Api().get(`providers/${id}`)
  }
}