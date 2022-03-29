import departmentsServices from '@/services/Departments/departments'
export default {
  createNewdepartments ({ dispatch }, departmentsData) {
    return new Promise((resolve, reject) => {
      departmentsServices.adddepartments(departmentsData).then(res => {
        dispatch('getAlldepartments', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAlldepartments ({ commit }, { pageNumber = 1, filterTitle = '', filterStatus = '' }) {
    return new Promise((resolve, reject) => {
      departmentsServices.getAlldepartments(pageNumber, filterTitle, filterStatus).then(res => {
        commit('getAlldepartments', res.data.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deletedepartments ({ dispatch }, departmentsId) {
    return new Promise((resolve, reject) => {
      departmentsServices.deletedepartments(departmentsId).then(res => {
        dispatch('getAlldepartments', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  editdepartments ({ dispatch }, payload) {
    payload.newData.is_active ? payload.newData.is_active = 1 : payload.newData.is_active = 0
    return new Promise((resolve, reject) => {
      departmentsServices.editdepartments(payload.departmentsId, payload.newData).then(res => {
        dispatch('getAlldepartments', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  GetSpacificdepartments ({ commit }, departmentsId) {
    return new Promise((resolve, reject) => {
      departmentsServices.getSpacificdepartments(departmentsId).then(res => {
        commit('getSpacificdepartments', res.data.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  changeStatusdepartments (_, departmentsId) {
    return new Promise((resolve, reject) => {
      departmentsServices.changeStatusdepartments(departmentsId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
