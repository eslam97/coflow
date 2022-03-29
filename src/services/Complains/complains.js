import Api from '@/axios'

export default {
  getAllComplains (pageNumber, projectId, categoryId, complain, priority, toUser, byUser) {
    return Api().get(`complains?page=${pageNumber}&project_id=${projectId}&category_id=${categoryId}&complain=${complain}&priority=${priority}&by_user_id=${byUser}&to_user_id=${toUser}`)
  },
  getCreateComplain (projectId) {
    return Api().get(`complains/create/${projectId}`)
  },
  addnewComplain (complain) {
    return Api().post('complains/store', complain)
  },
  getSpacificComplain (taksId) {
    return Api().get(`complains/${taksId}`)
  },
  editComplainData (complainId, newData) {
    return Api().post(`complains/${complainId}`, newData)
  },
  chageComplainStatus (complainId) {
    return Api().patch(`complains/status/${complainId}`)
  }
}
