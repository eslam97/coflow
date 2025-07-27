export default {
  methods: {
    // isAdmin: (userType) => !(localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).facility.facility_type),
    hasSubscription: () => (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'))?.facility?.subscription !== 'basic'),
    checkProviderType: (type) => (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'))?.facility?.facility_type?.toLowerCase() === type?.toLowerCase()) || type === 'all',
    hasPer: () => true,
    ifBranchesAccess: () => (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'))?.facility?.branches_access)
  }
}
