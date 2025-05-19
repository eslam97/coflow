export default {
  methods: {
    // hasPer: name => {
    //   const index = JSON.parse(localStorage.getItem('permissions')).indexOf(name)
    //   return index
    // },
    hasPer: () => true,
    isType: () => true,
    // isAdmin: () => true,
    // hasServiceType: () => true,
    // isType: nameOfType => !!(localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).facility.facility_type.toLowerCase() === nameOfType.toLowerCase()),
    isAdmin: () => true,
    hasServiceType: () => true
  }
}
