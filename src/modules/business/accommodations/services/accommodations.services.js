import Api from '@/axios'

export default {
  addNewAccommodations (payload) {
    return Api().post('accommodations', payload)
  },
  getAccommodationsDetails (id) {
    return Api().get(`accommodations/${id}`)
  },
  editAccommodations (id, payload) {
    return Api().post(`accommodations/${id}`, payload)
  }
}
