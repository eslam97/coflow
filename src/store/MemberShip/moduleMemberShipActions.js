import memberShipService from '@/services/MemberShip/memberShip'

export default {
  getCreateMemberShip () {
    return new Promise((resolve, reject) => {
      memberShipService.getCreateMemberShip().then(res => {
        // console.log(res)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  serachByPhone (_, phone) {
    return new Promise((resolve, reject) => {
      memberShipService.serachByPhone(phone).then(res => {
        // console.log(res)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  storeUser (_, userData) {
    return new Promise((resolve, reject) => {
      // console.log(userData)
      memberShipService.storeUser(userData).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  cretaeMembership (_, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      memberShipService.cretaeMembership(payload.userId, payload.data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAllMembers ({ commit }, { pageNumber = 1, name = '', type = '', dateFrom = '', dateTo = '' }) {
    return new Promise((resolve, reject) => {
      memberShipService.getAllMembers(pageNumber, name, type, dateFrom, dateTo).then(res => {
        commit('getAllMembers', res.data.data)
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  uploadMemberImage (_, payload) {
    return new Promise((resolve, reject) => {
      memberShipService.uploadMemberImage(payload.userId, payload.image).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getMembership (_, userId) {
    return new Promise((resolve, reject) => {
      memberShipService.getMembership(userId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  changeMemberStatus (_, memberId) {
    return new Promise((resolve, reject) => {
      memberShipService.changeMemberStatus(memberId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  searchByMemberID (_, memberId) {
    return new Promise((resolve, reject) => {
      memberShipService.searchByMemberID(memberId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  serachByPhoneOrId (_, search) {
    return new Promise((resolve, reject) => {
      memberShipService.serachByPhoneOrId(search).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  checkInServices (_, payload) {
    return new Promise((resolve, reject) => {
      memberShipService.checkInServices(payload.id, payload.services_ids).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  checkInPackages (_, payload) {
    return new Promise((resolve, reject) => {
      memberShipService.checkInPackages(payload.id, payload.data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // member profile
  getMemberPackagesOrMemberServices ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      memberShipService.getMemberPackagesOrMemberServices(payload.id, payload.type).then(res => {
        commit('getMemberPackagesOrMemberServices', res.data.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // pay Remaining
  payRemaining ({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      memberShipService.payRemaining(payload.memberId, payload.packageId, payload.data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // invitation
  inviteFriend (_, payload) {
    return new Promise((resolve, reject) => {
      memberShipService.inviteFriend(payload.memberId, payload.data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // transfers
  transferPackage ({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      memberShipService.transferPackage(payload.memberId, payload.data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // transfers

  getAvailablePackageToUpgrade (_, packageId) {
    return new Promise((resolve, reject) => {
      memberShipService.getAvailablePackageToUpgrade(packageId).then(res => {
        // console.log(res)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  upgradePackage ({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      memberShipService.upgradePackage(payload.memberId, payload.data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
