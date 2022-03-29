import Api from '@/axios'

export default {
  addLeads (leadData) {
    return Api().post('leads/store', leadData)
  },
  addLeadsWithStatus (leadData) {
    return Api().post('sales/leads/store', leadData)
  },
  getAllLeads (pageNumber, name, dateTo, dateFrom) {
    return Api().get(`/leads?page=${pageNumber}&search=${name}&date_from=${dateFrom}&date_to=${dateTo}`)
  },
  getSpacificLeads (leadId) {
    return Api().get(`/leads/${leadId}`)
  },
  getInfoToCreateLead () {
    return Api().get('leads/create')
  },
  getDataByPhoneNumber (phoneNumber) {
    return Api().post('leads/check-phone', phoneNumber)
  },
  editLead (laedId, newData) {
    return Api().post(`/lead/${laedId}`, newData)
  },
  deleteLead (leadId) {
    return Api().delete(`/lead/${leadId}`)
  },
  getLeadFrom (pageNumber, filterTitle, filterStatus) {
    return Api().get(`/leads/settings/from?page=${pageNumber}&title=${filterTitle}&status=${filterStatus}`)
  },
  createNewLeadFrom (leadData) {
    return Api().post('/leads/settings/from/store', leadData)
  },
  editLeadFrom (laedId, newData) {
    return Api().post(`/leads/settings/from/${laedId}`, newData)
  },
  getSpacificFrom (fromID) {
    return Api().get(`/leads/settings/from/${fromID}`)
  },
  deleteSpacificLeadFrom (fromId) {
    // eslint-disable-next-line no-undef
    return Api().delete(`/leads/settings/from/${fromId}`)
  },
  changeStatusFrom (fromId) {
    return Api().patch(`/leads/settings/from/status/${fromId}`)
  },
  gitHistory (id, pageNumber) {
    return Api().get(`sales/history/${id}?page=${pageNumber}`)
  },
  getModeratorsWidget (filter) {
    return Api().get(`leads/moderators/widget?time=${filter}`)
  },
  getSalesWidget (filter) {
    return Api().get(`sales/widget?time=${filter}`)
  }
}
