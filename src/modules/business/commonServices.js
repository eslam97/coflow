import Api from '@/axios'

export default {
  getFacilityTags () {
    return Api().get('facility-tags')
  },
  addNewServices (payload) {
    return Api().post('services', payload)
  },
  getServiceDetails (id) {
    return Api().get(`services/${id}`)
  },
  editService (id, payload) {
    return Api().post(`services/${id}`, payload)
  },
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
