import Api from '@/axios'

export default {
  getAllTitlePackageSetting () {
    return Api().get('memberships/settings/create')
  },
  getOneTitlePackageData (titleId) {
    return Api().get(`memberships/settings/show/${titleId}`)
  },
  getPackageSettingDataByID (titleId) {
    return Api().get(`memberships/settings/${titleId}`)
  },
  addPackageSetting (titleId, data) {
    return Api().post(`memberships/settings/store/${titleId}`, data)
  },
  changeStatus (titleId, data) {
    return Api().post(`memberships/settings/status/${titleId}`, data)
  },
  deletePackageSettings (titleId, data) {
    return Api().delete(`memberships/settings/${titleId}/${data}`)
  },
  changeStatusPackageSettings (titleId, data) {
    return Api().patch(`memberships/settings/status/${titleId}/${data}`)
  },
  editPackageSettings (titleId, data, newData) {
    return Api().post(`memberships/settings/${titleId}/${data}`, newData)
  },
  addshift_times (shiftTimesData) {
    return Api().post('memberships/settings/shift_times/store', shiftTimesData)
  },
  getAllshift_times () {
    return Api().get('memberships/settings/shift_times')
  },
  getSpacificshift_times (shiftTimesId) {
    return Api().get(`memberships/settings/shift_times/${shiftTimesId}`)
  },
  editshift_times (shiftTimesId, newData) {
    return Api().post(`memberships/settings/shift_times/${shiftTimesId}`, newData)
  },
  deleteshift_times (shiftTimesId) {
    return Api().delete(`memberships/settings/shift_times/${shiftTimesId}`)
  },
  changeStatusshift_times (shiftTimesId) {
    return Api().patch(`memberships/settings/shift_times/status/${shiftTimesId}`)
  },
  membershipsCreate () {
    return Api().get('memberships/settings/create')
  },
  addNewPackage (data) {
    return Api().post('memberships/packages/store', data)
  },
  getAllPackageOrService (pageNumber, type, projectId = '') {
    return Api().get(`memberships/packages?type=${type}&page=${pageNumber}&project_id=${projectId}`)
  },
  switchStatusPackage (id) {
    return Api().patch(`memberships/packages/status/${id}`)
  },
  getAllServiceToAddPackage () {
    return Api().get('memberships/packages/create')
  },
  getSpacificPackages (id) {
    return Api().get(`memberships/packages/${id}`)
  },
  editPackageOrService (id, data) {
    return Api().post(`memberships/packages/${id}`, data)
  },
  changeStatusPackage (titleId, data) {
    return Api().post(`memberships/packages/status/${titleId}`, data)
  },
  deletePackage (packageId) {
    return Api().delete(`memberships/packages/${packageId}`)
  }
}
