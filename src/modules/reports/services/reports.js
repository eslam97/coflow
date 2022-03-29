import Api from '@/axios'

export default {
  getAllMembers (payload) {
    return Api().get(`/memberships?page=${payload.pageNumber}&name=${payload.name}&type=${payload.type}&date_from=${payload.dateFrom}&date_to=${payload.dateTo}&project_id=${payload.projectId}&report=${payload.report ? payload.report : 0}&expired=${payload.expired ? payload.expired : 0}`)
  },
  getAllInvitations ({ pageNumber, memberId, userName, dateFrom, dateTo }) {
    return Api().get(`memberships/invitations?member_id=${memberId}&page=${pageNumber}&name=${userName}&date_from=${dateFrom}&date_to=${dateTo}`)
  },
  getAllPayments ({ pageNumber, memberId, userName, dateFrom, dateTo }) {
    return Api().get(`memberships/payments?member_id=${memberId}&page=${pageNumber}&name=${userName}&date_from=${dateFrom}&date_to=${dateTo}`)
  },
  getAllVisits ({ pageNumber, memberId, userName, dateFrom, dateTo }) {
    return Api().get(`memberships/visits?member_id=${memberId}&page=${pageNumber}&name=${userName}&date_from=${dateFrom}&date_to=${dateTo}`)
  },
  getAllFreeze ({ pageNumber, memberId, userName, dateFrom, dateTo }) {
    return Api().get(`memberships/freezing?member_id=${memberId}&page=${pageNumber}&name=${userName}&date_from=${dateFrom}&date_to=${dateTo}`)
  },
  getAllDiscounts ({ pageNumber, memberId, status, objectId, userName, dateFrom, dateTo }) {
    return Api().get(`memberships/discounts?member_id=${memberId}&page=${pageNumber}&status=${status}&object_id=${objectId}&name=${userName}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
  },
  approveDiscount (id) {
    return Api().patch(`memberships/discounts/${id}`)
  },
  getLeadReport (pageNumber, search, project, userId, callStatusId, inquiry, source, from, dateFrom, dateTo, ifNew, category, noHistory, userid, takenId) {
    if (noHistory) {
      return Api().get(`leads/reports/details?page=${pageNumber}&search=${search}&project_id=${project}&user=${userId}&call_status_id=${callStatusId}&inquiry_id=${inquiry}&source_id=${source}&from_id=${from}&date_from=${dateFrom}&date_to=${dateTo}&new=${ifNew}&category=${category}&no_history=1&user_id=${userid}&taken_id=${takenId}`)
    } else { return Api().get(`leads/reports/details?page=${pageNumber}&search=${search}&project_id=${project}&user=${userId}&call_status_id=${callStatusId}&inquiry_id=${inquiry}&source_id=${source}&from_id=${from}&date_from=${dateFrom}&date_to=${dateTo}&new=${ifNew}&category=${category}&user_id=${userid}&taken_id=${takenId}`) }
  },
  getSalesReport (pageNumber, projectId, dateFrom, dateTo, userId, user) {
    return Api().get(`sales/reports/details?page=${pageNumber}&project_id=${projectId}&date_from=${dateFrom}&date_to=${dateTo}&user_id=${userId}&user=${user}`)
  },
  getHistriesSalesReport (pageNumber, projectId, dateFrom, dateTo, userId, statusId) {
    return Api().get(`sales/reports/histories?page=${pageNumber}&project_id=${projectId}&date_from=${dateFrom}&date_to=${dateTo}&user_id=${userId}&status_id=${statusId}`)
  },
  getAchievedSalesReport (pageNumber, projectId, dateFrom, dateTo, userId) {
    return Api().get(`sales/reports/achieved?page=${pageNumber}&project_id=${projectId}&date_from=${dateFrom}&date_to=${dateTo}&sales_id=${userId}`)
  },
  getPayableSalesReport (pageNumber, projectId, dateFrom, dateTo, userId) {
    return Api().get(`sales/reports/payable?page=${pageNumber}&project_id=${projectId}&date_from=${dateFrom}&date_to=${dateTo}&sales_id=${userId}`)
  },
  getLeadsSalesReport (pageNumber, projectId, dateFrom, dateTo, userId) {
    return Api().get(`sales/reports/leads?page=${pageNumber}&project_id=${projectId}&date_from=${dateFrom}&date_to=${dateTo}&sales_id=${userId}`)
  },
  getContractsSalesReport (pageNumber, projectId, dateFrom, dateTo, userId) {
    return Api().get(`sales/reports/contracts?page=${pageNumber}&project_id=${projectId}&date_from=${dateFrom}&date_to=${dateTo}&user_id=${userId}`)
  },
  getLeadSalesReport (pageNumber, projectId, dateFrom, dateTo, userId, callStatus, inquiryId, sourceId, category) {
    return Api().get(`sales/reports/leads?page=${pageNumber}&project_id=${projectId}&date_from=${dateFrom}&date_to=${dateTo}&sales_id=${userId}&call_status_id=${callStatus},inquiry_id=${inquiryId},source_id=${sourceId},category=${category}`)
  },
  getPackageReports (pageNumber) {
    return Api().get(`memberships/packages/details?page=${pageNumber}`)
  }
}
