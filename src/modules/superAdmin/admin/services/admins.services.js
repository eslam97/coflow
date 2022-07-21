import Api from '@/axios'

export default {
  getAllPermissions () {
    return Api().get('permissions')
  },
  getAllRoles () {
    return Api().get('roles')
  },
  getRoleDetails (id) {
    return Api().get(`roles/${id}`)
  },
  editRole (id, payload) {
    return Api().post(`roles/${id}`, payload)
  },
  saveRole (payload) {
    return Api().post('roles', payload)
  },
  saveAdmin (payload) {
    return Api().post('change-password', payload)
  },
  getAdminInfo (id) {
    return Api().get(`admins/${id}`)
  },
  editAdmin (id, payload) {
    return Api().post(`admins/${id}`, payload)
  }
}
