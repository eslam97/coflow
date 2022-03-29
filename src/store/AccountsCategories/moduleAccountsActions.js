import accountsService from '@/services/AccountsCategories/accountsCategories'
export default {
  getAllCategories () {
    return new Promise((resolve, reject) => {
      accountsService.getAllCategories().then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getDailyDisk  () {
    return new Promise((resolve, reject) => {
      accountsService.getDailyDisk().then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getAllParentsDependsOnType (_, type) {
    return new Promise((resolve, reject) => {
      accountsService.getAllParentsDependsOnType(type).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getAllchildDependsOnParent (_, parentId) {
    return new Promise((resolve, reject) => {
      accountsService.getAllchildDependsOnParent(parentId).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  addCategories (_, data) {
    return new Promise((resolve, reject) => {
      accountsService.addCategories(data).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  editCategories (_, payload) {
    return new Promise((resolve, reject) => {
      accountsService.editCategories(payload.id, payload).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  amountCategories (_, payload) {
    return new Promise((resolve, reject) => {
      accountsService.amountCategories(payload).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getCategoryTypes (_, { pageNumber = 1, type = '', search = '', safeType = 'branch' }) {
    return new Promise((resolve, reject) => {
      accountsService.getCategoryTypes(type, pageNumber, search, safeType).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getThirdCategories (_, type) {
    return new Promise((resolve, reject) => {
      accountsService.getThirdCategories(type).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getAllProjectsWithOutPermissions (_) {
    return new Promise((resolve, reject) => {
      accountsService.getAllProjectsWithOutPermissions().then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  }
}
