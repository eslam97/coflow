import Api from '@/axios'

export default {
  getAllFlows () {
    return Api().get('all-flows')
  },
  addNewFlow (payload) {
    return Api().post('flows', payload)
  },
  getFlowsDetails (id) {
    return Api().get(`flows/${id}`)
  },
  editFlow (id, payload) {
    return Api().post(`flows/${id}`, payload)
  }
}
