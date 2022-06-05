import Api from '@/axios'

export default {
  changeStatus (payload) {
    return Api().post('update-status', payload)
  }
}
