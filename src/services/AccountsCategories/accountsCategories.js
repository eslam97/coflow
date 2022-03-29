import Api from '@/axios'

export default {
  getAllCategories () {
    return Api().get('accounts/categories/create')
  },
  getDailyDisk () {
    return Api().get('accounts/categories/daily/disk')
  },
  getAllParentsDependsOnType (type) {
    return Api().get(`accounts/categories/type/${type}`)
  },
  getAllchildDependsOnParent (parentId) {
    return Api().get(`accounts/categories/${parentId}`)
  },
  addCategories (data) {
    return Api().post('accounts/categories/store', data)
  },
  editCategories (id, data) {
    return Api().post(`accounts/categories/${id}`, data)
  },
  amountCategories (data) {
    return Api().post('accounts/categories/amount', data)
  },
  getCategoryTypes (type, pageNumber, search, safeType) {
    return Api().get(`accounts/categories/daily/report/${type}?page=${pageNumber}&search=${search}&safe_type=${safeType}`)
  },
  getReportsFinancialWidget () {
    return Api().get('accounts/reports/financial/widget')
  },
  getThirdCategories (type) {
    return Api().get(`accounts/categories/third/${type}`)
  },
  getAllProjectsWithOutPermissions () {
    return Api().get('accounts/transfers/create')
  }
}
