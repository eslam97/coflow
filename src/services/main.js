import Api from '@/axios'

export default {
  listDataTabl (url, filter) {
    return Api().get(url, {
      params: { ...filter }
    })
  },
  addImage (payload, config) {
    return Api().post('add-image', payload, config)
  },
  removeImage (id, type) {
    return Api().get(`remove-image/${id}/${type}`)
  },
  removeRow (url, rowId) {
    console.log(url, rowId)
    return Api().delete(`${url}/${rowId}`)
  }
}
