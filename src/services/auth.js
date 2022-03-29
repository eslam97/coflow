import Api from '@/axios'

export default {
  login (userData) {
    return Api().post('auth/login', userData)
  },
  changePassword (userPasswords) {
    return Api().post('auth/change-password', userPasswords)
  },
  create () {
    return Api().get('auth/create')
  },
  logout () {
    return Api().post('auth/logout')
  },
  resetPassword (userId, data) {
    return Api().patch(`users/reset/password/${userId}`, data)
  }
}
