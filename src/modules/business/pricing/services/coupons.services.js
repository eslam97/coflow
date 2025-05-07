import Api from '@/axios'

export default {
  getAllCouponsLimit () {
    return Api().get('coupons?limit=1000')
  },
  addCoupon (payload) {
    return Api().post('coupons', payload)
  },
  editCoupon (id, payload) {
    return Api().post(`coupons/${id}`, payload)
  }
}
