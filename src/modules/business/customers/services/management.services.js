import Api from '@/axios'

export default {
  addManagement (payload) {
    return Api().post('management', payload)
  },
  searchCustomer (phone) {
    return Api().get(`customer-search?phone=${phone}`)
  },
  getCustomerDetails (customerId) {
    return Api().get(`customers/${customerId}`)
  }
}
