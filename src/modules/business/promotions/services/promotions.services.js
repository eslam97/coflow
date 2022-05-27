import Api from '@/axios'

export default {
  getAllPromotions () {
    return Api().get('promotions')
  },
  addPromotion (payload) {
    return Api().post('promotions', payload)
  }
}
