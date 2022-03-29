import Api from '@/axios'

export default {
  adddepartments (departmentsData) {
    return Api().post('departments/store', departmentsData)
  },
  getAlldepartments (pageNumber, filterTitle, filterStatus) {
    return Api().get(`departments?page=${pageNumber}&title=${filterTitle}&status=${filterStatus}`)
  },
  getSpacificdepartments (departmentsId) {
    return Api().get(`departments/${departmentsId}`)
  },
  editdepartments (departmentsId, newData) {
    return Api().post(`departments/${departmentsId}`, newData)
  },
  deletedepartments (departmentsId) {
    return Api().delete(`departments/${departmentsId}`)
  },
  changeStatusdepartments (departmentsId) {
    return Api().patch(`departments/status/${departmentsId}`)
  }
}
