import packageSettingService from '@/services/PackageSetting/packageSettings'

export default {
  getAllTitlePackageSetting () {
    return new Promise((resolve, reject) => {
      packageSettingService.getAllTitlePackageSetting().then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getPackageSettingDataByID (_, id) {
    return new Promise((resolve, reject) => {
      packageSettingService.getPackageSettingDataByID(id).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  addPackageSetting (_, payload) {
    // console.log(payload.titleId)
    return new Promise((resolve, reject) => {
      packageSettingService.addPackageSetting(payload.titleId, { is_active: 1, value: payload.values }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deletePackageSettings ({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      packageSettingService.deletePackageSettings(payload.titleId, payload.values).then(res => {
        // console.log('payload.titleId', payload.titleId)
        dispatch('getPackageSettingDataByID', payload.titleId)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  changeStatusPackageSettings (_, payload) {
    return new Promise((resolve, reject) => {
      packageSettingService.changeStatusPackageSettings(payload.titleId, payload.values).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  editPackageSettings (_, payload) {
    return new Promise((resolve, reject) => {
      packageSettingService.editPackageSettings(payload.titleId, payload.rowId, { is_active: 1, value: payload.newData }).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log('error', error.response)
        reject(error)
      })
    })
  },
  createNewshift_times ({ dispatch }, shiftTimesData) {
    return new Promise((resolve, reject) => {
      packageSettingService.addshift_times(shiftTimesData).then(res => {
        dispatch('getAllshift_times')
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getAllshift_times ({ commit }) {
    return new Promise((resolve, reject) => {
      packageSettingService.getAllshift_times().then(res => {
        commit('getAllshift_times', res.data.data)
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  deleteshift_times ({ dispatch }, shiftTimesId) {
    return new Promise((resolve, reject) => {
      packageSettingService.deleteshift_times(shiftTimesId).then(res => {
        dispatch('getAllshift_times')
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  editshift_times ({ dispatch }, payload) {
    payload.newData.is_active ? payload.newData.is_active = 1 : payload.newData.is_active = 0
    return new Promise((resolve, reject) => {
      packageSettingService.editshift_times(payload.shiftTimesId, payload.newData).then(res => {
        dispatch('getAllshift_times')
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  GetSpacificshift_times ({ commit }, shiftTimesId) {
    return new Promise((resolve, reject) => {
      packageSettingService.getSpacificshift_times(shiftTimesId).then(res => {
        commit('getSpacificshift_times', res.data.data)
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  changeStatusshift_times (_, shiftTimesId) {
    return new Promise((resolve, reject) => {
      packageSettingService.changeStatusshift_times(shiftTimesId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  membershipsCreate () {
    return new Promise((resolve, reject) => {
      packageSettingService.membershipsCreate().then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  addNewPackage (_, data) {
    return new Promise((resolve, reject) => {
      packageSettingService.addNewPackage(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line camelcase
  getAllPackageOrService ({ commit }, { pageNumber = 1, type, project_id = '' }) {
    return new Promise((resolve, reject) => {
      packageSettingService.getAllPackageOrService(pageNumber, type, project_id).then(res => {
        // console.log(res.data.data)
        commit('getAllPackageOrService', res.data.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  switchStatusPackage (_, id) {
    return new Promise((resolve, reject) => {
      packageSettingService.switchStatusPackage(id).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAllServiceToAddPackage () {
    return new Promise((resolve, reject) => {
      packageSettingService.getAllServiceToAddPackage().then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getSpacificPackages (_, id) {
    return new Promise((resolve, reject) => {
      packageSettingService.getSpacificPackages(id).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  editPackageOrService (_, payload) {
    return new Promise((resolve, reject) => {
      packageSettingService.editPackageOrService(payload.packageId, payload.newData).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  deletePackage (_, id) {
    return new Promise((resolve, reject) => {
      packageSettingService.deletePackage(id).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
