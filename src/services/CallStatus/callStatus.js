import Api from '@/axios'

export default {
  addcallStatus (callStatusData) {
    return Api().post('leads/settings/call-status/store', callStatusData)
  },
  getAllcallStatus (pageNumber, filterTitle, filterStatus) {
    return Api().get(`leads/settings/call-status?page=${pageNumber}&title=${filterTitle}&status=${filterStatus}`)
  },
  getSpacificcallStatus (callStatusId) {
    return Api().get(`leads/settings/call-status/${callStatusId}`)
  },
  editcallStatus (callStatusId, newData) {
    return Api().post(`leads/settings/call-status/${callStatusId}`, newData)
  },
  deletecallStatus (callStatusId) {
    return Api().delete(`leads/settings/call-status/${callStatusId}`)
  },
  changeStatuscallStatus (callStatusId) {
    return Api().patch(`leads/settings/call-status/status/${callStatusId}`)
  }
}
