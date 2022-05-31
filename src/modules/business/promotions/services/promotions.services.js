import Api from '@/axios'

export default {
  getAllPromotions (page, type) {
    return Api().get(`promotions?page=${page}&type=${type}`)
  },
  addPromotion (payload) {
    return Api().post('promotions', payload)
  },
  editPromotion (id, payload) {
    return Api().post(`promotions/${id}`, payload)
  }
}
