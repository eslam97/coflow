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
  },
  addNewPurchase (payload) {
    return Api().post('newPurchase', payload)
  },
  addNewGift (payload) {
    return Api().post('newGift', payload)
  },
  collectPurchase (id, serviceId) {
    return Api().get(`collect/${id}?service_id=${serviceId}`)
  },
  refundPurchase (id, amount) {
    return Api().get(`refund/${id}?amount=${amount}`)
  },
  cancelPurchase (id) {
    return Api().get(`cancel/${id}`)
  }
}
