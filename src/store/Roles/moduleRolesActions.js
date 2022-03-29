import roleServices from '@/services/Roles/roles'

export default {
  createNewRole ({ dispatch }, roleData) {
    roleData.is_active ? roleData.is_active = 1 : roleData.is_active = 0
    return new Promise((resolve, reject) => {
      roleServices.addRoles(roleData).then(res => {
        dispatch('getAllRole', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getAllRole ({ commit }, { pageNumber = 1, filterTitle = '', filterStatus = '' }) {
    return new Promise((resolve, reject) => {
      roleServices.getAllRoles(pageNumber, filterTitle, filterStatus).then(res => {
        commit('getAllRoles', res.data.data)
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  deleteRole ({ dispatch }, roleId) {
    return new Promise((resolve, reject) => {
      roleServices.deleteProject(roleId).then(res => {
        dispatch('getAllRole', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  editRole ({ dispatch }, payload) {
    payload.newData.is_active ? payload.newData.is_active = 1 : payload.newData.is_active = 0
    return new Promise((resolve, reject) => {
      roleServices.editRole(payload.roleId, payload.newData).then(res => {
        dispatch('getAllRole', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  GetSpacificRole ({ commit }, roleId) {
    return new Promise((resolve, reject) => {
      roleServices.getSpacificRole(roleId).then(res => {
        commit('getSpacificRole', res.data.data)
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  roleToCreate ({ commit }) {
    return new Promise((resolve, reject) => {
      roleServices.roleToCreate().then(res => {
        commit('roleToCreate', res.data.data)
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  changeRoleStatus  (_, statusId) {
    return new Promise((resolve, reject) => {
      roleServices.changeRoleStatus(statusId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
