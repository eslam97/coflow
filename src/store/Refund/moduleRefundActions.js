import refundServices from '@/services/Refund/refund'

export default {
  getAllRefund (_, { pageNumber = 1, memberId = '', objectID = '' }) {
    return new Promise((resolve, reject) => {
      refundServices.getAllRefund(pageNumber, memberId, objectID).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  submitStatus (_, { refundId, data }) {
    return new Promise((resolve, reject) => {
      refundServices.submitStatus(refundId, data).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getAllPackageToRefund (_, memberId) {
    return new Promise((resolve, reject) => {
      refundServices.getAllPackageToRefund(memberId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  refundRequest (_, { userId, data }) {
    // console.log('userId', userId)
    return new Promise((resolve, reject) => {
      refundServices.refundRequest(userId, data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  refundDone (_, { userId, id }) {
    return new Promise((resolve, reject) => {
      refundServices.refundDone(userId, id).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  }
}
