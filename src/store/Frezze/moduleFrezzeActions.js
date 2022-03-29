import frezzeService from '@/services/Frezze/frezze'

export default {
  searchFrezzeByMemberID (_, memberId) {
    return new Promise((resolve, reject) => {
      frezzeService.searchFrezzeByMemberID(memberId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  createFrezze (_, id) {
    return new Promise((resolve, reject) => {
      frezzeService.createFrezze(id).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  storeFrezze (_, payload) {
    return new Promise((resolve, reject) => {
      frezzeService.storeFrezze(payload.userId, payload.data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  breackFrezze (_, payload) {
    return new Promise((resolve, reject) => {
      frezzeService.breackFrezze(payload.packageId, payload.memberId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
