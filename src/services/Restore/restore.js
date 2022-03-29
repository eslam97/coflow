import Api from '@/axios'

export default {
  getAllHeaderRestore () {
    return Api().get('restores/create')
  },
  getDataToRestore (model, pageNumber) {
    return Api().get(`restores/${model}?page=${pageNumber}`)
  },
  restoreRow (model, rowId) {
    return Api().patch(`restores/${model}/${rowId}`)
  }
}
