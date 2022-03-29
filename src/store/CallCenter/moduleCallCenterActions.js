import callCenter from '@/services/CallCenter/callCenter'

export default {
  getUserCallData (_, { pageNumber = 1, search = '', project = '', userId = '', callStatusId = '', inquiry = '', source = '', from = '', dateFrom = '', dateTo = '', ifNew = '', category = '', noHistory = '' }) {
    return new Promise((resolve, reject) => {
      callCenter.getUserCallData(pageNumber, search, project, userId, callStatusId, inquiry, source, from, dateFrom, dateTo, ifNew, category, noHistory).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getNewUserCallData ({ commit }, status) {
    return new Promise((resolve, reject) => {
      callCenter.getNewUserCallData(status).then(res => {
        commit('getNewUserCallData', res.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  addComment (_, data) {
    return new Promise((resolve, reject) => {
      callCenter.addComment(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getSalesCreate () {
    return new Promise((resolve, reject) => {
      callCenter.getSalesCreate().then(res => {
        resolve(res.data.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  changeStatusCall (_, data) {
    return new Promise((resolve, reject) => {
      callCenter.changeStatusCall(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
