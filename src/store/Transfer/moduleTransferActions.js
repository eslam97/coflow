import transferServices from '@/services/Transfer/transfer'

export default {
  getAllTransfer (_, { pageNumber = 1, status = '', to = '', from = '', objectID = '', safeType = '' }) {
    return new Promise((resolve, reject) => {
      transferServices.getAllTransfer(pageNumber, status, to, from, objectID, safeType).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  requestTransfer (_, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      transferServices.requestTransfer(payload).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  approveOrRejectTransfre (_, { transferId, data, safeType }) {
    return new Promise((resolve, reject) => {
      transferServices.approveOrRejectTransfre(transferId, data, safeType).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  requestRestore (_, payload) {
    return new Promise((resolve, reject) => {
      transferServices.requestRestore(payload).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  }
}
