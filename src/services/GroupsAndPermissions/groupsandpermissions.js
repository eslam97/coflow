import Api from '@/axios'

export default {
  getAllGroups () {
    return Api().get('roles/permissions/create')
  },
  updateGroups (groups) {
    return Api().post('roles/permissions/sort/group', { groups: groups })
  },
  getAllPermissionToEditName () {
    return Api().get('roles/permissions')
  },
  updatePermissionName (permissions) {
    return Api().post('roles/permissions/update', { permissions: permissions })
  }
}
