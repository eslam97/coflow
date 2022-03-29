import Api from '@/axios'

export default {
  getAllRefund (pageNumber, memberId, objectID) {
    return Api().get(`memberships/refunds?page=${pageNumber}&member_id=${memberId}&object_id=${objectID}`)
  },
  submitStatus (refundId, data) {
    return Api().post(`memberships/refunds/status/${refundId}`, data)
  },
  getAllPackageToRefund (memberId) {
    return Api().get(`memberships/payments/create/${memberId}`)
  },
  refundRequest (userId, data) {
    return Api().post(`memberships/refunds/request/${userId}`, data)
  },
  refundDone (userId, id) {
    return Api().post(`memberships/refunds/done/${userId}`, { member_refund: id })
  }
}
