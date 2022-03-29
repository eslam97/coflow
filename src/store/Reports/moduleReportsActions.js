import reportServices from '@/services/Reports/reports'

export default {
  getAllInvitations (_, { pageNumber = 1, memberId = '', userName = '', dateFrom = '', dateTo = '' }) {
    return new Promise((resolve, reject) => {
      reportServices.getAllInvitations(pageNumber, memberId, userName, dateFrom, dateTo).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getAllFreeze (_, { pageNumber = 1, memberId = '', userName = '', dateFrom = '', dateTo = '' }) {
    return new Promise((resolve, reject) => {
      reportServices.getAllFreeze(pageNumber, memberId, userName, dateFrom, dateTo).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getAllVisits (_, { pageNumber = 1, memberId = '', userName = '', dateFrom = '', dateTo = '' }) {
    return new Promise((resolve, reject) => {
      reportServices.getAllVisits(pageNumber, memberId, userName, dateFrom, dateTo).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getAllPayments (_, { pageNumber = 1, memberId = '', userName = '', dateFrom = '', dateTo = '' }) {
    return new Promise((resolve, reject) => {
      reportServices.getAllPayments(pageNumber, memberId, userName, dateFrom, dateTo).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getAllDiscounts (_, { pageNumber = 1, memberId = '', status = '', objectID = '', userName = '', dateFrom = '', dateTo = '' }) {
    return new Promise((resolve, reject) => {
      reportServices.getAllDiscounts(pageNumber, memberId, status, objectID, userName, dateFrom, dateTo).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  approveDiscount (_, id) {
    return new Promise((resolve, reject) => {
      reportServices.approveDiscount(id).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getLeadReport (_, { filter = null, pageNumber, search = '', project = '', userId = '', callStatusId = '', inquiry = '', source = '', from = '', dateFrom = '', dateTo = '', ifNew = '', category = '', noHistory = '', userid = '', takenId = '', type = '' }) {
    return new Promise((resolve, reject) => {
      reportServices.getLeadReport(filter, pageNumber, search, project, userId, callStatusId, inquiry, source, from, dateFrom, dateTo, ifNew, category, noHistory, userid, takenId, type).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getSalesReport (_, { pageNumber, projectId = '', dateFrom = '', dateTo = '', userId = '', user }) {
    return new Promise((resolve, reject) => {
      reportServices.getSalesReport(pageNumber, projectId, dateFrom, dateTo, userId, user).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getHistriesSalesReport (_, { pageNumber, projectId = '', dateFrom = '', dateTo = '', userId = '', statusId = '' }) {
    return new Promise((resolve, reject) => {
      reportServices.getHistriesSalesReport(pageNumber, projectId, dateFrom, dateTo, userId, statusId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAchievedSalesReport (_, { pageNumber, projectId = '', dateFrom = '', dateTo = '', userId = '' }) {
    return new Promise((resolve, reject) => {
      reportServices.getAchievedSalesReport(pageNumber, projectId, dateFrom, dateTo, userId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getPayableSalesReport (_, { pageNumber, projectId = '', dateFrom = '', dateTo = '', userId = '' }) {
    return new Promise((resolve, reject) => {
      reportServices.getPayableSalesReport(pageNumber, projectId, dateFrom, dateTo, userId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getContractsSalesReport (_, { pageNumber, projectId = '', dateFrom = '', dateTo = '', userId = '' }) {
    return new Promise((resolve, reject) => {
      reportServices.getContractsSalesReport(pageNumber, projectId, dateFrom, dateTo, userId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getLeadSalesReport (_, { pageNumber, projectId = '', dateFrom = '', dateTo = '', userId = '', callStatus = '', inquiryId = '', sourceId = '', category = '' }) {
    return new Promise((resolve, reject) => {
      reportServices.getLeadSalesReport(pageNumber, projectId, dateFrom, dateTo, userId, callStatus, inquiryId, sourceId, category).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getPackageReports (_, { pageNumber }) {
    return new Promise((resolve, reject) => {
      reportServices.getPackageReports(pageNumber).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
