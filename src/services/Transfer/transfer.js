import Api from '@/axios'

export default {
  getAllTransfer (pageNumber, status, to, from, objectID, safeType) {
    return Api().get(`accounts/transfers?page=${pageNumber}&status=${status}&to=${to}&from=${from}&object_id=${objectID}&safe_type=${safeType}`)
  },
  requestTransfer (data) {
    return Api().post('accounts/transfers/request', data)
  },
  approveOrRejectTransfre (transferId, data, safeType) {
    return Api().post(`accounts/transfers/status/${transferId}&safe_type=${safeType}`, data)
  },
  requestRestore (data) {
    return Api().post(`accounts/transfers/hold/${data.transferId}`, data)
  }
}
