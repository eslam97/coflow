import Api from '@/axios'

export default {
  addNewFlows (payload) {
    return Api().post('flows', payload)
  },
  getFlowsDetails (id) {
    return Api().get(`flows/${id}`)
  },
  editFlows (id, payload) {
    return Api().post(`flows/${id}`, payload)
  }
}
