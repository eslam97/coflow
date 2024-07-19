import Api from '@/axios'

export default {
  addNewActivity (payload) {
    return Api().post('tickets', payload)
  },
  getActivityDetails (id) {
    return Api().get(`tickets/${id}`)
  },
  editActivity (id, payload) {
    return Api().post(`tickets/${id}`, payload)
  }
}
