import Api from '@/axios'

export default {
  addNewAccommodation (payload) {
    return Api().post('accommodations', payload)
  },
  getAccommodationsDetails (id) {
    return Api().get(`accommodations/${id}`)
  },
  editAccommodation (id, payload) {
    return Api().post(`accommodations/${id}`, payload)
  }
}
