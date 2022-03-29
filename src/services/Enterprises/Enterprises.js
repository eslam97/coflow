import Api from '@/axios'

export default {
  addenterprises (enterpriseData) {
    return Api().post('enterprises/store', enterpriseData)
  },
  getAllenterprises (pageNumber, filterTitle, filterStatus) {
    return Api().get(`/enterprises?page=${pageNumber}&title=${filterTitle}&status=${filterStatus}`)
  },
  getSpacificenterprises (enterpriseId) {
    return Api().get(`/enterprises/${enterpriseId}`)
  },
  editenterprises (enterpriseId, newData) {
    return Api().post(`/enterprises/${enterpriseId}`, newData)
  },
  deleteEnterprises (enterpriseId) {
    return Api().delete(`/enterprises/${enterpriseId}`)
  },
  changeenterpriseStatus (enterpriseId) {
    return Api().patch(`/enterprises/status/${enterpriseId}`)
  },
  getAllEnterPrisesListingForSelect () {
    return Api().get('projects/create')
  }
}
