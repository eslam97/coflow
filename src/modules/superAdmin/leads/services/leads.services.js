import Api from '@/axios'

export default {
  showLeadData (leadId) {
    return Api().get(`leads/${leadId}`)
  },
  changeStatusLead (leadId, payload) {
    return Api().post(`leads/${leadId}`, payload)
  }
}
