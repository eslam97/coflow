import Api from '@/axios'

export default {
  listDataTabl (url, filter) {
    return Api().get(url, {
      params: filter
    })
  },
  addImage (payload, config) {
    return Api().post('add-image', payload, config)
  },
  removeImage (id, type) {
    return Api().get(`remove-image/${id}/${type}`)
  },
  removeRow (url, rowId, method = 'delete') {
    console.log(url, rowId)
    const api = rowId ? url + '/' + rowId : url
    return Api()[method](`${api}`)
  },
  changeStatus (payload) {
    return Api().post('change-status', payload)
  },
  changeSort (payload) {
    return Api().post('update-sort', payload)
  }
}
