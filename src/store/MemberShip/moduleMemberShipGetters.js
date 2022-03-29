export default {
  getAllMembers: state => {
    return state.allMembers
  },
  getMemberPackagesOrMemberServices: state => {
    return state.allMemberPackagesOrMemberServices
  },
  getServicesOfPackage: state => packageId => {
    // eslint-disable-next-line eqeqeq
    return state.allMemberPackagesOrMemberServices.find(p => p.id == packageId).service
  }
}
