import Api from '@/axios'

export default {
  getDashboardHome () {
    return Api().get('dashboard-home')
  },
  getMarketBusiness (cityId) {
    return Api().get(`market-business/${cityId}`)
  },
  getAnalytics (from, to) {
    return Api().get(`analytics/${from}/${to}`)
  }
}
