import Api from '@/axios'

export default {
  addNewLandMark (payload) {
    return Api().post('landmarks', payload)
  },
  getLandmarkDetails (id) {
    return Api().get(`landmarks/${id}`)
  },
  editLandmark (id, payload) {
    return Api().post(`landmarks/${id}`, payload)
  },
  addCoverLogo (payload) {
    return Api().post('landmark-coverLogo', payload)
  }
}
