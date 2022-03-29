import complainServices from '@/services/Complains/complains'

export default {
  getAllComplains ({ commit }, { pageNumber = 1, projectId, categoryId, task = '', priority = '', toUser = '', byUser = '' }) {
    return new Promise((resolve, reject) => {
      complainServices.getAllComplains(pageNumber, projectId, categoryId, task, priority, toUser, byUser).then(res => {
        commit('getAllComplains', res.data.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getCreateComplain (_, projectId) {
    return new Promise((resolve, reject) => {
      complainServices.getCreateComplain(projectId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  addnewComplain ({ dispatch }, complain) {
    return new Promise((resolve, reject) => {
      complainServices.addnewComplain(complain).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getSpacificComplain ({ commit }, complainId) {
    return new Promise((resolve, reject) => {
      complainServices.getSpacificComplain(complainId).then(res => {
        commit('getSpacificComplain', res.data.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  editComplainData (_, { complainId, newComplain }) {
    return new Promise((resolve, reject) => {
      complainServices.editComplainData(complainId, newComplain).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  chageComplainStatus (_, complainId) {
    return new Promise((resolve, reject) => {
      complainServices.chageTaskStatus(complainId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
