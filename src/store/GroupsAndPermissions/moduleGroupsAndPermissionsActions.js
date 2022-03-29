import groupsServices from '@/services/GroupsAndPermissions/groupsandpermissions'

export default {
  getAllGroups (_) {
    return new Promise((resolve, reject) => {
      groupsServices.getAllGroups().then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateGroups (_, group) {
    return new Promise((resolve, reject) => {
      groupsServices.updateGroups(group).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAllPermissionToEditName () {
    return new Promise((resolve, reject) => {
      groupsServices.getAllPermissionToEditName().then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updatePermissionName (_, permission) {
    return new Promise((resolve, reject) => {
      groupsServices.updatePermissionName(permission).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
