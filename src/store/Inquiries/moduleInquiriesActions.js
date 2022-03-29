import inquiriesServices from '@/services/Inquiries/inquiries'

export default {
  createNewinquiries ({ dispatch }, inquiriesData) {
    return new Promise((resolve, reject) => {
      inquiriesServices.addinquiries(inquiriesData).then(res => {
        dispatch('getAllinquiries', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getAllinquiries ({ commit }, { pageNumber = 1, filterTitle = '', filterStatus = '' }) {
    return new Promise((resolve, reject) => {
      inquiriesServices.getAllinquiries(pageNumber, filterTitle, filterStatus).then(res => {
        commit('getAllinquiries', res.data.data)
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  deleteinquiries ({ dispatch }, inquiriesId) {
    return new Promise((resolve, reject) => {
      inquiriesServices.deleteinquiries(inquiriesId).then(res => {
        dispatch('getAllinquiries', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  editinquiries ({ dispatch }, payload) {
    payload.newData.is_active ? payload.newData.is_active = 1 : payload.newData.is_active = 0
    return new Promise((resolve, reject) => {
      inquiriesServices.editinquiries(payload.inquiriesId, payload.newData).then(res => {
        dispatch('getAllinquiries', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  GetSpacificinquiries ({ commit }, inquiriesId) {
    return new Promise((resolve, reject) => {
      inquiriesServices.getSpacificinquiries(inquiriesId).then(res => {
        commit('getSpacificinquiries', res.data.data)
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  changeStatusinquiries (_, inquiriesId) {
    return new Promise((resolve, reject) => {
      inquiriesServices.changeStatusinquiries(inquiriesId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
