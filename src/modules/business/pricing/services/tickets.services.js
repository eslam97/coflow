import Api from '@/axios'

export default {
  addNewTicket (payload) {
    return Api().post('tickets', payload)
  },
  getTicketDetails (id) {
    return Api().get(`tickets/${id}`)
  },
  editTicket (id, payload) {
    return Api().post(`tickets/${id}`, payload)
  }
}
