import Api from '@/axios'

export default {
  getTicketDetails (id) {
    return Api().get(`tickets/${id}`)
  },
  createTicket (payload) {
    return Api().post('tickets', payload)
  },
  updateTicket (id, payload) {
    return Api().post(`tickets/${id}`, payload)
  }
}
