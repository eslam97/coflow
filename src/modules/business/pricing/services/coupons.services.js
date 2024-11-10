import Api from '@/axios'

export default {
  getAllCouponsLimit () {
    return Api().get('coupons?limit=1000')
  }
}
