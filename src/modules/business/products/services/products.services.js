import Api from '@/axios'

export default {
  getAllProducts () {
    return Api().get('products')
  },
  addProduct (payload) {
    return Api().post('products', payload)
  }
}
