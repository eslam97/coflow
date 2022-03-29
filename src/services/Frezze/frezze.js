import Api from '@/axios'

export default {
  searchFrezzeByMemberID (memberId) {
    return Api().get(`memberships/freezing/search-by-member-id/${memberId}`)
  },
  createFrezze (id) {
    return Api().get(`memberships/freezing/create/${id}`)
  },
  storeFrezze (id, data) {
    return Api().post(`memberships/freezing/store/${id}`, data)
  },
  breackFrezze (packageId, memberId) {
    return Api().post(`memberships/freezing/break/${memberId}/${packageId}`)
  }
}
