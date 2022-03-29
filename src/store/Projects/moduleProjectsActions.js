import projectServices from '@/services/Projects/projects'

export default {
  createNewProject ({ dispatch }, projectData) {
    return new Promise((resolve, reject) => {
      projectServices.addProject(projectData).then(res => {
        dispatch('getAllProject', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getAllProject ({ commit }, { pageNumber = 1, filterTitle = '', filterStatus = '' }) {
    return new Promise((resolve, reject) => {
      projectServices.getAllProjects(pageNumber, filterTitle, filterStatus).then(res => {
        commit('getAllProject', res.data.data)
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  deleteProject ({ dispatch }, projectId) {
    return new Promise((resolve, reject) => {
      projectServices.deleteProject(projectId).then(res => {
        dispatch('getAllProject', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  editProject ({ dispatch }, payload) {
    payload.newData.is_active ? payload.newData.is_active = 1 : payload.newData.is_active = 0
    return new Promise((resolve, reject) => {
      projectServices.editProject(payload.projectId, payload.newData).then(res => {
        dispatch('getAllProject', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  GetSpacificProject ({ commit }, projectId) {
    return new Promise((resolve, reject) => {
      projectServices.getSpacificProject(projectId).then(res => {
        commit('getSpacificProject', res.data.data)
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  changeStatus (_, projectId) {
    return new Promise((resolve, reject) => {
      projectServices.changeStatus(projectId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  setDefaultProject (_, projectId) {
    return new Promise((resolve, reject) => {
      projectServices.setDefaultProject(projectId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
