import Api from '@/axios'
export default {
  getSettings () {
    return Api().get('settings')
  },
  saveChangeSettings (type, value) {
    return Api().post(`settings/${type}`, { value: value, is_active: 1 })
  }
}
