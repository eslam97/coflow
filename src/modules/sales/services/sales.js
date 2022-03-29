import Api from '@/axios'

export default {
  getUserCallData ({ pageNumber, search, project, userId, callStatusId, inquiry, source, from, dateFrom, dateTo, category }) {
    return Api().get(`sales/leads?page=${pageNumber}&search=${search}&project_id=${project}&user=${userId}&call_status_id=${callStatusId}&inquiry_id=${inquiry}&source_id=${source}&from_id=${from}&date_from=${dateFrom}&date_to=${dateTo}&category=${category}`)
  },
  getNewUserCallData (status) {
    return Api().post(`sales/reservation/${status}`)
  },
  getAllStatus () {
    return Api().get('sales/create')
  },
  changeStatusCall (payload) {
    return Api().post('sales/change/status', payload)
  },
  addComment (payload) {
    return Api().post('sales/comment', payload)
  },
  getSalesWidget (filter) {
    return Api().get(`sales/widget?time=${filter}`)
  }
}
