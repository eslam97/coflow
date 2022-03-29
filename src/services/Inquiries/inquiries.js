import Api from '@/axios'

export default {
  addinquiries (inquiriesData) {
    return Api().post('leads/settings/inquiries/store', inquiriesData)
  },
  getAllinquiries (pageNumber, filterTitle, filterStatus) {
    return Api().get(`leads/settings/inquiries?page=${pageNumber}&title=${filterTitle}&status=${filterStatus}`)
  },
  getSpacificinquiries (inquiriesId) {
    return Api().get(`leads/settings/inquiries/${inquiriesId}`)
  },
  editinquiries (inquiriesId, newData) {
    return Api().post(`leads/settings/inquiries/${inquiriesId}`, newData)
  },
  deleteinquiries (inquiriesId) {
    return Api().delete(`leads/settings/inquiries/${inquiriesId}`)
  },
  changeStatusinquiries (inquiriesId) {
    return Api().patch(`leads/settings/inquiries/status/${inquiriesId}`)
  }
}
