import Api from '@/axios'

export default {
  getProfileDetails (id) {
    return Api().get(`profile/${id}`)
  },
  editProfile (id, payload) {
    return Api().post(`profile/${id}`, payload)
  }
}
