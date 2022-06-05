import Api from '@/axios'

export default {
  getAllProducts () {
    return Api().get('products')
  },
  getProductDetails (id) {
    return Api().get(`products/${id}`)
  },
  editProduct (id, payload) {
    return Api().post(`products/${id}`, payload)
  },
  addProduct (payload) {
    return Api().post('products', payload)
  }
}
