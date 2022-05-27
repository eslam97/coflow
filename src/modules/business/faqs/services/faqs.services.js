import Api from '@/axios'

export default {
  addNewFAQ (payload) {
    return Api().post('faq', payload)
  },
  getFAQsDetails (id) {
    return Api().get(`faq/${id}`)
  },
  editFAQ (id, payload) {
    return Api().post(`faq/${id}`, payload)
  }
}
