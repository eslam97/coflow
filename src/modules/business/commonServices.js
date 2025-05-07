import Api from '@/axios'

export default {
  getFacilityTags (type) {
    return Api().get(`facility-tags?type=${type}`)
  },
  getAllServices () {
    return Api().get('services?limit=1000')
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
