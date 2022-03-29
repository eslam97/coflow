import userServices from '@/services/Users/users'
// import router from '@/router/index';
export default {
  createNewUser ({ commit }, newUserData) {
    newUserData.is_active ? newUserData.is_active = 1 : newUserData.is_active = 0
    return new Promise((resolve, reject) => {
      userServices.createNewUser(newUserData).then(res => {
        // console.log(res)
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getSpacificUser ({ commit }, userId) {
    return new Promise((resolve, reject) => {
      userServices.getSpacificUser(userId).then(res => {
        commit('getSpacificUser', res.data.data)
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getAllUser ({ commit }, { pageNumber = 1, filterTitle = '', filterStatus = '', filterRole = '' }) {
    return new Promise((resolve, reject) => {
      userServices.getAllUser(pageNumber, filterTitle, filterStatus, filterRole).then(res => {
        commit('getAllUser', res.data.data)
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  deleteUser ({ dispatch }, userId) {
    return new Promise((resolve, reject) => {
      userServices.deleteUser(userId).then(res => {
        dispatch('getAllUser', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  editUser ({ dispatch }, payload) {
    payload.newData.is_active ? payload.newData.is_active = 1 : payload.newData.is_active = 0

    return new Promise((resolve, reject) => {
      userServices.editUser(payload.userID, payload.newData).then(res => {
        dispatch('getAllUser', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  changeUserStatus (_, userId) {
    return new Promise((resolve, reject) => {
      userServices.changeUserStatus(userId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  resetUser ({ dispatch }, userId) {
    return new Promise((resolve, reject) => {
      userServices.resetUser(userId).then(res => {
        dispatch('getSpacificUser', userId).then(() => {
          resolve(res)
        })
      }).catch(error => {
        reject(error)
      })
    })
  },
  editCustomRole ({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      userServices.editCustomRole(payload.userId, payload.data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  resetRole (_, userId) {
    return new Promise((resolve, reject) => {
      userServices.resetRole(userId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  serachAboutUser (_, { user = '', permissions = '' }) {
    return new Promise((resolve, reject) => {
      userServices.serachAboutUser(user, permissions).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
