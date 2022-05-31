import Api from '@/axios'

export default {
  addNewActivity (payload) {
    return Api().post('activities', payload)
  },
  getActivitiesDetails (id) {
    return Api().get(`activities/${id}`)
  },
  editActivity (id, payload) {
    return Api().post(`activities/${id}`, payload)
  }
}
