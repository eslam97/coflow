import Api from '@/axios'

export default {
  addManagement (payload) {
    return Api().post('management', payload)
  }
}
