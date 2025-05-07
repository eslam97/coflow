export default {
  methods: {
    // hasPer: name => {
    //   const index = JSON.parse(localStorage.getItem('permissions')).indexOf(name)
    //   return index
    // },
    hasPer: () => false,
    isType: () => true,
    // isAdmin: () => true,
    // hasServiceType: () => true,
    // isType: nameOfType => !!(localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).facility.facility_type.toLowerCase() === nameOfType.toLowerCase()),
    isAdmin: nameOfType => (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).facility.facility_type),
    hasServiceType: nameOfType => {
      console.log('nameOfType', nameOfType)
      if (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).facility.facility_type) {
        return 'flow'.toLowerCase() === nameOfType.toLowerCase()
      } else {
        return true
      }
    }
  }
}
