import enterpriseservices from '@/services/Enterprises/Enterprises'

export default {
  createNewenterprises ({ dispatch }, projectData) {
    return new Promise((resolve, reject) => {
      enterpriseservices.addenterprises(projectData).then(res => {
        dispatch('getAllenterprises', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAllenterprises ({ commit }, { pageNumber = 1, filterTitle = '', filterStatus = '' }) {
    return new Promise((resolve, reject) => {
      enterpriseservices.getAllenterprises(pageNumber, filterTitle, filterStatus).then(res => {
        commit('getAllenterprises', res.data.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteEnterprises ({ dispatch }, enterpriseId) {
    return new Promise((resolve, reject) => {
      enterpriseservices.deleteEnterprises(enterpriseId).then(res => {
        dispatch('getAllenterprises', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  editenterprises ({ dispatch }, payload) {
    payload.newData.is_active ? payload.newData.is_active = 1 : payload.newData.is_active = 0
    return new Promise((resolve, reject) => {
      enterpriseservices.editenterprises(payload.enterprisesId, payload.newData).then(res => {
        dispatch('getAllenterprises', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  GetSpacificenterprise ({ commit }, enterpriseId) {
    return new Promise((resolve, reject) => {
      enterpriseservices.getSpacificenterprises(enterpriseId).then(res => {
        commit('getSpacificenterprises', res.data.data)
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  changeenterpriseStatus (_, enterpriseId) {
    return new Promise((resolve, reject) => {
      enterpriseservices.changeenterpriseStatus(enterpriseId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAllEnterPrisesListingForSelect () {
    return new Promise((resolve, reject) => {
      enterpriseservices.getAllEnterPrisesListingForSelect().then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
