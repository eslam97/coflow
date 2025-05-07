import Api from '@/axios'

export default {
  getAllUsers () {
    return Api().get('users')
  }
}
