import Api from '@/axios'

export default {
  getAllFolders () {
    return Api().get('folders')
  },
  addFolder (payload) {
    return Api().post('folders', payload)
  },
  editFolder (id, payload) {
    return Api().post(`folders/${id}`, payload)
  }
}
