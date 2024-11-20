import Api from '@/axios'

export default {
  addFolder (payload) {
    return Api().post('folders', payload)
  },
  editFolder (id, payload) {
    return Api().post(`folders/${id}`, payload)
  }
}
