import Api from '@/axios'

export default {
  addRoles (roleData) {
    return Api().post('roles/store', roleData)
  },
  getAllRoles (pageNumber, filterTitle, filterStatus) {
    return Api().get(`roles?page=${pageNumber}&name=${filterTitle}&status=${filterStatus}`)
  },
  getSpacificRole (roleId) {
    return Api().get(`roles/${roleId}`)
  },
  editRole (roleId, newData) {
    return Api().post(`roles/${roleId}`, newData)
  },
  deleteRole (roleId) {
    return Api().delete(`roles/${roleId}`)
  },
  roleToCreate () {
    return Api().get('roles/create')
  },
  changeRoleStatus (statusId) {
    return Api().patch(`roles/status/${statusId}`)
  }
}
