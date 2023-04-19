import Api from '@/axios'

export default {
  addNewFAQ (payload) {
    return Api().post('admin-FAQ', payload)
  },
  getFAQsDetails (id) {
    return Api().get(`admin-FAQ/${id}`)
  },
  editFAQ (id, payload) {
    return Api().post(`admin-FAQ/${id}`, payload)
  }
}
