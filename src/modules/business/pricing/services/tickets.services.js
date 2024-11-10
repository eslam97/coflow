import Api from '@/axios'

export default {
  getAllTicketsLimit () {
    return Api().get('tickets?limit=1000')
  },
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
