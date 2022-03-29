import Api from '@/axios'

export default {
  getCreateMemberShip () {
    return Api().get('memberships/create')
  },
  serachByPhone (phone) {
    return Api().get(`memberships/search-by-phone?phone=${phone}`)
  },
  serachByPhoneOrId (search) {
    return Api().get(`memberships/search?search=${search}`)
  },
  storeUser (userData) {
    return Api().post('memberships/store', userData)
  },
  cretaeMembership (userId, data) {
    return Api().post(`memberships/assign/packages/${userId}`, data)
  },
  getAllMembers (pageNumber, filterTitle, type, dateFrom, dateTo) {
    return Api().get(`/memberships?page=${pageNumber}&name=${filterTitle}&type=${type}&date_from=${dateFrom}&date_to=${dateTo}`)
  },
  uploadMemberImage (userId, payload) {
    return Api().post(`memberships/profile/upload/${userId}`, payload)
  },
  getMembership (userId) {
    return Api().get(`memberships/${userId}`)
  },
  searchByMemberID (memberId) {
    return Api().get(`memberships/search-by-member-id/${memberId}`)
  },
  checkInPackages (id, data) {
    return Api().post(`memberships/visits/package/${id}`, { data: data })
  },
  checkInServices (id, servicesIds) {
    return Api().post(`memberships/visits/service/${id}`, { services_ids: servicesIds })
  },
  // member profile
  getMemberPackagesOrMemberServices (id, type) {
    return Api().get(`memberships/sales/${id}?type=${type}`)
  },
  // pay Remaining
  payRemaining (memberId, packageId, data) {
    return Api().post(`memberships/payments/store/${memberId}/${packageId}`, data)
  },
  // invitation
  inviteFriend (memberId, data) {
    return Api().post(`memberships/invitations/store/${memberId}`, data)
  },
  // transfers
  transferPackage (memberId, data) {
    return Api().post(`memberships/transfers/store/${memberId}`, data)
  },

  getAvailablePackageToUpgrade (packageId) {
    return Api().get(`memberships/upgrades/create/${packageId}`)
  },
  upgradePackage (memberId, data) {
    return Api().post(`memberships/upgrades/store/${memberId}`, data)
  },
  changeMemberStatus (memberId) {
    return Api().patch(`memberships/status/${memberId}`)
  }
}
