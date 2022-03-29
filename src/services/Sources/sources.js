import Api from '@/axios'

export default {
  addsources (sourcesData) {
    return Api().post('leads/settings/sources/store', sourcesData)
  },
  getAllsources (pageNumber, filterTitle, filterStatus) {
    return Api().get(`leads/settings/sources?page=${pageNumber}&title=${filterTitle}&status=${filterStatus}`)
  },
  getSpacificsources (sourcesId) {
    return Api().get(`leads/settings/sources/${sourcesId}`)
  },
  editsources (sourcesId, newData) {
    return Api().post(`leads/settings/sources/${sourcesId}`, newData)
  },
  deletesources (sourcesId) {
    return Api().delete(`leads/settings/sources/${sourcesId}`)
  },
  changeStatussources (sourcesId) {
    return Api().patch(`leads/settings/sources/status/${sourcesId}`)
  }
}
