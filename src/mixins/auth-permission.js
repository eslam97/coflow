export default {
  methods: {
    // hasPer: name => {
    //   const index = JSON.parse(localStorage.getItem('permissions')).indexOf(name)
    //   return index
    // },
    hasPer: () => true,
    isType: () => true,
    isAdmin: () => true,
    hasServiceType: () => true
    // isType: nameOfType => !!(localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).type.toLowerCase() === nameOfType.toLowerCase()),
    // isAdmin: nameOfType => !!(localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).type === 'admin'),
    // hasServiceType: nameOfType => {
    //   if (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).service_types) {
    //     return JSON.parse(localStorage.getItem('userInfo')).service_types.toLowerCase() === nameOfType.toLowerCase()
    //   } else {
    //     return true
    //   }
    // }
  }
}
