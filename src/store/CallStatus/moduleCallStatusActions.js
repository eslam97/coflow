import callStatusServices from '@/services/CallStatus/callStatus'

export default {
  createNewcallStatus ({ dispatch }, callStatusData) {
    return new Promise((resolve, reject) => {
      callStatusServices.addcallStatus(callStatusData).then(res => {
        dispatch('getAllcallStatus', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getAllcallStatus ({ commit }, { pageNumber = 1, filterTitle = '', filterStatus = '' }) {
    return new Promise((resolve, reject) => {
      callStatusServices.getAllcallStatus(pageNumber, filterTitle, filterStatus).then(res => {
        commit('getAllcallStatus', res.data.data)
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  deletecallStatus ({ dispatch }, callStatusId) {
    return new Promise((resolve, reject) => {
      callStatusServices.deletecallStatus(callStatusId).then(res => {
        dispatch('getAllcallStatus', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  editcallStatus ({ dispatch }, payload) {
    payload.newData.is_active ? payload.newData.is_active = 1 : payload.newData.is_active = 0

    return new Promise((resolve, reject) => {
      callStatusServices.editcallStatus(payload.callStatusId, payload.newData).then(res => {
        dispatch('getAllcallStatus', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  GetSpacificcallStatus ({ commit }, callStatusId) {
    return new Promise((resolve, reject) => {
      callStatusServices.getSpacificcallStatus(callStatusId).then(res => {
        commit('getSpacificcallStatus', res.data.data)
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  changeStatuscallStatus (_, callStatusId) {
    return new Promise((resolve, reject) => {
      callStatusServices.changeStatuscallStatus(callStatusId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
