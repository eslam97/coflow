import sourcesServices from '@/services/Sources/sources'

export default {
  createNewsources ({ dispatch }, sourcesData) {
    return new Promise((resolve, reject) => {
      sourcesServices.addsources(sourcesData).then(res => {
        dispatch('getAllsources', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getAllsources ({ commit }, { pageNumber = 1, filterTitle = '', filterStatus = '' }) {
    return new Promise((resolve, reject) => {
      sourcesServices.getAllsources(pageNumber, filterTitle, filterStatus).then(res => {
        commit('getAllsources', res.data.data)
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  deletesources ({ dispatch }, sourcesId) {
    return new Promise((resolve, reject) => {
      sourcesServices.deletesources(sourcesId).then(res => {
        dispatch('getAllsources', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  editsources ({ dispatch }, payload) {
    payload.newData.is_active ? payload.newData.is_active = 1 : payload.newData.is_active = 0
    return new Promise((resolve, reject) => {
      sourcesServices.editsources(payload.sourcesId, payload.newData).then(res => {
        dispatch('getAllsources', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  GetSpacificsources ({ commit }, sourcesId) {
    return new Promise((resolve, reject) => {
      sourcesServices.getSpacificsources(sourcesId).then(res => {
        commit('getSpacificsources', res.data.data)
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  changeStatussources (_, sourcesId) {
    return new Promise((resolve, reject) => {
      sourcesServices.changeStatussources(sourcesId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
