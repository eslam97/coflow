import Api from '@/axios'

export default {
  getAllPromotions () {
    return Api().get('promotions')
  },
  getPromotionDetails (id) {
    return Api().get(`promotions/${id}`)
  },
  addPromotion (payload) {
    return Api().post('promotions', payload)
  },
  editPromotion (id, payload) {
    return Api().post(`promotions/${id}`, payload)
  }
}
