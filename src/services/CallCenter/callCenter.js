import Api from '@/axios'

export default {
  getUserCallData (pageNumber, search, project, userId, callStatusId, inquiry, source, from, dateFrom, dateTo, ifNew, category, noHistory) {
    return Api().get(`sales/leads?page=${pageNumber}&search=${search}&project_id=${project}&user=${userId}&call_status_id=${callStatusId}&inquiry_id=${inquiry}&source_id=${source}&from_id=${from}&date_from=${dateFrom}&date_to=${dateTo}&category=${category}`)
  },
  getNewUserCallData (status) {
    return Api().post(`sales/reservation/${status}`)
  },
  getSalesCreate () {
    return Api().get('sales/create')
  },
  changeStatusCall (data) {
    return Api().post('sales/change/status', data)
  },
  addComment (data) {
    return Api().post('sales/comment', data)
  }
}
