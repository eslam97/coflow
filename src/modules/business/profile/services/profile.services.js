import Api from '@/axios'

export default {
  changeStatus (payload) {
    return Api().post('update-status', payload)
  },
  addImage (payload) {
    return Api().post('provider-image', payload)
  },
  removeImage (id) {
    return Api().get(`remove-provider-image/${id}`)
  }
}
