import restoreServices from '@/services/Restore/restore'

export default {
  getAllHeaderRestore () {
    return new Promise((resolve, reject) => {
      restoreServices.getAllHeaderRestore().then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getDataToRestore (_, { model, pageNumber = 1 }) {
    return new Promise((resolve, reject) => {
      restoreServices.getDataToRestore(model, pageNumber).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  restoreRow (_, { model, rowId }) {
    return new Promise((resolve, reject) => {
      restoreServices.restoreRow(model, rowId).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  }
}
