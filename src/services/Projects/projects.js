import Api from '@/axios'

export default {
  addProject (projectData) {
    return Api().post('projects/store', projectData)
  },
  getAllProjects (pageNumber, filterTitle, filterStatus) {
    return Api().get(`/projects?page=${pageNumber}&title=${filterTitle}&status=${filterStatus}`)
  },
  getSpacificProject (projectId) {
    return Api().get(`/projects/${projectId}`)
  },
  editProject (projectId, newData) {
    return Api().post(`/projects/${projectId}`, newData)
  },
  deleteProject (projectId) {
    return Api().delete(`/projects/${projectId}`)
  },
  changeStatus (projectId) {
    return Api().patch(`/projects/status/${projectId}`)
  },
  setDefaultProject (projectId) {
    return Api().patch(`users/default/project/${projectId}`)
  }
}
