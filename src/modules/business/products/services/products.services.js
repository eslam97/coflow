import Api from '@/axios'

export default {
  getAllProducts () {
    return Api().get('products')
  },
  getProductDetails (id) {
    return Api().get(`products/${id}`)
  },
  addProduct (payload) {
    return Api().post('products', payload)
  }
}
