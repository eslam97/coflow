import Api from '@/axios'

export default {
  getAllUser (pageNumber, filterTitle, filterStatus, filterRole) {
    return Api().get(`users?page=${pageNumber}&name=${filterTitle}&status=${filterStatus}&role=${filterRole}`)
  },
  getSpacificUser (userId) {
    return Api().get(`users/${userId}`)
  },
  createNewUser (userData) {
    return Api().post('auth/register', userData)
  },
  deleteUser (userId) {
    return Api().delete(`users/${userId}`)
  },
  editUser (userId, newData) {
    return Api().post(`/users/${userId}`, newData)
  },
  changeUserStatus (userId) {
    return Api().patch(`/users/status/${userId}`)
  },
  resetUser (userId) {
    return Api().patch(`/users/reset/role/${userId}`)
  },
  editCustomRole (userId, data) {
    return Api().post(`/users/custom/role/${userId}`, data)
  },
  resetRole (userId) {
    return Api().patch(`/users/reset/role/${userId}`)
  },
  serachAboutUser (user, permissions) {
    return Api().get(`/users/permission/search?name=${user}&permissions=${permissions}`)
  }
}
